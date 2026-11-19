import { NextResponse } from 'next/server'

import { bookingConfig } from '@/lib/booking-config'
import { createCalendarEvent, isSlotAvailable } from '@/lib/google-calendar'

export const dynamic = 'force-dynamic'

const rateLimitMap = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const hourAgo = now - 60 * 60 * 1000

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [])
  }

  const requests = rateLimitMap.get(ip).filter((t) => t > hourAgo)
  rateLimitMap.set(ip, requests)

  if (requests.length >= bookingConfig.rateLimit.maxRequestsPerHour) {
    return false
  }

  requests.push(now)
  return true
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateUrl(url) {
  if (!url) return true
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`)
    return true
  } catch {
    return false
  }
}

function sanitizeInput(str) {
  if (!str) return ''
  return str
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 1000)
}

/**
 * POST /api/booking/create
 * Creates a calendar booking
 */
export async function POST(request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    const {
      startTime,
      endTime,
      name,
      email,
      storeUrl,
      projectNotes,
      budget,
      website, // honeypot field
    } = body

    if (website) {
      console.log('Honeypot triggered')
      return NextResponse.json(
        { success: false, error: 'Invalid submission' },
        { status: 400 }
      )
    }

    if (!startTime || !endTime) {
      return NextResponse.json(
        { success: false, error: 'Please select a time slot' },
        { status: 400 }
      )
    }

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter your name' },
        { status: 400 }
      )
    }

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (storeUrl && !validateUrl(storeUrl)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid store URL' },
        { status: 400 }
      )
    }

    if (!budget) {
      return NextResponse.json(
        { success: false, error: 'Please select a budget range' },
        { status: 400 }
      )
    }

    const start = new Date(startTime)
    const end = new Date(endTime)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { success: false, error: 'Invalid time slot' },
        { status: 400 }
      )
    }

    const now = new Date()
    const minimumTime = new Date(
      now.getTime() + bookingConfig.minimumNoticeHours * 60 * 60 * 1000
    )

    if (start < minimumTime) {
      return NextResponse.json(
        { success: false, error: 'This time slot is no longer available' },
        { status: 400 }
      )
    }

    try {
      const available = await isSlotAvailable(start, end)
      if (!available) {
        return NextResponse.json(
          {
            success: false,
            error: 'This time slot is no longer available. Please select another time.',
          },
          { status: 409 }
        )
      }
    } catch (availError) {
      console.error('Availability check error:', availError)
    }

    const sanitizedName = sanitizeInput(name)
    const sanitizedStoreUrl = sanitizeInput(storeUrl)
    const sanitizedNotes = sanitizeInput(projectNotes)

    const description = `${bookingConfig.meeting.description}

---
BOOKING DETAILS
Name: ${sanitizedName}
Email: ${email}
Store URL: ${sanitizedStoreUrl || 'Not provided'}
Budget: ${budget}
${sanitizedNotes ? `\nProject Notes:\n${sanitizedNotes}` : ''}`

    const event = await createCalendarEvent({
      summary: `Discovery Call: ${sanitizedName}`,
      description,
      startTime: start,
      endTime: end,
      attendeeEmail: email,
      attendeeName: sanitizedName,
    })

    return NextResponse.json({
      success: true,
      message: 'Your call has been booked!',
      booking: {
        id: event.id,
        start: event.start,
        end: event.end,
        meetLink: event.meetLink,
      },
    })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create booking. Please try again or contact hello@logangelzer.com.' },
      { status: 500 }
    )
  }
}
