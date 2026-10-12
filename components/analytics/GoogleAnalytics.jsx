import Script from 'next/script'

import { siteConfig } from '@/lib/site-config'

/**
 * Google Analytics 4 component
 * Only renders when NEXT_PUBLIC_GA4_MEASUREMENT_ID is set
 */
export default function GoogleAnalytics() {
  const measurementId = siteConfig.ga4MeasurementId

  if (!measurementId) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  )
}
