import { notFound } from 'next/navigation'

import { WorkPage } from '@/components/page-components/work/WorkPage'
import { getIndustry, INDUSTRY_SLUGS } from '@/lib/industries'
import { pageMetadata } from '@/lib/seo'
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
  return pageMetadata({
    title: industry.title,
    description: industry.intro,
    path: `/work/${industry.slug}`,
  })
}

export default async function IndustryRoute({ params }) {
  const { industry: slug } = await params
  const industry = getIndustry(slug)
  if (!industry) notFound()
  const { projects } = await loadHomePageData()
  return <WorkPage projects={projects} industry={industry} />
}
