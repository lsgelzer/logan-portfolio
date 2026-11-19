export const SITE_URL = 'https://logangelzer.com'
export const SITE_NAME = 'Logan Gelzer'
export const PERSON_ID = `${SITE_URL}/#person`
const DEFAULT_OG_IMAGE = '/og-image.png'

/**
 * Per-page metadata. Next.js replaces (not merges) nested objects like
 * openGraph/twitter, so every subpage must set them in full or it inherits
 * the homepage's og:url and title.
 *
 * `title` is the bare page title; the layout's template appends the site name
 * unless `absoluteTitle` is set (for titles that already contain it).
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = 'website',
  ogTitle = title,
  publishedTime,
  modifiedTime,
}) {
  const url = `${SITE_URL}${path}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type,
      images: [
        { url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: ogTitle },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      creator: '@logangelzer',
      images: [DEFAULT_OG_IMAGE],
    },
  }
}

export function breadcrumbList(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  }
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
