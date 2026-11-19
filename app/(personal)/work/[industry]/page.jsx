import { notFound } from 'next/navigation'

import {
  filterByIndustry,
  WorkPage,
} from '@/components/page-components/work/WorkPage'
import { getIndustry, industryContent, INDUSTRY_SLUGS } from '@/lib/industries'
import { pageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site-config'
import { loadHomePageData } from '@/sanity/lib/loadData'

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((industry) => ({ industry }))
}

export async function generateMetadata({ params }) {
  const { industry: slug } = await params
  const industry = getIndustry(slug)
  if (!industry) return {}
  const { projects } = await loadHomePageData()
  const { description } = industryContent(
    industry,
    filterByIndustry(projects, industry.slug),
    siteConfig.rates,
  )
  return pageMetadata({
    title: industry.title,
    description,
    path: `/work/${industry.slug}`,
    images: false,
  })
}

export default async function IndustryRoute({ params }) {
  const { industry: slug } = await params
  const industry = getIndustry(slug)
  if (!industry) notFound()
  const { projects } = await loadHomePageData()
  return <WorkPage projects={projects} industry={industry} />
}
