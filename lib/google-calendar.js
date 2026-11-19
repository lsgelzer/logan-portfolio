/**
 * Google Calendar API utilities
 * Handles OAuth token refresh and Calendar API calls
 */

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3'

/**
 * Get OAuth credentials from environment
 */
function getCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const refreshTokenHello = process.env.GOOGLE_REFRESH_TOKEN_HELLO
  const refreshTokenPersonal = process.env.GOOGLE_REFRESH_TOKEN_PERSONAL

  if (!clientId || !clientSecret) {
    throw new Error('Missing Google OAuth credentials (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)')
  }

  return {
    clientId,
    clientSecret,
    refreshTokenHello,
    refreshTokenPersonal,
  }
}

/**
 * Exchange refresh token for access token
 */
async function getAccessToken(refreshToken) {
  if (!refreshToken) {
    throw new Error('No refresh token provided')
  }

  const { clientId, clientSecret } = getCredentials()

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to refresh access token: ${error}`)
  }

  const data = await response.json()
  return data.access_token
}

/**
 * Get access tokens for both accounts
 */
export async function getAccessTokens() {
  const { refreshTokenHello, refreshTokenPersonal } = getCredentials()

  const [helloToken, personalToken] = await Promise.all([
    refreshTokenHello ? getAccessToken(refreshTokenHello) : null,
    refreshTokenPersonal ? getAccessToken(refreshTokenPersonal) : null,
  ])

  return {
    hello: helloToken,
    personal: personalToken,
  }
}

/**
 * Check free/busy status across multiple calendars
 * @param {string} accessToken - OAuth access token
 * @param {string[]} calendarIds - Calendar IDs to check
 * @param {Date} timeMin - Start of time range
 * @param {Date} timeMax - End of time range
 * @returns {Array<{start: string, end: string}>} - Array of busy periods
 */
export async function getFreeBusy(accessToken, calendarIds, timeMin, timeMax) {
  const response = await fetch(`${GOOGLE_CALENDAR_API}/freeBusy`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      items: calendarIds.map((id) => ({ id })),
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get free/busy: ${error}`)
  }

  const data = await response.json()

  const allBusyPeriods = []
  for (const calendarId of calendarIds) {
    const calendar = data.calendars?.[calendarId]
    if (calendar?.busy) {
      allBusyPeriods.push(...calendar.busy)
    }
  }

  return allBusyPeriods
}

/**
 * Check if a specific time slot is available across all calendars
 * @param {Date} startTime - Start of slot
 * @param {Date} endTime - End of slot
 * @returns {boolean} - True if slot is free
 */
export async function isSlotAvailable(startTime, endTime) {
  const tokens = await getAccessTokens()
  const { calendars } = await import('./booking-config.js').then((m) => m.bookingConfig)

  const calendarIds = [calendars.primary, calendars.secondary].filter(Boolean)

  if (!tokens.hello) {
    throw new Error('Calendar integration not configured')
  }

  const busyPeriods = await getFreeBusy(
    tokens.hello,
    calendarIds,
    startTime,
    endTime
  )

  for (const busy of busyPeriods) {
    const busyStart = new Date(busy.start)
    const busyEnd = new Date(busy.end)

    if (startTime < busyEnd && endTime > busyStart) {
      return false
    }
  }

  return true
}

/**
 * Create a calendar event with Google Meet
 * @param {Object} params - Event parameters
 * @returns {Object} - Created event details
 */
export async function createCalendarEvent({
  summary,
  description,
  startTime,
  endTime,
  attendeeEmail,
  attendeeName,
}) {
  const tokens = await getAccessTokens()
  const { calendars, meeting } = await import('./booking-config.js').then((m) => m.bookingConfig)

  if (!tokens.hello) {
    throw new Error('Calendar integration not configured')
  }

  const event = {
    summary: summary || meeting.title,
    description: description || meeting.description,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: 'UTC',
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: 'UTC',
    },
    attendees: [
      { email: attendeeEmail, displayName: attendeeName },
      { email: calendars.secondary },
    ],
    conferenceData: {
      createRequest: {
        requestId: `booking-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  }

  const response = await fetch(
    `${GOOGLE_CALENDAR_API}/calendars/${encodeURIComponent(calendars.primary)}/events?conferenceDataVersion=1&sendUpdates=all`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokens.hello}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create event: ${error}`)
  }

  const createdEvent = await response.json()

  return {
    id: createdEvent.id,
    htmlLink: createdEvent.htmlLink,
    meetLink: createdEvent.hangoutLink || createdEvent.conferenceData?.entryPoints?.[0]?.uri,
    start: createdEvent.start.dateTime,
    end: createdEvent.end.dateTime,
  }
}
