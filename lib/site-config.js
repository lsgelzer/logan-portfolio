/**
 * Site Configuration
 * Centralized configuration for external services and contact settings.
 *
 * Environment Variables:
 * - NEXT_PUBLIC_BOOKING_URL: Calendar/scheduling URL (e.g., Calendly, Cal.com)
 * - NEXT_PUBLIC_GA4_MEASUREMENT_ID: Google Analytics 4 measurement ID (e.g., G-XXXXXXXXXX)
 * - NEXT_PUBLIC_FORM_ENDPOINT: Form submission endpoint (e.g., Formspree, Netlify Forms)
 * - NEXT_PUBLIC_SHOPEXPERTS_URL: shopexperts.com profile URL (renders only when set)
 */

export const siteConfig = {
  /**
   * Booking/scheduling URL for "Book a call" CTAs.
   * TODO: Set NEXT_PUBLIC_BOOKING_URL in Vercel environment variables
   * Example: https://calendly.com/logangelzer/30min
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || null,

  /**
   * Google Analytics 4 measurement ID.
   * TODO: Set NEXT_PUBLIC_GA4_MEASUREMENT_ID in Vercel environment variables
   * Example: G-XXXXXXXXXX
   */
  ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || null,

  /**
   * Form submission endpoint for project inquiries.
   * TODO: Set NEXT_PUBLIC_FORM_ENDPOINT in Vercel environment variables
   * Example: https://formspree.io/f/xxxxxxxx
   * Falls back to mailto: if not set
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || null,

  /**
   * shopexperts.com profile URL. Renders only when set.
   * TODO: Set NEXT_PUBLIC_SHOPEXPERTS_URL in Vercel environment variables when profile exists
   * Example: https://shopexperts.com/experts/logangelzer
   */
  shopexpertsUrl: process.env.NEXT_PUBLIC_SHOPEXPERTS_URL || null,

  /**
   * Contact email for mailto fallback and display
   */
  contactEmail: 'hello@logangelzer.com',

  /**
   * Location (city, state)
   */
  location: 'Homestead, FL',

  /**
   * Rates and minimums for display
   */
  rates: {
    hourly: 100,
    minimum: 1000,
  },

  /**
   * Years of experience (Shopify work since 2014)
   */
  yearsExperience: '12+',
  yearsSince: 2014,

  /**
   * Brands served
   */
  brandsServed: '200+',

  /**
   * Social and professional profile URLs for structured data sameAs.
   * Only include profiles that actually exist and are maintained.
   */
  sameAsProfiles: [
    'https://www.linkedin.com/in/logan-gelzer/',
    'https://github.com/lsgelzer',
    'https://x.com/logangelzer',
    'https://twitter.com/logangelzer',
    'https://www.instagram.com/logangelzer',
    'https://www.facebook.com/lsgelzer/',
  ],
}

/**
 * Get the booking URL or fallback to contact section anchor
 */
export function getBookingHref() {
  return siteConfig.bookingUrl || '#contact'
}

/**
 * Check if external booking is configured
 */
export function hasExternalBooking() {
  return Boolean(siteConfig.bookingUrl)
}

/**
 * Budget options for project inquiry form
 */
export const BUDGET_OPTIONS = [
  { value: '', label: 'Select a budget range' },
  { value: '1000-2500', label: '$1,000–$2,500' },
  { value: '2500-5000', label: '$2,500–$5,000' },
  { value: '5000-10000', label: '$5,000–$10,000' },
  { value: '10000-25000', label: '$10,000–$25,000' },
  { value: '25000+', label: '$25,000+' },
  { value: 'retainer', label: 'Ongoing retainer' },
]
