import { NextResponse } from 'next/server'

import { bookingConfig } from '@/lib/booking-config'
import { generateAvailableSlots, groupSlotsByDate } from '@/lib/booking-slots'
import { getAccessTokens, getFreeBusy } from '@/lib/google-calendar'

export const dynamic = 'force-dynamic'

/**
 * GET /api/booking/availability
 * Returns available booking slots for the next booking window
 */
export async function GET(request) {
  try {
    const { bookingWindowDays, calendars } = bookingConfig

    const now = new Date()
    const endDate = new Date(now.getTime() + bookingWindowDays * 24 * 60 * 60 * 1000)

    let busyPeriods = []

    try {
      const tokens = await getAccessTokens()

      if (tokens.hello) {
        const calendarIds = [calendars.primary, calendars.secondary].filter(Boolean)
        busyPeriods = await getFreeBusy(tokens.hello, calendarIds, now, endDate)
      }
    } catch (calendarError) {
      console.error('Calendar API error:', calendarError.message)
    }

    const slots = generateAvailableSlots(now, endDate, busyPeriods)
    const groupedSlots = groupSlotsByDate(slots)

    return NextResponse.json({
      success: true,
      timezone: bookingConfig.timezone,
      slotDuration: bookingConfig.slotDurationMinutes,
      dates: groupedSlots,
    })
  } catch (error) {
    console.error('Availability error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}
