import Link from 'next/link'

import TopBar from '@/components/layout/topbar'
import { getBookingHref, siteConfig } from '@/lib/site-config'
import { CLIENTS, PROJECTS } from '@/lib/portfolio-data'

export const metadata = {
  title: 'Proof: Testimonials & Case Studies | Logan Gelzer',
  description:
    'Real testimonials and case studies from 200+ DTC brands. Shopify Plus, Hydrogen, checkout, performance, and CRO results.',
  alternates: {
    canonical: 'https://logangelzer.com/proof',
  },
}

const TESTIMONIALS = [
  {
    quote:
      "Logan is great. Very detailed and follows through on his commitments. He hears feedback and is willing to accommodate requests - but also pushes back when the feedback pushes against best practice. Would definitely work with Logan again!",
    brand: 'Unitus',
    year: '2024',
  },
  {
    quote:
      "Excellent! We threw a messy Shopify 1.0 build at Logan with years of wonky code / legacy app garbage, and Logan worked through multiple revisions to fully refactor the site to Shopify 2.0. Thanks!",
    brand: 'Gladskin',
    year: '2023',
  },
  {
    quote:
      "Logan was given a challenging and difficult project that he handled with incredible skill, confidence, and grace -- all in ~24 hours during one of the busiest times of the year! I'm in awe. Hire him!",
    brand: 'Museum Quality Art',
    year: '2023',
  },
  {
    quote:
      "I asked Logan to develop a rather complex PDP page for our store and he nailed it. Worked seamlessly and was scalable across our products.",
    brand: 'Kayode',
    year: '2024',
  },
  {
    quote:
      "We worked with Logan on sitespeed optimization. He was quick to respond and conduct a thorough audit before we proceeded with the changes. Any issues that came up, Logan would be proactive to flag and optimize.",
    brand: 'ONDO',
    year: '2024',
  },
  {
    quote:
      "Logan is an excellent partner. We were so grateful for this knowledge, speed, attention to detail and communication!",
    brand: 'Táche Pistachio Milk',
    year: '2023',
  },
]

const RESULTS = [
  {
    metric: '$200/mo → $250k/mo',
    description: 'Revenue growth over 2 years',
    context: 'Local food brand, CRO + performance rebuild',
    multiplier: '1,250×',
  },
  {
    metric: '+142%',
    description: 'Conversion rate increase',
    context: 'A/B testing winner, PDP optimization',
    multiplier: null,
  },
  {
    metric: '2.1s LCP',
    description: 'Largest Contentful Paint',
    context: 'Core Web Vitals optimization',
    multiplier: null,
  },
  {
    metric: '98/100',
    description: 'PageSpeed Insights score',
    context: 'Lighthouse performance',
    multiplier: null,
  },
]

function TestimonialCard({ quote, brand, year }) {
  return (
    <blockquote className="group relative flex flex-col gap-4 overflow-hidden rounded-[14px] border border-line bg-paper p-6 transition-all duration-300 hover:border-green hover:shadow-[0_20px_40px_-20px_oklch(0.25_0.06_165/0.3)]">
      <span
        aria-hidden
        className="absolute -right-4 -top-4 font-display text-[120px] leading-none text-blue opacity-20"
      >
        "
      </span>
      <p className="relative z-[1] font-openSans text-[15px] leading-[1.7] text-ink-dim">
        "{quote}"
      </p>
      <cite className="relative z-[1] mt-auto flex items-baseline justify-between not-italic">
        <span className="font-display text-[16px] font-medium text-green-ink">
          {brand}
        </span>
        <span className="font-mono text-[11px] text-ink-mute">{year}</span>
      </cite>
    </blockquote>
  )
}

export default function ProofPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://logangelzer.com/proof#webpage',
        url: 'https://logangelzer.com/proof',
        name: 'Proof: Testimonials & Case Studies | Logan Gelzer',
        description:
          'Real testimonials and case studies from 200+ DTC brands.',
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
            name: 'Proof',
            item: 'https://logangelzer.com/proof',
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
            <li className="text-green-ink">Proof</li>
          </ol>
        </nav>

        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
            <span
              className="size-2.5 rotate-45 border-[1.5px] border-green bg-blue"
              aria-hidden
            />
            <span>
              <b className="font-semibold text-green-ink">Proof</b>
            </span>
          </div>

          <h1 className="mb-6 max-w-[900px] font-display text-[clamp(36px,5vw,64px)] font-medium leading-[1.05] -tracking-[0.035em] text-green-ink">
            Testimonials & Results from 200+ Brands
          </h1>

          <div className="mb-8 max-w-[800px] rounded-[14px] border border-green bg-blue p-6">
            <p className="font-openSans text-[16px] leading-[1.7] text-green-ink">
              Real feedback and measurable results from DTC brands, in-house
              teams, and agencies I've worked with since 2014. Every testimonial
              is from an actual project. No fake reviews.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {RESULTS.map((result, i) => (
              <div
                key={i}
                className="rounded-[14px] border border-line bg-paper p-5"
              >
                <div className="mb-2 font-display text-[32px] font-medium -tracking-[0.02em] text-green-ink">
                  {result.metric}
                </div>
                <div className="mb-1 font-mono text-[12px] text-green">
                  {result.description}
                </div>
                <div className="font-openSans text-[13px] text-ink-mute">
                  {result.context}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative bg-paper px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-6 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            What clients say
          </h2>
          <p className="mb-8 max-w-[720px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
            Unedited feedback from brands I've worked with:
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard
                key={i}
                quote={t.quote}
                brand={t.brand}
                year={t.year}
              />
            ))}
          </div>

          {siteConfig.shopexpertsUrl && (
            <p className="mt-8 font-mono text-[12px] text-ink-mute">
              See more reviews on{' '}
              <a
                href={siteConfig.shopexpertsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green hover:underline"
              >
                shopexperts.com →
              </a>
            </p>
          )}
        </section>

        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-6 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            Case studies
          </h2>
          <p className="mb-8 max-w-[720px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
            Detailed write-ups from recent projects. Each case study includes
            the problem, approach, and results.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.slice(0, 9).map((project) => (
              <Link
                key={project.id}
                href={`/work/${project.id}`}
                className="group relative flex flex-col rounded-[14px] border border-line bg-paper p-5 transition-all duration-300 hover:border-green hover:shadow-[0_20px_40px_-20px_oklch(0.25_0.06_165/0.3)]"
              >
                <div className="mb-2 flex items-baseline justify-between">
                  <h3 className="font-display text-[18px] font-medium text-green-ink">
                    {project.name}
                  </h3>
                  <span className="font-mono text-[11px] text-ink-mute">
                    {project.years}
                  </span>
                </div>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-blue px-2 py-0.5 font-mono text-[10px] text-green-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="line-clamp-2 flex-1 font-openSans text-[14px] leading-[1.6] text-ink-dim">
                  {project.body[0]}
                </p>
                <span className="mt-3 font-mono text-[12px] text-green transition-colors group-hover:text-green-ink">
                  Read case study →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 font-mono text-[13px] text-green-ink transition-colors hover:border-green hover:bg-blue"
            >
              View all case studies →
            </Link>
          </div>
        </section>

        <section className="relative bg-paper px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <h2 className="mb-6 font-display text-[clamp(28px,4vw,42px)] font-medium leading-[1.1] -tracking-[0.02em] text-green-ink">
            Brands I've worked with
          </h2>
          <p className="mb-8 max-w-[720px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
            200+ brands since 2014, including:
          </p>

          <div className="flex flex-wrap gap-3">
            {CLIENTS.map((client) => (
              <span
                key={client.name}
                className="rounded-full border border-line bg-bg px-4 py-2 font-mono text-[12px] text-ink-dim"
              >
                {client.name}
              </span>
            ))}
          </div>
        </section>

        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <div className="rounded-[18px] bg-green-ink p-10 text-cream">
            <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
              <div>
                <h2 className="mb-4 font-display text-[32px] font-medium -tracking-[0.02em]">
                  Want results like these?
                </h2>
                <p className="font-openSans text-[16px] leading-[1.6] text-[oklch(0.90_0.03_160)]">
                  I've been doing this for 12+ years across 200+ brands. Let's
                  discuss what I can do for yours.
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
