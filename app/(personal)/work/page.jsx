import { WorkPage } from '@/components/page-components/work/WorkPage'
import { loadHomePageData } from '@/sanity/lib/loadData'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 3600

export const metadata = pageMetadata({
  title: 'Shopify Case Studies by Industry',
  description:
    'Shopify Plus, Hydrogen, and custom theme case studies for apparel, supplement, food & beverage, home, pet, automotive, and agency clients. Filter by industry.',
  path: '/work',
})

export default async function WorkRoute() {
  const { projects } = await loadHomePageData()
  return <WorkPage projects={projects} />
}
