import Link from 'next/link'

import TopBar from '@/components/layout/topbar'
import { getBookingHref, siteConfig } from '@/lib/site-config'

export const metadata = {
  title: 'Coverage: Remote Shopify Development Worldwide | Logan Gelzer',
  description:
    'US-based Senior Shopify Expert working remotely with brands worldwide. Homestead, FL (EST). Shopify Plus, Hydrogen, Recharge, Klaviyo, and more.',
  alternates: {
    canonical: 'https://logangelzer.com/coverage',
  },
}

const PLATFORMS = [
  {
    name: 'Shopify',
    description: 'Standard Shopify stores, Liquid themes, Online Store 2.0',
    experience: '12+ years',
  },
  {
    name: 'Shopify Plus',
    description: 'Enterprise features, Checkout Extensibility, Scripts → Functions, B2B',
    experience: '8+ years',
  },
  {
    name: 'Shopify Hydrogen',
    description: 'Headless storefronts on React, Oxygen hosting, Storefront API',
    experience: '3+ years',
  },
  {
    name: 'Next.js + Shopify',
    description: 'Custom headless builds with Next.js App Router and Storefront API',
    experience: '4+ years',
  },
  {
    name: 'Builder.io + Shopify',
    description: 'Visual editing layer for headless Shopify storefronts',
    experience: '3+ years',
  },
]

const APPS_INTEGRATIONS = [
  { category: 'Subscriptions', apps: ['Recharge', 'Skio', 'Loop', 'Shopify Subscriptions'] },
  { category: 'Email / SMS', apps: ['Klaviyo', 'Postscript', 'Attentive', 'Omnisend'] },
  { category: 'Reviews', apps: ['Okendo', 'Yotpo', 'Junip', 'Stamped'] },
  { category: 'Loyalty', apps: ['Smile.io', 'LoyaltyLion', 'Yotpo Loyalty'] },
  { category: 'Search', apps: ['Algolia', 'Searchspring', 'Klevu'] },
  { category: 'Checkout', apps: ['Checkout Blocks', 'Rebuy', 'CartHook (legacy)'] },
  { category: 'Analytics', apps: ['GA4', 'GTM', 'Triple Whale', 'Northbeam'] },
  { category: 'ERP / OMS', apps: ['NetSuite', 'Brightpearl', 'ShipHero', 'ShipBob'] },
  { category: 'Headless CMS', apps: ['Builder.io', 'Sanity', 'Contentful'] },
]

const TECH_STACK = [
  { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Liquid', 'Rust (Functions)', 'HTML/CSS'] },
  { category: 'Frameworks', items: ['React', 'Next.js', 'Remix', 'Hydrogen', 'Node.js'] },
  { category: 'Styling', items: ['Tailwind CSS', 'CSS Modules', 'Vanilla CSS', 'Polaris'] },
  { category: 'APIs', items: ['Shopify Admin GraphQL', 'Storefront API', 'REST Admin', 'Webhooks'] },
  { category: 'Shopify', items: ['Liquid', 'Shopify Functions', 'Checkout UI Extensions', 'App Extensions', 'Theme Blocks'] },
  { category: 'Testing', items: ['Theme Check', 'Lighthouse', 'Playwright', 'Jest'] },
  { category: 'AI Tools', items: ['Claude Code', 'Cursor', 'Gemini', 'ChatGPT', 'Shopify AI Toolkit'] },
  { category: 'Design', items: ['Figma', 'Photoshop', 'Polaris design system'] },
]

const TIME_ZONES = [
  { zone: 'US Eastern (EST/EDT)', offset: 'UTC-5 / UTC-4', overlap: 'Full day', note: 'My time zone' },
  { zone: 'US Central', offset: 'UTC-6 / UTC-5', overlap: 'Full day', note: '1 hour behind' },
  { zone: 'US Pacific', offset: 'UTC-8 / UTC-7', overlap: '6+ hours', note: '3 hours behind' },
  { zone: 'UK / Western Europe', offset: 'UTC+0 / UTC+1', overlap: '4–6 hours', note: 'Morning overlap' },
  { zone: 'Central Europe', offset: 'UTC+1 / UTC+2', overlap: '4–5 hours', note: 'Morning overlap' },
  { zone: 'Australia (AEST)', offset: 'UTC+10 / UTC+11', overlap: '2–3 hours', note: 'Async works well' },
]

export default function CoveragePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://logangelzer.com/coverage#webpage',
        url: 'https://logangelzer.com/coverage',
        name: 'Coverage: Remote Shopify Development | Logan Gelzer',
        description:
          'US-based Senior Shopify Expert working remotely with brands worldwide.',
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
            name: 'Coverage',
            item: 'https://logangelzer.com/coverage',
          },
        ],
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
            <li className="text-green-ink">Coverage</li>
          </ol>
        </nav>

        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
            <span
              className="size-2.5 rotate-45 border-[1.5px] border-green bg-blue"
              aria-hidden
            />
            <span>
              <b className="font-semibold text-green-ink">Coverage</b>
            </span>
          </div>

          <h1 className="mb-6 max-w-[900px] font-display text-[clamp(36px,5vw,64px)] font-medium leading-[1.05] -tracking-[0.035em] text-green-ink">
            US-Based, Working Remotely with Brands Worldwide
          </h1>

          <div className="mb-8 max-w-[800px] rounded-[14px] border border-green bg-blue p-6">
            <p className="font-openSans text-[16px] leading-[1.7] text-green-ink">
              I'm based in <strong>Homestead, FL</strong> (US Eastern time) and
              work remotely with DTC brands, in-house teams, and agencies across
              the US, Canada, UK, Europe, and Australia. Most communication is
              async via Slack, Notion, or email, with calls scheduled when needed.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[14px] border border-line bg-paper p-6">
              <h3 className="mb-2 font-display text-[20px] font-medium text-green-ink">
                Location
              </h3>
              <p className="font-openSans text-[15px] text-ink-dim">
                Homestead, FL, USA
              </p>
              <p className="mt-1 font-mono text-[12px] text-ink-mute">
                US Eastern Time (EST/EDT)
              </p>
            </div>
            <div className="rounded-[14px] border border-line bg-paper p-6">
              <h3 className="mb-2 font-display text-[20px] font-medium text-green-ink">
                Working style
              </h3>
              <p className="font-openSans text-[15px] text-ink-dim">
                100% remote since 2020
              </p>
              <p className="mt-1 font-mono text-[12px] text-ink-mute">
                Slack, Notion, Loom, Zoom
              </p>
            </div>
            <div className="rounded-[14px] border border-line bg-paper p-6">
              <h3 className="mb-2 font-display text-[20px] font-medium text-green-ink">
                Languages
              </h3>
              <p className="font-openSans text-[15px] text-ink-dim">
                English (native)
              </p>
              <p className="mt-1 font-mono text-[12px] text-ink-mute">
                Spanish (conversational)
              </p>
            </div>
          </div>
        </section>

        <section className="relative bg-paper px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-6 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            Time zone overlap
          </h2>
          <p className="mb-8 max-w-[720px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
            I'm available 9 AM – 6 PM Eastern most days, with flexibility for
            calls outside those hours when needed.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-openSans text-[14px]">
              <thead>
                <tr className="border-b border-line text-left">
                  <th className="pb-3 pr-4 font-display font-medium text-green-ink">
                    Time zone
                  </th>
                  <th className="pb-3 pr-4 font-display font-medium text-green-ink">
                    Offset
                  </th>
                  <th className="pb-3 pr-4 font-display font-medium text-green-ink">
                    Overlap
                  </th>
                  <th className="pb-3 font-display font-medium text-green-ink">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {TIME_ZONES.map((tz, i) => (
                  <tr key={i} className="border-b border-line">
                    <td className="py-3 pr-4 text-ink-dim">{tz.zone}</td>
                    <td className="py-3 pr-4 font-mono text-[12px] text-ink-mute">
                      {tz.offset}
                    </td>
                    <td className="py-3 pr-4 font-medium text-green">
                      {tz.overlap}
                    </td>
                    <td className="py-3 text-ink-mute">{tz.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-6 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            Platforms I work with
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PLATFORMS.map((platform) => (
              <div
                key={platform.name}
                className="rounded-[14px] border border-line bg-paper p-5"
              >
                <div className="mb-2 flex items-baseline justify-between">
                  <h3 className="font-display text-[18px] font-medium text-green-ink">
                    {platform.name}
                  </h3>
                  <span className="font-mono text-[11px] text-green">
                    {platform.experience}
                  </span>
                </div>
                <p className="font-openSans text-[14px] leading-[1.6] text-ink-dim">
                  {platform.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative bg-paper px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-6 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            Apps & integrations
          </h2>
          <p className="mb-8 max-w-[720px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
            I've integrated, customized, or migrated these apps across 200+
            projects:
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {APPS_INTEGRATIONS.map((group) => (
              <div key={group.category}>
                <h3 className="mb-3 font-display text-[16px] font-medium text-green-ink">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.apps.map((app) => (
                    <span
                      key={app}
                      className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-[11px] text-ink-dim"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-6 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            Tech stack
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TECH_STACK.map((group) => (
              <div key={group.category}>
                <h3 className="mb-3 font-display text-[14px] font-medium uppercase tracking-wider text-green">
                  {group.category}
                </h3>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 font-mono text-[12px] text-ink-dim"
                    >
                      <span className="size-1.5 rounded-full bg-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <div className="rounded-[18px] bg-green-ink p-10 text-cream">
            <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
              <div>
                <h2 className="mb-4 font-display text-[32px] font-medium -tracking-[0.02em]">
                  Ready to work together?
                </h2>
                <p className="font-openSans text-[16px] leading-[1.6] text-[oklch(0.90_0.03_160)]">
                  I work with DTC brands and in-house teams across the US and
                  worldwide. Let's discuss your project.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <a
                  href={getBookingHref()}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-green px-6 py-3 font-mono text-[13px] text-cream transition-colors hover:bg-blue hover:text-green-ink"
                >
                  Book a call →
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
              { label: 'Services', href: '/services' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Case studies', href: '/work' },
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
