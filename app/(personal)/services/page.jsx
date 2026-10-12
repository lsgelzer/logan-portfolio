import Link from 'next/link'

import TopBar from '@/components/layout/topbar'

export const metadata = {
  title: 'Shopify Development Services | Logan Gelzer',
  description:
    'Shopify Plus development, Hydrogen headless storefronts, Checkout Extensibility, CRO, and performance optimization for DTC brands.',
  alternates: {
    canonical: 'https://logangelzer.com/services',
  },
}

const SERVICES = [
  {
    title: 'Shopify Plus Theme Development',
    description:
      'Custom Shopify Plus themes, Online Store 2.0 sections and metafield-driven content built for speed and conversion. Full theme builds, redesigns, and migrations from legacy themes.',
    features: [
      'Custom Liquid themes with OS 2.0 architecture',
      'Sections and blocks for merchant flexibility',
      'Metafield and metaobject-driven content',
      'Theme migrations from 1.0 to 2.0',
      'Performance-first development',
    ],
  },
  {
    title: 'Shopify Hydrogen & Headless',
    description:
      'Hydrogen, Next.js & Builder.io headless storefronts on Shopify. Low-risk migrations from Liquid themes with performance gains.',
    features: [
      'Shopify Hydrogen storefronts',
      'Next.js + Shopify Storefront API',
      'Builder.io visual editing integration',
      'Headless migration planning',
      'Oxygen hosting setup',
    ],
  },
  {
    title: 'Checkout Extensibility & Shopify Functions',
    description:
      'Migrate from checkout.liquid & Shopify Scripts to Checkout UI Extensions and Functions. Discounts, GWP, bundles, and delivery logic.',
    features: [
      'Checkout UI Extensions',
      'Shopify Functions (discounts, delivery, payment)',
      'Post-purchase extensions',
      'checkout.liquid migration',
      'Shopify Scripts replacement',
    ],
  },
  {
    title: 'CRO & A/B Testing',
    description:
      'Hypothesis-driven A/B testing and PDP/cart redesigns for Shopify brands. Design, code, and test under one roof.',
    features: [
      'A/B testing program setup',
      'PDP and cart optimization',
      'Conversion audits',
      'Analytics implementation (GA4, GTM)',
      'Funnel analysis and recommendations',
    ],
  },
  {
    title: 'Speed Optimization',
    description:
      'Fix LCP, CLS, and INP on Shopify & Hydrogen stores. Image, font, and third-party script audits with measurable before/after.',
    features: [
      'Core Web Vitals optimization',
      'Third-party script audit',
      'Image and font optimization',
      'Lighthouse score improvements',
      'Performance monitoring setup',
    ],
  },
  {
    title: 'Subscriptions & Bundles',
    description:
      'Custom subscription portals, bundle builders, and gift-with-purchase flows. Recharge, Shopify Scripts, and native checkout.',
    features: [
      'Recharge integration and customization',
      'Custom bundle builders',
      'Gift-with-purchase in checkout',
      'Subscription portal development',
      'Box builder flows',
    ],
  },
]

function ServiceCard({ title, description, features }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[16px] border border-line bg-paper p-8 transition-all duration-300 hover:border-green hover:shadow-[0_20px_40px_-20px_oklch(0.25_0.06_165/0.3)]">
      <span
        aria-hidden
        className="absolute -right-8 -top-8 size-40 rounded-full bg-blue opacity-20 blur-[20px] transition-opacity group-hover:opacity-40"
      />
      <h3 className="relative z-[1] mb-3 font-display text-[24px] font-medium -tracking-[0.02em] text-green-ink">
        {title}
      </h3>
      <p className="relative z-[1] mb-5 font-openSans text-[15px] leading-[1.6] text-ink-dim">
        {description}
      </p>
      <ul className="relative z-[1] mt-auto space-y-2">
        {features.map((feature, i) => (
          <li
            key={i}
            className="flex items-center gap-2 font-mono text-[12px] text-ink-mute"
          >
            <span className="size-1.5 rounded-full bg-green" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <TopBar />
      <main className="pt-[72px]">
        <section className="relative px-10 py-[120px] max-md:px-5 max-md:py-[80px]">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
            <span
              className="size-2.5 rotate-45 border-[1.5px] border-green bg-blue"
              aria-hidden
            />
            <span>
              <b className="font-semibold text-green-ink">Services</b>
            </span>
          </div>

          <div className="mb-14 grid items-end gap-14 md:grid-cols-[1.2fr_1fr]">
            <h1 className="font-display text-[clamp(42px,6vw,92px)] font-medium leading-[0.98] -tracking-[0.035em] text-green-ink">
              Shopify <em>development services</em>.
            </h1>
            <p className="max-w-[520px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
              Senior Shopify Plus & Hydrogen development for DTC brands. Custom
              themes, headless builds, Checkout Extensibility, CRO, and
              performance optimization.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <ServiceCard
                key={i}
                title={service.title}
                description={service.description}
                features={service.features}
              />
            ))}
          </div>

          <div className="mt-16 rounded-[18px] bg-green-ink p-10 text-cream">
            <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
              <div>
                <h2 className="mb-4 font-display text-[32px] font-medium -tracking-[0.02em]">
                  Ready to start a project?
                </h2>
                <p className="font-openSans text-[16px] leading-[1.6] text-[oklch(0.90_0.03_160)]">
                  Engagements start at $100/hr with a $1,000 minimum project
                  size. Most projects are scoped up front after a short
                  technical discovery, and ongoing retainers are available.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <a
                  href="mailto:hello@logangelzer.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-green px-6 py-3 font-mono text-[13px] text-cream transition-colors hover:bg-blue hover:text-green-ink"
                >
                  Get in touch →
                </a>
                <span className="font-mono text-[11px] text-[oklch(0.75_0.03_160)]">
                  hello@logangelzer.com
                </span>
              </div>
            </div>
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
