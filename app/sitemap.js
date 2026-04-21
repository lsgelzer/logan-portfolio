import { loadHomePageData } from '@/sanity/lib/loadData'

export default async function sitemap() {
  const { profile } = await loadHomePageData()
  const base = profile.url
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/#about`, lastModified: now, priority: 0.8 },
    { url: `${base}/#clients`, lastModified: now, priority: 0.7 },
    { url: `${base}/#projects`, lastModified: now, priority: 0.9 },
    { url: `${base}/#skills`, lastModified: now, priority: 0.7 },
    { url: `${base}/#contact`, lastModified: now, priority: 0.8 },
  ]
}
