import Image from 'next/image'
import Link from 'next/link'

import TopBar from '@/components/layout/topbar'

export const metadata = {
  title: 'About Logan Gelzer, Senior Shopify Expert in Miami',
  description:
    '12+ years building ecommerce for DTC brands. Background, process, and how I work with in-house teams.',
  alternates: {
    canonical: 'https://logangelzer.com/about',
  },
}

const TIMELINE = [
  {
    period: 'Early Career',
    description:
      'Started hands-on in ecommerce: customer service and sales at an online training company. Ended up running the whole site — WooCommerce builds, automations, and a Learning Management System.',
  },
  {
    period: 'Agency Years',
    description:
      'Joined an ecommerce agency, leading projects across Shopify, Shopify Plus, WooCommerce, and BigCommerce. Built expertise in performance optimization and conversion-focused development.',
  },
  {
    period: '2020 – Present',
    description:
      'Full-time Shopify Plus studio. Working with brands like Chubbies, Nolah, Alo Yoga, Overtime, Wild Wonder, BaronFig, and Kudos on headless builds, Checkout Extensibility, and CRO programs.',
  },
]

const SPECIALTIES = [
  'Shopify Plus theme development (Liquid, Online Store 2.0, sections & blocks)',
  'Headless commerce on Shopify Hydrogen, Next.js, Remix, and Builder.io',
  'Checkout Extensibility — Checkout UI Extensions, Checkout Blocks, Shopify Functions',
  'Subscription and bundle experiences — Recharge, Shopify Scripts, custom flows',
  'A/B testing programs, CRO audits, analytics implementation (GA4, GTM)',
  'Core Web Vitals and Lighthouse performance optimization',
  'Design-to-code from Figma with zero hand-off loss',
]

export default function AboutPage() {
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
              <b className="font-semibold text-green-ink">About</b>
            </span>
          </div>

          <div className="grid items-start gap-12 md:grid-cols-[1fr_1.2fr]">
            <div className="relative">
              <div className="sticky top-[100px] overflow-hidden rounded-[18px] border border-line bg-paper">
                <Image
                  src="/portfolio/logan-portrait.png"
                  alt="Logan Gelzer"
                  width={400}
                  height={500}
                  className="h-auto w-full"
                  priority
                />
                <div className="p-6">
                  <h1 className="mb-2 font-display text-[32px] font-medium -tracking-[0.02em] text-green-ink">
                    Logan Gelzer
                  </h1>
                  <p className="mb-4 font-mono text-[12px] text-ink-mute">
                    Shopify Plus & Hydrogen Developer · Miami, FL
                  </p>
                  <a
                    href="mailto:hello@logangelzer.com"
                    className="inline-flex items-center gap-2 rounded-full border border-green bg-blue px-4 py-2 font-mono text-[12px] text-green-ink transition-colors hover:bg-green hover:text-cream"
                  >
                    hello@logangelzer.com →
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-6 font-display text-[clamp(42px,5vw,72px)] font-medium leading-[0.98] -tracking-[0.035em] text-green-ink">
                Senior Shopify Expert in <em>Miami</em>.
              </h2>

              <div className="mb-10 space-y-4 font-openSans text-[16px] leading-[1.7] text-ink-dim">
                <p>
                  I'm Logan — a Senior Shopify Expert based in Miami. For 12+
                  years I've been building, shipping, and scaling ecommerce
                  experiences for direct-to-consumer brands.
                </p>
                <p>
                  I specialize in Shopify Plus and headless commerce with
                  Hydrogen and Next.js. Day-to-day that means custom Liquid
                  themes, Shopify Functions, Checkout Extensibility, Checkout
                  Blocks, and subscription/bundle flows with Recharge and
                  Shopify Scripts.
                </p>
                <p>
                  A defining project was a Miami food brand where I took their
                  ecommerce channel from $200/month to $250,000/month across
                  three channels in two years — a 1,250× multiplier driven by
                  CRO, A/B testing, and a performance-first rebuild.
                </p>
              </div>

              <h3 className="mb-4 font-display text-[24px] font-medium -tracking-[0.02em] text-green-ink">
                Timeline
              </h3>
              <div className="mb-10 space-y-4">
                {TIMELINE.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-[10px] border border-line bg-paper p-5"
                  >
                    <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-green">
                      {item.period}
                    </div>
                    <p className="font-openSans text-[15px] leading-[1.6] text-ink-dim">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="mb-4 font-display text-[24px] font-medium -tracking-[0.02em] text-green-ink">
                Specialties
              </h3>
              <ul className="mb-10 space-y-2">
                {SPECIALTIES.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-openSans text-[15px] leading-[1.6] text-ink-dim"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-green" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="rounded-[14px] bg-green-ink p-8 text-cream">
                <h3 className="mb-3 font-display text-[24px] font-medium -tracking-[0.02em]">
                  Ready to work together?
                </h3>
                <p className="mb-5 font-openSans text-[15px] leading-[1.6] text-[oklch(0.90_0.03_160)]">
                  Engagements start at $100/hr with a $1,000 minimum project
                  size. Most projects are scoped up front after a short
                  technical discovery.
                </p>
                <a
                  href="mailto:hello@logangelzer.com"
                  className="inline-flex items-center gap-2 rounded-full bg-green px-5 py-2.5 font-mono text-[12px] text-cream transition-colors hover:bg-blue hover:text-green-ink"
                >
                  Get in touch →
                </a>
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
