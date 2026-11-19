import Link from 'next/link'

import TopBar from '@/components/layout/topbar'
import FaqSection from '@/components/sections/faq-section/faq-section'
import ProjectsSection from '@/components/sections/projects-section/projects-section'
import { getIndustry, industryContent, industryFilters } from '@/lib/industries'
import { breadcrumbList, JsonLd, PERSON_ID, SITE_URL } from '@/lib/seo'
import { getBookingHref, siteConfig } from '@/lib/site-config'

export function filterByIndustry(projects, slug) {
  return projects.filter((p) => p.industries?.includes(slug))
}

/**
 * Server-rendered case-study text. The cards only expose the story in a
 * client-side modal, so this is what crawlers and answer engines read.
 */
function CaseStudyDetails({ projects, label }) {
  return (
    <section
      aria-labelledby="case-study-details"
      className="px-10 pb-[100px] max-md:px-5 max-md:pb-[70px] [content-visibility:auto] [contain-intrinsic-size:auto_1600px]"
    >
      <h2
        id="case-study-details"
        className="mb-8 font-display text-[clamp(28px,3.4vw,44px)] font-medium -tracking-[0.03em] text-green-ink"
      >
        {label} case studies in detail
      </h2>
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {projects.map((p) => (
          <article key={p.id} className="border-t border-line pt-6">
            <h3 className="font-display text-[22px] font-medium -tracking-[0.02em] text-green-ink">
              {p.name}
            </h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-mute">
              {[p.years, ...p.tags.slice(0, 3)].filter(Boolean).join(' · ')}
            </p>
            {p.body.map((para, i) => (
              <p
                key={i}
                className="mt-3 font-openSans text-[15px] leading-[1.7] text-ink-dim"
              >
                {para}
              </p>
            ))}
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener"
                className="mt-3 inline-block font-mono text-[12px] text-green hover:text-green-ink"
              >
                {p.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')} ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

function IndustryDirectory({ projects }) {
  const filters = industryFilters(projects)
  return (
    <section
      aria-labelledby="browse-by-industry"
      className="px-10 pb-[100px] max-md:px-5 max-md:pb-[70px]"
    >
      <h2
        id="browse-by-industry"
        className="mb-8 font-display text-[clamp(28px,3.4vw,44px)] font-medium -tracking-[0.03em] text-green-ink"
      >
        Browse Shopify work by industry
      </h2>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filters.map((f) => {
          const industry = getIndustry(f.slug)
          const { summary } = industryContent(
            industry,
            filterByIndustry(projects, f.slug),
            siteConfig.rates,
          )
          return (
            <li key={f.slug}>
              <Link
                href={`/work/${f.slug}`}
                className="block h-full rounded-[14px] border border-line bg-paper p-6 transition-colors hover:border-green"
              >
                <span className="font-display text-[20px] font-medium text-green-ink">
                  {industry.label}{' '}
                  <span className="font-mono text-[12px] text-ink-mute">
                    {f.count}
                  </span>
                </span>
                <span className="mt-2 block font-openSans text-[14px] leading-[1.6] text-ink-dim">
                  {summary}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/**
 * Portfolio listing for /work (all projects) and /work/<industry>.
 * Server component: filtering happens at build/revalidate time, so every
 * industry URL is a fully rendered, shareable, indexable page.
 */
export function WorkPage({ projects, industry = null }) {
  const filtered = industry
    ? filterByIndustry(projects, industry.slug)
    : projects
  const content = industry
    ? industryContent(industry, filtered, siteConfig.rates)
    : null
  const path = industry ? `/work/${industry.slug}` : '/work'
  const url = `${SITE_URL}${path}`
  const name = industry ? industry.title : 'Shopify Case Studies by Industry'
  const isAgency = industry?.slug === 'agencies'

  const graph = [
    {
      '@type': 'CollectionPage',
      '@id': `${url}#webpage`,
      url,
      name,
      description: content?.summary,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      author: { '@id': PERSON_ID },
      ...(industry && { about: { '@id': `${url}#service` } }),
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: filtered.length,
        itemListElement: filtered.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'CreativeWork',
            name: `${p.name} Shopify case study`,
            abstract: p.body[0],
            about: p.tags.join(', '),
            url: p.url,
            temporalCoverage: p.years,
            creator: { '@id': PERSON_ID },
          },
        })),
      },
    },
    breadcrumbList([
      { name: 'Work', path: '/work' },
      ...(industry ? [{ name: industry.label, path }] : []),
    ]),
  ]
  if (industry) {
    graph.push(
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: industry.title,
        serviceType: isAgency
          ? 'White-label Shopify development'
          : 'Shopify development',
        description: industry.intro,
        provider: { '@id': PERSON_ID },
        areaServed: 'Worldwide',
        audience: {
          '@type': 'BusinessAudience',
          audienceType: industry.audience,
        },
        url,
      },
      {
        '@type': 'FAQPage',
        mainEntity: content.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': graph }} />
      <TopBar />
      <main className="pt-[72px]">
        <ProjectsSection
          key={industry?.slug || 'all'}
          projects={filtered}
          filters={industryFilters(projects)}
          activeIndustry={industry?.slug || null}
          allCount={projects.length}
          eyebrow={industry ? industry.label : 'All Work'}
          title={
            industry
              ? isAgency
                ? 'White-label Shopify developer for'
                : 'Shopify developer for'
              : 'Shopify case studies'
          }
          titleEm={industry ? industry.audience : 'by industry'}
          intro={
            industry
              ? `${content.summary} ${industry.intro}`
              : `Logan Gelzer's Shopify portfolio: ${projects.length} brands, grouped by industry. Pick one to see the work most relevant to your store.`
          }
          as="h1"
          keepScroll
        />
        {industry ? (
          <>
            <CaseStudyDetails projects={filtered} label={industry.label} />
            <FaqSection
              faqData={content.faqs}
              eyebrow=""
              title={industry.label}
              intro={`Common questions from ${industry.audience} about working with me on Shopify.`}
            />
          </>
        ) : (
          <IndustryDirectory projects={projects} />
        )}
        <section className="px-10 pb-[120px] max-md:px-5 max-md:pb-[80px]">
          <div className="flex flex-col items-start gap-5 rounded-[16px] border border-line bg-paper p-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[620px] font-display text-[clamp(22px,2.4vw,30px)] leading-[1.2] text-green-ink">
              {industry
                ? isAgency
                  ? "Need senior Shopify capacity for your agency? Let's talk."
                  : `Running one of the ${industry.audience} on Shopify? Let's talk about what you're building next.`
                : "Want results like these for your Shopify store? Let's talk about what you're building next."}
            </p>
            <div className="flex gap-3">
              <a
                href={getBookingHref()}
                className="rounded-full bg-green px-5 py-2.5 font-mono text-[12px] text-cream transition-colors hover:bg-green-ink"
              >
                Book a call →
              </a>
              <Link
                href="/services"
                className="rounded-full border border-green-ink px-5 py-2.5 font-mono text-[12px] text-green-ink transition-colors hover:bg-green-ink hover:text-cream"
              >
                Services
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
