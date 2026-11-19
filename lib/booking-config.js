/**
 * Booking Configuration
 * Centralized settings for the booking system.
 */

export const bookingConfig = {
  /**
   * Duration of booking slots in minutes
   */
  slotDurationMinutes: 30,

  /**
   * Buffer time between meetings in minutes
   */
  bufferMinutes: 15,

  /**
   * Minimum notice required for bookings in hours
   */
  minimumNoticeHours: 24,

  /**
   * How far in advance bookings can be made in days
   */
  bookingWindowDays: 30,

  /**
   * Working hours timezone
   */
  timezone: 'America/New_York',

  /**
   * Working hours configuration
   * Key is day of week (0 = Sunday, 1 = Monday, etc.)
   * Value is array of { start, end } in 24h format
   */
  workingHours: {
    0: [], // Sunday - not available
    1: [{ start: '09:00', end: '17:00' }], // Monday
    2: [{ start: '09:00', end: '17:00' }], // Tuesday
    3: [{ start: '09:00', end: '17:00' }], // Wednesday
    4: [{ start: '09:00', end: '17:00' }], // Thursday
    5: [{ start: '09:00', end: '17:00' }], // Friday
    6: [], // Saturday - not available
  },

  /**
   * Calendar IDs to check for availability
   */
  calendars: {
    primary: 'hello@logangelzer.com',
    secondary: 'lsgelzer7@gmail.com',
  },

  /**
   * Calendar to create events on
   */
  eventCalendar: 'hello@logangelzer.com',

  /**
   * Meeting details
   */
  meeting: {
    title: '30-min Discovery Call with Logan Gelzer',
    description: `Discovery call to discuss your Shopify project.

Agenda:
- Your current store/project situation
- Goals and challenges
- How I might be able to help
- Next steps and timeline

Looking forward to speaking with you!

—Logan Gelzer
Senior Shopify Expert
https://logangelzer.com`,
  },

  /**
   * Rate limiting configuration
   */
  rateLimit: {
    maxRequestsPerHour: 10,
    maxBookingsPerDay: 3,
  },
}

/**
 * Budget options for booking form (from $1,000)
 */
export const BOOKING_BUDGET_OPTIONS = [
  { value: '', label: 'Select a budget range' },
  { value: '1000-2500', label: '$1,000–$2,500' },
  { value: '2500-5000', label: '$2,500–$5,000' },
  { value: '5000-10000', label: '$5,000–$10,000' },
  { value: '10000-25000', label: '$10,000–$25,000' },
  { value: '25000+', label: '$25,000+' },
  { value: 'retainer', label: 'Ongoing retainer' },
]
