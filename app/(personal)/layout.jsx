import { Suspense } from 'react'

import { loadHomePageData } from '@/sanity/lib/loadData'

export async function generateMetadata() {
  const { seo, profile } = await loadHomePageData()
  const title = seo.title
  const description = seo.description
  return {
    metadataBase: new URL(seo.url || 'https://logangelzer.com'),
    title: { default: title, template: `%s | ${profile.name}` },
    description,
    applicationName: profile.name,
    authors: [{ name: profile.name, url: seo.url }],
    creator: profile.name,
    publisher: profile.name,
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
      profile.name,
    ],
    alternates: { canonical: seo.url },
    openGraph: {
      title,
      description,
      url: seo.url,
      siteName: profile.name,
      images: [{ url: seo.ogImage, width: 1200, height: 630 }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@logangelzer',
      images: [seo.ogImage],
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

export default function PersonalLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <Suspense>{children}</Suspense>
    </div>
  )
}
