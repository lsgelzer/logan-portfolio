import Link from 'next/link'

import TopBar from '@/components/layout/topbar'
import { getBookingHref, siteConfig } from '@/lib/site-config'

export const metadata = {
  title: 'Shopify Development Pricing: Rates & What Drives Cost | Logan Gelzer',
  description:
    'Senior Shopify Expert rates from $100/hr with a $1,000 minimum project. Learn what drives Shopify development cost and how I scope projects.',
  alternates: {
    canonical: 'https://logangelzer.com/pricing',
  },
}

const PRICING_TIERS = [
  {
    name: 'Hourly',
    price: '$100',
    unit: '/hr',
    description: 'For focused tasks, bug fixes, and small improvements.',
    features: [
      'Minimum 10-hour commitment',
      'Flexible scheduling',
      'Progress updates each session',
      'Direct communication',
    ],
    bestFor: 'Bug fixes, small features, consultations',
  },
  {
    name: 'Fixed Project',
    price: 'From $1,000',
    unit: '',
    description: 'Scoped projects with clear deliverables and timeline.',
    features: [
      'Detailed scope document',
      'Milestone-based delivery',
      'Unpublished theme preview',
      'Launch support included',
    ],
    bestFor: 'Theme sections, PDP redesigns, checkout work',
    popular: true,
  },
  {
    name: 'Retainer',
    price: 'From $2,000',
    unit: '/mo',
    description: 'Ongoing development capacity with priority response.',
    features: [
      '20+ hours/month commitment',
      'Priority scheduling',
      'Slack or Teams access',
      'Quarterly roadmap planning',
    ],
    bestFor: 'Ongoing development, A/B testing programs',
  },
]

const COST_DRIVERS = [
  {
    factor: 'Complexity',
    description:
      'A static section is simpler than a bundle builder with Shopify Functions. The more logic, conditions, and edge cases, the more time.',
    examples: ['Simple: static banner, $300–$600', 'Complex: bundle builder with discounting, $3,000–$8,000'],
  },
  {
    factor: 'Integration depth',
    description:
      'Connecting to one app is quick. Orchestrating data across Recharge, Klaviyo, an ERP, and custom metafields takes longer.',
    examples: ['Single app: Klaviyo signup, $400–$800', 'Multi-system: subscription + loyalty + ERP, $5,000+'],
  },
  {
    factor: 'Design readiness',
    description:
      "Pixel-ready Figma files speed up builds. If we're designing in code, expect an extra round.",
    examples: ['With Figma: save 20–30%', 'Design-in-code: add 1–2 iterations'],
  },
  {
    factor: 'Store complexity',
    description:
      'A clean OS 2.0 theme is faster to work with than a 1.0 theme with 15 apps injecting scripts.',
    examples: ['Clean theme: standard rates', 'Legacy + app bloat: add 20–40% for cleanup'],
  },
  {
    factor: 'Timeline',
    description:
      "I don't charge rush fees, but tight deadlines may limit scope or require phased delivery.",
    examples: ['Standard: 1–2 week lead time', 'Rush: scope adjusted to fit'],
  },
]

const COMMON_PROJECTS = [
  {
    project: 'Custom theme section (OS 2.0)',
    range: '$400–$1,200',
    timeline: '3–5 days',
  },
  {
    project: 'PDP redesign with variant logic',
    range: '$1,500–$4,000',
    timeline: '1–2 weeks',
  },
  {
    project: 'Checkout UI Extension (GWP, upsell)',
    range: '$1,200–$3,500',
    timeline: '1–2 weeks',
  },
  {
    project: 'Shopify Function (discount, delivery)',
    range: '$1,500–$4,000',
    timeline: '1–2 weeks',
  },
  {
    project: 'Full theme build (from Figma)',
    range: '$8,000–$25,000',
    timeline: '4–8 weeks',
  },
  {
    project: 'Hydrogen storefront (headless)',
    range: '$15,000–$40,000+',
    timeline: '6–12 weeks',
  },
  {
    project: 'A/B testing program setup',
    range: '$2,000–$5,000',
    timeline: '1–3 weeks',
  },
  {
    project: 'Core Web Vitals audit + fixes',
    range: '$1,500–$4,000',
    timeline: '1–2 weeks',
  },
]

const FAQ_ITEMS = [
  {
    question: 'How much does it cost to hire a Shopify developer?',
    answer:
      'Senior Shopify developers typically charge $75–$200/hr. My rate starts at $100/hr with a $1,000 minimum project. Most clients spend $2,000–$10,000 on a typical project like a PDP redesign or checkout customization.',
  },
  {
    question: 'Do you require a deposit?',
    answer:
      'Yes. Fixed projects require 50% upfront, with the balance due before launch. Retainers are billed monthly in advance.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'ACH, wire transfer, and credit card (via Stripe). International clients can pay via wire or Wise.',
  },
  {
    question: 'Can you work within my budget?',
    answer:
      "Usually. If your budget is tight, we can reduce scope, phase the work, or prioritize the highest-impact changes. I'll be honest if something isn't feasible.",
  },
  {
    question: 'Do you offer discounts for agencies?',
    answer:
      'I work white-label with agencies at the same rates. Volume commitments (40+ hours/month) can be negotiated.',
  },
]

function FaqItem({ question, answer }) {
  return (
    <details className="group border-b border-line last:border-b-0">
      <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors hover:text-green [&::-webkit-details-marker]:hidden">
        <span className="font-display text-[18px] font-medium -tracking-[0.01em] text-green-ink md:text-[20px]">
          {question}
        </span>
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line bg-paper text-[18px] text-green-ink transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="pb-5">
        <p className="max-w-[720px] font-openSans text-[15px] leading-[1.7] text-ink-dim">
          {answer}
        </p>
      </div>
    </details>
  )
}

export default function PricingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://logangelzer.com/pricing#webpage',
        url: 'https://logangelzer.com/pricing',
        name: 'Shopify Development Pricing | Logan Gelzer',
        description:
          'Senior Shopify Expert rates from $100/hr with a $1,000 minimum project.',
        isPartOf: { '@id': 'https://logangelzer.com/#website' },
        about: { '@id': 'https://logangelzer.com/#person' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://logangelzer.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Pricing',
            item: 'https://logangelzer.com/pricing',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <TopBar />
      <main className="pt-[72px]">
        <nav className="px-10 pt-8 max-md:px-5" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-mono text-[11px] text-ink-mute">
            <li>
              <Link href="/" className="hover:text-green">
                Home
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-green-ink">Pricing</li>
          </ol>
        </nav>

        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
            <span
              className="size-2.5 rotate-45 border-[1.5px] border-green bg-blue"
              aria-hidden
            />
            <span>
              <b className="font-semibold text-green-ink">Pricing</b>
            </span>
          </div>

          <h1 className="mb-6 max-w-[900px] font-display text-[clamp(36px,5vw,64px)] font-medium leading-[1.05] -tracking-[0.035em] text-green-ink">
            Shopify Development Pricing
          </h1>

          <div className="mb-8 max-w-[800px] rounded-[14px] border border-green bg-blue p-6">
            <h2 className="mb-2 font-display text-[18px] font-medium text-green-ink">
              How much does it cost to work with Logan Gelzer?
            </h2>
            <p className="font-openSans text-[16px] leading-[1.7] text-green-ink">
              Engagements start at <strong>$100/hr</strong> with a{' '}
              <strong>$1,000 minimum project</strong> as of November 2026. Most
              projects (PDP redesigns, checkout work, custom sections) run
              $2,000–$10,000. Retainers for ongoing development start at
              $2,000/month. You work directly with me — no account managers, no
              junior hand-offs.
            </p>
            <p className="mt-3 font-mono text-[12px] text-ink-mute">
              Last updated: November 2026 · Based on 200+ projects since 2014
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-[16px] border p-6 ${
                  tier.popular
                    ? 'border-green bg-paper shadow-[0_20px_40px_-20px_oklch(0.25_0.06_165/0.3)]'
                    : 'border-line bg-paper'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-green px-3 py-1 font-mono text-[10px] text-cream">
                    Most common
                  </span>
                )}
                <h3 className="mb-2 font-display text-[24px] font-medium text-green-ink">
                  {tier.name}
                </h3>
                <div className="mb-4">
                  <span className="font-display text-[36px] font-medium text-green-ink">
                    {tier.price}
                  </span>
                  <span className="font-mono text-[14px] text-ink-mute">
                    {tier.unit}
                  </span>
                </div>
                <p className="mb-4 font-openSans text-[15px] leading-[1.6] text-ink-dim">
                  {tier.description}
                </p>
                <ul className="mb-4 space-y-2">
                  {tier.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 font-mono text-[12px] text-ink-mute"
                    >
                      <span className="size-1.5 rounded-full bg-green" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto rounded-[8px] bg-blue px-3 py-2 font-mono text-[11px] text-green-ink">
                  Best for: {tier.bestFor}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative bg-paper px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-6 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            What drives Shopify development cost
          </h2>
          <p className="mb-8 max-w-[720px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
            Every project is different. Here's what affects the price:
          </p>

          <div className="space-y-4">
            {COST_DRIVERS.map((driver) => (
              <div
                key={driver.factor}
                className="rounded-[14px] border border-line bg-bg p-6"
              >
                <h3 className="mb-2 font-display text-[20px] font-medium text-green-ink">
                  {driver.factor}
                </h3>
                <p className="mb-3 font-openSans text-[15px] leading-[1.7] text-ink-dim">
                  {driver.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {driver.examples.map((example, i) => (
                    <span
                      key={i}
                      className="rounded bg-blue px-2.5 py-1 font-mono text-[11px] text-green-ink"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-6 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            Common project ranges
          </h2>
          <p className="mb-8 max-w-[720px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
            These are typical ranges based on past projects. Your actual quote
            depends on scope after a short discovery call.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-openSans text-[14px]">
              <thead>
                <tr className="border-b border-line text-left">
                  <th className="pb-3 pr-4 font-display font-medium text-green-ink">
                    Project
                  </th>
                  <th className="pb-3 pr-4 font-display font-medium text-green-ink">
                    Typical range
                  </th>
                  <th className="pb-3 font-display font-medium text-green-ink">
                    Timeline
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMMON_PROJECTS.map((item, i) => (
                  <tr key={i} className="border-b border-line">
                    <td className="py-3 pr-4 text-ink-dim">{item.project}</td>
                    <td className="py-3 pr-4 font-medium text-green">
                      {item.range}
                    </td>
                    <td className="py-3 text-ink-mute">{item.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-mono text-[12px] text-ink-mute">
            Ranges based on 200+ projects. Exact pricing after scoping call.
          </p>
        </section>

        <section className="relative bg-paper px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-10 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            Pricing FAQ
          </h2>
          <div className="mx-auto max-w-[800px] rounded-[14px] border border-line bg-bg px-8 py-2">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </section>

        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <div className="rounded-[18px] bg-green-ink p-10 text-cream">
            <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
              <div>
                <h2 className="mb-4 font-display text-[32px] font-medium -tracking-[0.02em]">
                  Ready to get a quote?
                </h2>
                <p className="font-openSans text-[16px] leading-[1.6] text-[oklch(0.90_0.03_160)]">
                  Tell me what you need built. I'll reply with a scoped
                  estimate and timeline within 24 hours.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <a
                  href={getBookingHref()}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-green px-6 py-3 font-mono text-[13px] text-cream transition-colors hover:bg-blue hover:text-green-ink"
                >
                  Book a scoping call →
                </a>
                <span className="font-mono text-[11px] text-[oklch(0.75_0.03_160)]">
                  {siteConfig.contactEmail}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-10 pb-[80px] max-md:px-5 max-md:pb-[60px]">
          <h3 className="mb-4 font-display text-[18px] font-medium text-green-ink">
            Related
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'All services', href: '/services' },
              { label: 'Case studies', href: '/work' },
              { label: 'About Logan', href: '/about' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full border border-line bg-paper px-4 py-2 font-mono text-[12px] text-green-ink transition-colors hover:border-green hover:bg-blue"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-paper px-10 py-8 max-md:px-5">
        <div className="flex items-center justify-between font-mono text-[11px] text-ink-mute max-sm:flex-col max-sm:gap-2">
          <div>
            © {new Date().getFullYear()} Logan Gelzer — made with coffee in
            Homestead
          </div>
          <Link href="/" className="hover:text-green">
            ← Back to home
          </Link>
        </div>
      </footer>
    </div>
  )
}
