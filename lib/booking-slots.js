/**
 * Booking slot generation utilities
 */

import { bookingConfig } from './booking-config'

/**
 * Parse time string (HH:MM) to minutes from midnight
 */
function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number)
  return hours * 60 + minutes
}

/**
 * Get the start and end of a day in a specific timezone
 */
function getDayBoundsInTimezone(date, timezone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const parts = formatter.formatToParts(date)
  const values = {}
  for (const part of parts) {
    values[part.type] = part.value
  }

  return {
    year: parseInt(values.year),
    month: parseInt(values.month) - 1,
    day: parseInt(values.day),
    hour: parseInt(values.hour),
    minute: parseInt(values.minute),
  }
}

/**
 * Convert a local time in timezone to UTC Date
 */
function localTimeToUTC(year, month, day, hours, minutes, timezone) {
  const localStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const targetDate = new Date(localStr + 'Z')

  let low = targetDate.getTime() - 24 * 60 * 60 * 1000
  let high = targetDate.getTime() + 24 * 60 * 60 * 1000

  for (let i = 0; i < 20; i++) {
    const mid = Math.floor((low + high) / 2)
    const testDate = new Date(mid)
    const parts = formatter.formatToParts(testDate)
    const values = {}
    for (const part of parts) {
      values[part.type] = part.value
    }

    const testHour = parseInt(values.hour)
    const testMinute = parseInt(values.minute)
    const testDay = parseInt(values.day)

    if (testDay === day && testHour === hours && testMinute === minutes) {
      return testDate
    }

    const testMinutes = testDay * 24 * 60 + testHour * 60 + testMinute
    const targetMinutes = day * 24 * 60 + hours * 60 + minutes

    if (testMinutes < targetMinutes) {
      low = mid
    } else {
      high = mid
    }
  }

  return new Date(Math.floor((low + high) / 2))
}

/**
 * Generate available time slots for a date range
 * @param {Date} startDate - Start of range
 * @param {Date} endDate - End of range
 * @param {Array<{start: string, end: string}>} busyPeriods - Busy times from calendar
 * @returns {Array<{start: Date, end: Date, dateStr: string, timeStr: string}>}
 */
export function generateAvailableSlots(startDate, endDate, busyPeriods = []) {
  const {
    slotDurationMinutes,
    bufferMinutes,
    minimumNoticeHours,
    timezone,
    workingHours,
  } = bookingConfig

  const slots = []
  const now = new Date()
  const minimumBookingTime = new Date(now.getTime() + minimumNoticeHours * 60 * 60 * 1000)

  const current = new Date(startDate)
  current.setUTCHours(0, 0, 0, 0)

  while (current <= endDate) {
    const dayInfo = getDayBoundsInTimezone(current, timezone)
    const dayOfWeek = new Date(
      dayInfo.year,
      dayInfo.month,
      dayInfo.day
    ).getDay()

    const hours = workingHours[dayOfWeek] || []

    for (const period of hours) {
      const startMinutes = parseTime(period.start)
      const endMinutes = parseTime(period.end)

      let slotStart = startMinutes
      while (slotStart + slotDurationMinutes <= endMinutes) {
        const slotStartHour = Math.floor(slotStart / 60)
        const slotStartMinute = slotStart % 60
        const slotEndMinute = slotStart + slotDurationMinutes

        const slotStartUTC = localTimeToUTC(
          dayInfo.year,
          dayInfo.month,
          dayInfo.day,
          slotStartHour,
          slotStartMinute,
          timezone
        )

        const slotEndUTC = new Date(slotStartUTC.getTime() + slotDurationMinutes * 60 * 1000)

        if (slotStartUTC >= minimumBookingTime) {
          let isAvailable = true

          for (const busy of busyPeriods) {
            const busyStart = new Date(busy.start)
            const busyEnd = new Date(busy.end)

            const bufferedStart = new Date(busyStart.getTime() - bufferMinutes * 60 * 1000)
            const bufferedEnd = new Date(busyEnd.getTime() + bufferMinutes * 60 * 1000)

            if (slotStartUTC < bufferedEnd && slotEndUTC > bufferedStart) {
              isAvailable = false
              break
            }
          }

          if (isAvailable) {
            const timeFormatter = new Intl.DateTimeFormat('en-US', {
              timeZone: timezone,
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })

            const dateFormatter = new Intl.DateTimeFormat('en-US', {
              timeZone: timezone,
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })

            slots.push({
              start: slotStartUTC,
              end: slotEndUTC,
              startISO: slotStartUTC.toISOString(),
              endISO: slotEndUTC.toISOString(),
              dateStr: dateFormatter.format(slotStartUTC),
              timeStr: timeFormatter.format(slotStartUTC),
            })
          }
        }

        slotStart += slotDurationMinutes + bufferMinutes
      }
    }

    current.setUTCDate(current.getUTCDate() + 1)
  }

  return slots
}

/**
 * Group slots by date for display
 */
export function groupSlotsByDate(slots) {
  const grouped = {}

  for (const slot of slots) {
    const dateKey = slot.dateStr
    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date: dateKey,
        slots: [],
      }
    }
    grouped[dateKey].slots.push(slot)
  }

  return Object.values(grouped)
}
