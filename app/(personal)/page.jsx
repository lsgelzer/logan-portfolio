import { HomePage } from '@/components/page-components/home/HomePage'
import { loadHomePageData } from '@/sanity/lib/loadData'

export const revalidate = 3600

export default async function IndexRoute() {
  const data = await loadHomePageData()
  return <HomePage data={data} />
}
