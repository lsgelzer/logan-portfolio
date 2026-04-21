import { Suspense } from 'react'

import { PROFILE } from '@/lib/portfolio-data'

const SITE_URL = PROFILE.url
const DEFAULT_TITLE = `${PROFILE.name} — Shopify Expert, Software Developer, UI/UX Designer`
const DEFAULT_DESC = `${PROFILE.name} is a Miami-based Shopify and ecommerce developer with 12+ years building high-performing online stores for DTC brands. Available for freelance engagements.`

export function generateMetadata() {
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: DEFAULT_TITLE, template: `%s | ${PROFILE.name}` },
    description: DEFAULT_DESC,
    applicationName: PROFILE.name,
    authors: [{ name: PROFILE.name, url: SITE_URL }],
    creator: PROFILE.name,
    publisher: PROFILE.name,
    keywords: [
      'Shopify expert',
      'Shopify developer',
      'ecommerce developer',
      'Hydrogen developer',
      'Shopify Plus',
      'Miami Shopify developer',
      'freelance Shopify',
      'Next.js developer',
      'headless commerce',
      'React developer',
      'UI UX designer',
      'Liquid developer',
      'ecommerce consultant',
      PROFILE.name,
    ],
    alternates: { canonical: SITE_URL },
    openGraph: {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESC,
      url: SITE_URL,
      siteName: PROFILE.name,
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: DEFAULT_TITLE,
      description: DEFAULT_DESC,
      creator: '@logangelzer',
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'technology',
  }
}

export default function IndexRoute({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <Suspense>{children}</Suspense>
    </div>
  )
}
