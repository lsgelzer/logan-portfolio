'use client'

import { useCallback, useState } from 'react'

import { BUDGET_OPTIONS, siteConfig } from '@/lib/site-config'

function buildMailtoBody({ name, email, storeUrl, budget, description }) {
  const budgetLabel =
    BUDGET_OPTIONS.find((o) => o.value === budget)?.label || budget
  return `Hi Logan,

I'm interested in working together on a Shopify project.

Name: ${name}
Email: ${email}
Store URL: ${storeUrl || 'N/A'}
Budget: ${budgetLabel}

Project Description:
${description}

Looking forward to hearing from you!`
}

export default function ProjectInquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    storeUrl: '',
    budget: '',
    description: '',
  })
  const [status, setStatus] = useState('idle')

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      if (siteConfig.formEndpoint) {
        setStatus('submitting')
        try {
          const res = await fetch(siteConfig.formEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...formData,
              _subject: `New project inquiry from ${formData.name}`,
            }),
          })
          if (res.ok) {
            setStatus('success')
            setFormData({
              name: '',
              email: '',
              storeUrl: '',
              budget: '',
              description: '',
            })
          } else {
            setStatus('error')
          }
        } catch {
          setStatus('error')
        }
      } else {
        const subject = encodeURIComponent(
          `Project Inquiry from ${formData.name}`,
        )
        const body = encodeURIComponent(buildMailtoBody(formData))
        window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`
      }
    },
    [formData],
  )

  if (status === 'success') {
    return (
      <div className="rounded-[14px] border border-green bg-blue p-8 text-center">
        <div className="mb-2 font-display text-[24px] font-medium text-green-ink">
          Thanks for reaching out!
        </div>
        <p className="font-openSans text-[15px] text-ink-dim">
          I'll get back to you within 1–2 business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="inquiry-name"
            className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-mute"
          >
            Name *
          </label>
          <input
            type="text"
            id="inquiry-name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-[10px] border border-line bg-paper px-4 py-3 font-openSans text-[15px] text-green-ink placeholder:text-ink-mute focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="inquiry-email"
            className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-mute"
          >
            Email *
          </label>
          <input
            type="email"
            id="inquiry-email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-[10px] border border-line bg-paper px-4 py-3 font-openSans text-[15px] text-green-ink placeholder:text-ink-mute focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="inquiry-store"
            className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-mute"
          >
            Store URL
          </label>
          <input
            type="url"
            id="inquiry-store"
            name="storeUrl"
            value={formData.storeUrl}
            onChange={handleChange}
            className="w-full rounded-[10px] border border-line bg-paper px-4 py-3 font-openSans text-[15px] text-green-ink placeholder:text-ink-mute focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
            placeholder="https://yourstore.com"
          />
        </div>
        <div>
          <label
            htmlFor="inquiry-budget"
            className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-mute"
          >
            Budget *
          </label>
          <select
            id="inquiry-budget"
            name="budget"
            required
            value={formData.budget}
            onChange={handleChange}
            className="w-full appearance-none rounded-[10px] border border-line bg-paper px-4 py-3 font-openSans text-[15px] text-green-ink focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
          >
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={!opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="inquiry-description"
          className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.1em] text-ink-mute"
        >
          Project Description *
        </label>
        <textarea
          id="inquiry-description"
          name="description"
          required
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="w-full resize-none rounded-[10px] border border-line bg-paper px-4 py-3 font-openSans text-[15px] text-green-ink placeholder:text-ink-mute focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
          placeholder="Tell me about your project, goals, and timeline..."
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 font-mono text-[13px] text-cream transition-colors hover:bg-blue hover:text-green-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending...' : 'Send inquiry →'}
        </button>
        {status === 'error' && (
          <span className="font-mono text-[12px] text-red-600">
            Something went wrong. Please try again.
          </span>
        )}
        {!siteConfig.formEndpoint && (
          <span className="font-mono text-[11px] text-ink-mute">
            Opens your email client
          </span>
        )}
      </div>
    </form>
  )
}
