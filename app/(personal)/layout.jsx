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
      'Shopify Plus developer',
      'freelance Shopify developer',
      'Miami Shopify developer',
      'Shopify Hydrogen developer',
      'headless Shopify developer',
      'Shopify expert',
      'Shopify Plus expert',
      'Shopify Liquid developer',
      'Shopify Functions developer',
      'Shopify Checkout Extensibility',
      'DTC Shopify developer',
      'ecommerce developer Miami',
      'Shopify CRO expert',
      'Shopify A/B testing',
      'Next.js ecommerce developer',
      'React ecommerce developer',
      'hire Shopify developer',
      'freelance Shopify Plus',
      'UI UX designer Shopify',
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
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
      other: {
        'msvalidate.01': process.env.BING_SITE_VERIFICATION,
        'p:domain_verify': process.env.PINTEREST_VERIFICATION,
        'facebook-domain-verification': process.env.FACEBOOK_DOMAIN_VERIFICATION,
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
