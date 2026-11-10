import Image from 'next/image'
import Link from 'next/link'

import TopBar from '@/components/layout/topbar'
import { PROJECTS } from '@/lib/portfolio-data'

export const metadata = {
  title: 'Case Studies: Shopify Plus & Headless Projects | Logan Gelzer',
  description:
    'Shopify Plus case studies from 200+ brands: PDPs, checkout, headless, subscriptions, and performance. Real results with details.',
  alternates: {
    canonical: 'https://logangelzer.com/work',
  },
}

const ART_GRADIENTS = [
  'bg-gradient-to-br from-[var(--green)] to-[var(--green-deep)]',
  'bg-gradient-to-br from-[var(--blue-deep)] to-[var(--green)]',
  'bg-gradient-to-br from-[var(--green-ink)] to-[var(--blue-deep)]',
  'bg-gradient-to-br from-[var(--green-deep)] to-[oklch(0.45_0.1_170)]',
  'bg-gradient-to-br from-[oklch(0.38_0.08_180)] to-[var(--green-ink)]',
  'bg-gradient-to-br from-[var(--green)] to-[oklch(0.55_0.11_220)]',
  'bg-gradient-to-br from-[oklch(0.40_0.09_155)] to-[var(--green-deep)]',
  'bg-gradient-to-br from-[var(--blue-deep)] to-[var(--green-ink)]',
  'bg-gradient-to-br from-[var(--green-deep)] to-[oklch(0.50_0.10_195)]',
]

function ProjectCard({ project, index }) {
  const { name, years, mockup, logo, tags, id } = project
  return (
    <Link
      href={`/work/${id}`}
      className="group relative flex min-h-[340px] flex-col gap-3.5 overflow-hidden rounded-[16px] border border-line bg-paper p-[22px] text-left transition-all duration-300 [transition-timing-function:cubic-bezier(0.2,0.7,0,1)] hover:-translate-y-1.5 hover:border-green hover:shadow-[0_30px_60px_-30px_oklch(0.3_0.08_165/0.4)]"
    >
      <span
        aria-hidden
        className="absolute right-5 top-5 grid size-8 place-items-center rounded-full bg-bg-3 text-[14px] text-green-ink transition-all group-hover:rotate-45 group-hover:bg-green group-hover:text-cream"
      >
        ↗
      </span>
      <div
        className={`relative grid h-[220px] place-items-center overflow-hidden rounded-[10px] ${ART_GRADIENTS[index % 9]}`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,oklch(0.95_0.02_230/0.15)_1px,transparent_1px)] [background-size:12px_12px]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 size-40 rounded-full bg-[oklch(0.86_0.07_230/0.35)] blur-[1px] opacity-55"
        />
        <div className="absolute left-3 top-2.5 z-[2] font-mono text-[10px] tracking-[0.15em] text-cream opacity-85">
          CASE / {String(index + 1).padStart(2, '0')}
        </div>
        {mockup ? (
          <Image
            src={mockup}
            alt={`${name} mockup`}
            width={240}
            height={480}
            sizes="(min-width: 1024px) 240px, (min-width: 640px) 40vw, 48vw"
            className="relative z-[2] h-auto max-h-[92%] w-auto max-w-[48%] translate-y-3 -rotate-2 rounded-xl border-2 border-[oklch(0.1_0.02_160)] shadow-[0_18px_36px_-12px_oklch(0.15_0.04_165/0.55),0_4px_10px_oklch(0.15_0.04_165/0.2)] transition-transform duration-500 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] group-hover:translate-y-0 group-hover:rotate-0 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="relative z-[2] px-3 text-center font-display text-[32px] font-medium -tracking-[0.03em] text-cream">
            {name}
          </div>
        )}
      </div>
      <div className="flex items-baseline justify-between font-mono text-[11px] tracking-[0.05em] text-ink-mute">
        <span>{years}</span>
        <span>CASE · {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="flex min-h-7 items-center">
        {logo ? (
          <Image
            src={logo}
            alt={name}
            width={100}
            height={24}
            sizes="100px"
            className="h-auto max-h-6 w-auto max-w-[70%] object-contain opacity-85 [filter:grayscale(1)_contrast(0.9)] transition-[filter,opacity] duration-300 group-hover:opacity-100 group-hover:[filter:none]"
            loading="lazy"
            unoptimized={logo.endsWith('.svg')}
          />
        ) : (
          <div className="font-display text-[24px] font-medium leading-none -tracking-[0.02em] text-green-ink">
            {name}
          </div>
        )}
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded bg-blue px-2 py-1 font-mono text-[10px] text-green-ink"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  )
}

export default function WorkPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://logangelzer.com/work#webpage',
        url: 'https://logangelzer.com/work',
        name: 'Case Studies | Logan Gelzer',
        description:
          'Shopify Plus case studies from 200+ brands.',
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
            name: 'Work',
            item: 'https://logangelzer.com/work',
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
            <li className="text-green-ink">Work</li>
          </ol>
        </nav>

        <section className="relative px-10 py-[80px] max-md:px-5 max-md:py-[60px]">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-mute">
            <span
              className="size-2.5 rotate-45 border-[1.5px] border-green bg-blue"
              aria-hidden
            />
            <span>
              <b className="font-semibold text-green-ink">Case Studies</b>
            </span>
          </div>

          <div className="mb-14 grid items-end gap-14 md:grid-cols-[1.2fr_1fr]">
            <h1 className="font-display text-[clamp(42px,6vw,92px)] font-medium leading-[0.98] -tracking-[0.035em] text-green-ink">
              Shopify Plus case studies: <em>results I shipped</em>.
            </h1>
            <p className="max-w-[520px] font-openSans text-[16px] leading-[1.7] text-ink-dim">
              Detailed case studies across custom PDPs, headless migrations,
              variant switchers, subscription and bundle flows, gift-with-purchase
              in checkout, and performance wins.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
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
