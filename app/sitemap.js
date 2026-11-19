import { INDUSTRY_SLUGS } from '@/lib/industries'
import { loadHomePageData } from '@/sanity/lib/loadData'

export default async function sitemap() {
  const { profile } = await loadHomePageData()
  const base = profile.url
  // Bump these when page content changes; a build timestamp tells crawlers
  // every page changed on every deploy, which erodes trust in lastmod.
  const homeUpdated = new Date('2026-11-19')
  const pagesUpdated = new Date('2026-11-19')
  return [
    {
      url: base,
      lastModified: homeUpdated,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${base}/services`,
      lastModified: pagesUpdated,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/services/ai-shopify-development`,
      lastModified: pagesUpdated,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/about`,
      lastModified: pagesUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/guides`,
      lastModified: pagesUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/guides/claude-code-shopify`,
      lastModified: pagesUpdated,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${base}/work`,
      lastModified: pagesUpdated,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    ...INDUSTRY_SLUGS.map((slug) => ({
      url: `${base}/work/${slug}`,
      lastModified: pagesUpdated,
      changeFrequency: 'weekly',
      priority: 0.75,
    })),
  ]
}
