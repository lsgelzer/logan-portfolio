import { loadHomePageData } from '@/sanity/lib/loadData'

export default async function sitemap() {
  const { profile } = await loadHomePageData()
  const base = profile.url
  const now = new Date()
  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${base}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
