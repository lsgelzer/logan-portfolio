'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'

import TopBar from '@/components/layout/topbar'
import { BOOKING_BUDGET_OPTIONS } from '@/lib/booking-config'
import { siteConfig } from '@/lib/site-config'

function trackGA4Event(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.gtag && siteConfig.ga4MeasurementId) {
    window.gtag('event', eventName, params)
  }
}

function formatTimeInTimezone(isoString, timezone) {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}

function formatDateInTimezone(isoString, timezone) {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

function SlotButton({ slot, selected, onClick, timezone }) {
  const isSelected = selected?.startISO === slot.startISO

  return (
    <button
      type="button"
      onClick={() => onClick(slot)}
      className={`rounded-lg border px-4 py-2.5 font-mono text-[13px] transition-all ${
        isSelected
          ? 'border-green bg-green text-cream'
          : 'border-line bg-paper text-green-ink hover:border-green hover:bg-blue'
      }`}
    >
      {formatTimeInTimezone(slot.startISO, timezone)}
    </button>
  )
}

function DateSection({ dateGroup, selectedSlot, onSelectSlot, timezone }) {
  return (
    <div className="rounded-[14px] border border-line bg-paper p-5">
      <h3 className="mb-3 font-display text-[16px] font-medium text-green-ink">
        {dateGroup.date}
      </h3>
      <div className="flex flex-wrap gap-2">
        {dateGroup.slots.map((slot) => (
          <SlotButton
            key={slot.startISO}
            slot={slot}
            selected={selectedSlot}
            onClick={onSelectSlot}
            timezone={timezone}
          />
        ))}
      </div>
    </div>
  )
}

function BookingForm({ selectedSlot, timezone, onSuccess, onError }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    storeUrl: '',
    projectNotes: '',
    budget: '',
    website: '', // honeypot
  })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.budget) newErrors.budget = 'Please select a budget range'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSubmitting(true)
    trackGA4Event('booking_form_submit', { slot_time: selectedSlot.startISO })

    try {
      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startTime: selectedSlot.startISO,
          endTime: selectedSlot.endISO,
          ...formData,
        }),
      })

      const data = await response.json()

      if (data.success) {
        trackGA4Event('booking_confirmed', {
          slot_time: selectedSlot.startISO,
          budget: formData.budget,
        })
        onSuccess(data.booking)
      } else {
        trackGA4Event('booking_error', { error: data.error })
        onError(data.error)
      }
    } catch (err) {
      trackGA4Event('booking_error', { error: 'Network error' })
      onError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-[10px] bg-blue p-4">
        <p className="font-mono text-[12px] text-green">Selected time</p>
        <p className="font-display text-[18px] font-medium text-green-ink">
          {formatDateInTimezone(selectedSlot.startISO, timezone)} at{' '}
          {formatTimeInTimezone(selectedSlot.startISO, timezone)}
        </p>
        <p className="font-mono text-[11px] text-ink-mute">
          30 minutes · Your timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </p>
      </div>

      {/* Honeypot - hidden from users */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] opacity-0"
        aria-hidden="true"
      />

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block font-mono text-[12px] text-ink-mute"
        >
          Your name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full rounded-lg border bg-bg px-4 py-2.5 font-openSans text-[15px] text-ink outline-none transition-colors focus:border-green ${
            errors.name ? 'border-red-500' : 'border-line'
          }`}
          placeholder="Jane Smith"
        />
        {errors.name && (
          <p className="mt-1 font-mono text-[11px] text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block font-mono text-[12px] text-ink-mute"
        >
          Email address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full rounded-lg border bg-bg px-4 py-2.5 font-openSans text-[15px] text-ink outline-none transition-colors focus:border-green ${
            errors.email ? 'border-red-500' : 'border-line'
          }`}
          placeholder="jane@company.com"
        />
        {errors.email && (
          <p className="mt-1 font-mono text-[11px] text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="storeUrl"
          className="mb-1.5 block font-mono text-[12px] text-ink-mute"
        >
          Store URL (optional)
        </label>
        <input
          type="text"
          id="storeUrl"
          name="storeUrl"
          value={formData.storeUrl}
          onChange={handleChange}
          className="w-full rounded-lg border border-line bg-bg px-4 py-2.5 font-openSans text-[15px] text-ink outline-none transition-colors focus:border-green"
          placeholder="yourstore.myshopify.com"
        />
      </div>

      <div>
        <label
          htmlFor="budget"
          className="mb-1.5 block font-mono text-[12px] text-ink-mute"
        >
          Project budget *
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={`w-full rounded-lg border bg-bg px-4 py-2.5 font-openSans text-[15px] text-ink outline-none transition-colors focus:border-green ${
            errors.budget ? 'border-red-500' : 'border-line'
          }`}
        >
          {BOOKING_BUDGET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.budget && (
          <p className="mt-1 font-mono text-[11px] text-red-500">{errors.budget}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="projectNotes"
          className="mb-1.5 block font-mono text-[12px] text-ink-mute"
        >
          Project notes (optional)
        </label>
        <textarea
          id="projectNotes"
          name="projectNotes"
          value={formData.projectNotes}
          onChange={handleChange}
          rows={3}
          className="w-full resize-none rounded-lg border border-line bg-bg px-4 py-2.5 font-openSans text-[15px] text-ink outline-none transition-colors focus:border-green"
          placeholder="Tell me about your project, goals, or any specific questions..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-green px-6 py-3 font-mono text-[14px] text-cream transition-colors hover:bg-blue hover:text-green-ink disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? 'Booking...' : 'Confirm booking'}
      </button>
    </form>
  )
}

function SuccessState({ booking, timezone }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-6 grid size-20 place-items-center rounded-full bg-green">
        <svg
          className="size-10 text-cream"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="mb-3 font-display text-[28px] font-medium text-green-ink">
        You're booked!
      </h2>
      <p className="mb-6 font-openSans text-[16px] text-ink-dim">
        I've sent a calendar invite to your email with the Google Meet link.
      </p>
      <div className="mb-6 rounded-[14px] border border-line bg-paper p-5 text-left">
        <p className="mb-2 font-mono text-[12px] text-ink-mute">Discovery Call</p>
        <p className="font-display text-[18px] font-medium text-green-ink">
          {formatDateInTimezone(booking.start, timezone)}
        </p>
        <p className="font-mono text-[14px] text-green">
          {formatTimeInTimezone(booking.start, timezone)} – {formatTimeInTimezone(booking.end, timezone)}
        </p>
        {booking.meetLink && (
          <a
            href={booking.meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 font-mono text-[13px] text-green hover:underline"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
            Join Google Meet
          </a>
        )}
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-[13px] text-green-ink hover:text-green"
      >
        ← Back to home
      </Link>
    </div>
  )
}

function ErrorState({ error, onRetry }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-6 grid size-20 place-items-center rounded-full bg-red-100">
        <svg
          className="size-10 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h2 className="mb-3 font-display text-[28px] font-medium text-green-ink">
        Booking failed
      </h2>
      <p className="mb-6 font-openSans text-[16px] text-ink-dim">{error}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-2.5 font-mono text-[13px] text-cream transition-colors hover:bg-blue hover:text-green-ink"
      >
        Try again
      </button>
    </div>
  )
}

export default function BookPage() {
  const [loading, setLoading] = useState(true)
  const [availability, setAvailability] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [bookingResult, setBookingResult] = useState(null)
  const [error, setError] = useState(null)

  const visitorTimezone = useMemo(() => {
    if (typeof window !== 'undefined') {
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    }
    return 'America/New_York'
  }, [])

  const fetchAvailability = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/booking/availability')
      const data = await response.json()

      if (data.success) {
        setAvailability(data)
        trackGA4Event('booking_page_view', {
          available_dates: data.dates.length,
        })
      } else {
        setError('Failed to load availability')
      }
    } catch (err) {
      setError('Failed to connect to booking system')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAvailability()
  }, [fetchAvailability])

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot)
    trackGA4Event('booking_slot_selected', { slot_time: slot.startISO })
  }

  const handleSuccess = (booking) => {
    setBookingResult({ success: true, booking })
  }

  const handleError = (errorMsg) => {
    setBookingResult({ success: false, error: errorMsg })
  }

  const handleRetry = () => {
    setBookingResult(null)
    setSelectedSlot(null)
    fetchAvailability()
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <TopBar />
      <main className="flex-1 pt-[72px]">
        <section className="px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <div className="mx-auto max-w-[900px]">
            {/* Header */}
            <div className="mb-10 text-center">
              <div className="mb-4 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
                <span
                  className="size-2.5 rotate-45 border-[1.5px] border-green bg-blue"
                  aria-hidden
                />
                <span>Book a Call</span>
              </div>
              <h1 className="mb-4 font-display text-[clamp(32px,5vw,48px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
                30-Minute Discovery Call
              </h1>
              <p className="mx-auto max-w-[520px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
                Let's discuss your Shopify project. Pick a time that works for you,
                and I'll send you a calendar invite with a Google Meet link.
              </p>
            </div>

            {/* Content */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="size-8 animate-spin rounded-full border-2 border-line border-t-green" />
              </div>
            ) : error && !bookingResult ? (
              <div className="text-center">
                <p className="mb-4 font-openSans text-[16px] text-ink-dim">{error}</p>
                <button
                  onClick={fetchAvailability}
                  className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-2.5 font-mono text-[13px] text-cream transition-colors hover:bg-blue hover:text-green-ink"
                >
                  Try again
                </button>
              </div>
            ) : bookingResult?.success ? (
              <SuccessState booking={bookingResult.booking} timezone={visitorTimezone} />
            ) : bookingResult?.error ? (
              <ErrorState error={bookingResult.error} onRetry={handleRetry} />
            ) : (
              <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                {/* Slot picker */}
                <div>
                  <h2 className="mb-4 font-display text-[20px] font-medium text-green-ink">
                    Select a time
                  </h2>
                  {availability?.dates?.length > 0 ? (
                    <div className="space-y-4">
                      {availability.dates.map((dateGroup) => (
                        <DateSection
                          key={dateGroup.date}
                          dateGroup={dateGroup}
                          selectedSlot={selectedSlot}
                          onSelectSlot={handleSelectSlot}
                          timezone={visitorTimezone}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-[14px] border border-line bg-paper p-8 text-center">
                      <p className="font-openSans text-[15px] text-ink-dim">
                        No available times in the next 30 days.
                      </p>
                      <p className="mt-2 font-mono text-[13px] text-ink-mute">
                        Email{' '}
                        <a
                          href="mailto:hello@logangelzer.com"
                          className="text-green hover:underline"
                        >
                          hello@logangelzer.com
                        </a>{' '}
                        to schedule directly.
                      </p>
                    </div>
                  )}
                </div>

                {/* Form */}
                <div className="lg:sticky lg:top-[100px] lg:self-start">
                  <div className="rounded-[18px] border border-line bg-paper p-6">
                    {selectedSlot ? (
                      <BookingForm
                        selectedSlot={selectedSlot}
                        timezone={visitorTimezone}
                        onSuccess={handleSuccess}
                        onError={handleError}
                      />
                    ) : (
                      <div className="py-8 text-center">
                        <p className="font-openSans text-[15px] text-ink-dim">
                          Select a time slot to continue
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="mt-4 rounded-[14px] border border-line bg-paper p-5">
                    <h3 className="mb-3 font-display text-[16px] font-medium text-green-ink">
                      What to expect
                    </h3>
                    <ul className="space-y-2 font-openSans text-[14px] text-ink-dim">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green" />
                        Quick intro and your current situation
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green" />
                        Your goals and challenges
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green" />
                        How I might be able to help
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-green" />
                        Next steps and timeline
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-paper px-10 py-8 max-md:px-5">
        <div className="flex items-center justify-between font-mono text-[11px] text-ink-mute max-sm:flex-col max-sm:gap-2">
          <div>
            © {new Date().getFullYear()} Logan Gelzer — made with coffee in
            Miami
          </div>
          <Link href="/" className="hover:text-green">
            ← Back to home
          </Link>
        </div>
      </footer>
    </div>
  )
}
