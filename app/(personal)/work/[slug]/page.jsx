import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import TopBar from '@/components/layout/topbar'
import { getBookingHref, siteConfig } from '@/lib/site-config'
import { PROJECTS } from '@/lib/portfolio-data'

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.id,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.id === slug)
  if (!project) return {}

  return {
    title: `${project.name} Case Study: ${project.tags[0]} | Logan Gelzer`,
    description: `${project.body[0].slice(0, 155)}...`,
    alternates: {
      canonical: `https://logangelzer.com/work/${slug}`,
    },
    openGraph: {
      title: `${project.name}: ${project.tags.slice(0, 2).join(', ')}`,
      description: project.body[0],
      url: `https://logangelzer.com/work/${slug}`,
      type: 'article',
    },
  }
}

const STACK_LABELS = {
  shopify: 'Shopify',
  liquid: 'Liquid',
  react: 'React',
  nextjs: 'Next.js',
  layers: 'Builder.io',
  ab: 'A/B Testing',
  bolt: 'Klaviyo',
  cart: 'Cart/Checkout',
  figma: 'Figma',
  palette: 'Design',
  spark: 'Recharge',
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.id === slug)

  if (!project) {
    notFound()
  }

  const projectIndex = PROJECTS.findIndex((p) => p.id === slug)
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length]
  const prevProject =
    PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length]

  const urlDisplay = project.url.replace(/^https?:\/\//, '')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `https://logangelzer.com/work/${slug}#article`,
        headline: `${project.name}: ${project.tags[0]}`,
        description: project.body[0],
        author: { '@id': 'https://logangelzer.com/#person' },
        publisher: { '@id': 'https://logangelzer.com/#person' },
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        mainEntityOfPage: `https://logangelzer.com/work/${slug}`,
        image: project.mockup
          ? `https://logangelzer.com${project.mockup}`
          : 'https://logangelzer.com/og-image.png',
        about: {
          '@type': 'CreativeWork',
          name: project.name,
          url: project.url,
        },
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
          {
            '@type': 'ListItem',
            position: 3,
            name: project.name,
            item: `https://logangelzer.com/work/${slug}`,
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
            <li>
              <Link href="/work" className="hover:text-green">
                Work
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li className="text-green-ink">{project.name}</li>
          </ol>
        </nav>

        <article className="px-10 py-[60px] max-md:px-5 max-md:py-[40px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-green px-3 py-1 font-mono text-[11px] text-cream">
                  Case Study
                </span>
                <span className="font-mono text-[11px] text-ink-mute">
                  {project.years}
                </span>
              </div>

              <h1 className="mb-6 font-display text-[clamp(36px,5vw,64px)] font-medium leading-[1.05] -tracking-[0.035em] text-green-ink">
                {project.name}
              </h1>

              <div className="mb-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-blue px-3 py-1.5 font-mono text-[11px] text-green-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-4 font-openSans text-[16px] leading-[1.8] text-ink-dim">
                {project.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-green px-5 py-2.5 font-mono text-[13px] text-cream transition-colors hover:bg-blue hover:text-green-ink"
                >
                  Visit {urlDisplay} →
                </a>
                <a
                  href={getBookingHref()}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-5 py-2.5 font-mono text-[13px] text-green-ink transition-colors hover:border-green hover:bg-blue"
                >
                  Discuss a similar project →
                </a>
              </div>
            </div>

            <div className="lg:sticky lg:top-[100px] lg:self-start">
              {project.mockup && (
                <div className="mb-6 overflow-hidden rounded-[18px] border border-line bg-gradient-to-br from-green to-green-deep p-6">
                  <Image
                    src={project.mockup}
                    alt={`${project.name} screenshot`}
                    width={480}
                    height={960}
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="mx-auto h-auto max-h-[500px] w-auto rounded-xl border-2 border-[oklch(0.1_0.02_160)] shadow-[0_24px_50px_-15px_oklch(0.1_0.03_165/0.6)]"
                    priority
                  />
                </div>
              )}

              <div className="rounded-[14px] border border-line bg-paper p-5">
                <h3 className="mb-4 font-display text-[16px] font-medium text-green-ink">
                  Project details
                </h3>
                <dl className="space-y-3 font-mono text-[12px]">
                  <div className="flex justify-between">
                    <dt className="text-ink-mute">Client</dt>
                    <dd className="text-green-ink">{project.name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-mute">Timeline</dt>
                    <dd className="text-green-ink">{project.years}</dd>
                  </div>
                  <div>
                    <dt className="mb-2 text-ink-mute">Stack</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {(project.stack || []).map((s) => (
                        <span
                          key={s}
                          className="rounded bg-blue px-2 py-1 text-[10px] text-green-ink"
                        >
                          {STACK_LABELS[s] || s}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-2 text-ink-mute">Work done</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-bg px-2 py-1 text-[10px] text-ink-dim"
                        >
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </article>

        <section className="bg-paper px-10 py-[60px] max-md:px-5 max-md:py-[40px]">
          <h2 className="mb-6 font-display text-[24px] font-medium text-green-ink">
            More case studies
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href={`/work/${prevProject.id}`}
              className="group flex items-center gap-4 rounded-[14px] border border-line bg-bg p-4 transition-all hover:border-green"
            >
              <span className="font-mono text-[11px] text-ink-mute">←</span>
              <div>
                <div className="font-mono text-[10px] text-ink-mute">
                  Previous
                </div>
                <div className="font-display text-[16px] font-medium text-green-ink group-hover:text-green">
                  {prevProject.name}
                </div>
              </div>
            </Link>
            <Link
              href={`/work/${nextProject.id}`}
              className="group flex items-center justify-end gap-4 rounded-[14px] border border-line bg-bg p-4 text-right transition-all hover:border-green"
            >
              <div>
                <div className="font-mono text-[10px] text-ink-mute">Next</div>
                <div className="font-display text-[16px] font-medium text-green-ink group-hover:text-green">
                  {nextProject.name}
                </div>
              </div>
              <span className="font-mono text-[11px] text-ink-mute">→</span>
            </Link>
          </div>
        </section>

        <section className="px-10 py-[60px] max-md:px-5 max-md:py-[40px]">
          <div className="rounded-[18px] bg-green-ink p-10 text-cream">
            <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
              <div>
                <h2 className="mb-4 font-display text-[32px] font-medium -tracking-[0.02em]">
                  Need something similar?
                </h2>
                <p className="font-openSans text-[16px] leading-[1.6] text-[oklch(0.90_0.03_160)]">
                  I've built {project.tags[0].toLowerCase()} solutions for 200+
                  brands. Let's discuss your project.
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
