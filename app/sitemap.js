import { PROFILE } from '@/lib/portfolio-data'

export default function sitemap() {
  const base = PROFILE.url
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
