import Link from 'next/link'

import TopBar from '@/components/layout/topbar'
import ProjectsSection from '@/components/sections/projects-section/projects-section'
import { industryFilters } from '@/lib/industries'
import { breadcrumbList, JsonLd, PERSON_ID, SITE_URL } from '@/lib/seo'
import { getBookingHref } from '@/lib/site-config'

/**
 * Portfolio listing for /work (all projects) and /work/<industry>.
 * Server component: filtering happens at build/revalidate time, so every
 * industry URL is a fully rendered, shareable, indexable page.
 */
export function WorkPage({ projects, industry = null }) {
  const filtered = industry
    ? projects.filter((p) => p.industries?.includes(industry.slug))
    : projects
  const path = industry ? `/work/${industry.slug}` : '/work'
  const name = industry ? industry.title : 'Shopify Case Studies by Industry'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}${path}#webpage`,
        url: `${SITE_URL}${path}`,
        name,
        author: { '@id': PERSON_ID },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: filtered.length,
          itemListElement: filtered.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'CreativeWork',
              name: `${p.name} Shopify case study`,
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
    ],
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <JsonLd data={jsonLd} />
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
              ? `${industry.label} case studies:`
              : 'Shopify case studies'
          }
          titleEm={industry ? `${filtered.length} brands` : 'by industry'}
          intro={
            industry
              ? industry.intro
              : 'Every brand I have shipped for on Shopify, grouped by industry. Pick one to see the work most relevant to your store.'
          }
          as="h1"
          keepScroll
        />
        <section className="px-10 pb-[120px] max-md:px-5 max-md:pb-[80px]">
          <div className="flex flex-col items-start gap-5 rounded-[16px] border border-line bg-paper p-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[620px] font-display text-[clamp(22px,2.4vw,30px)] leading-[1.2] text-green-ink">
              {industry
                ? `Running a ${industry.label.toLowerCase()} brand on Shopify? Let's talk about what you're building next.`
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
