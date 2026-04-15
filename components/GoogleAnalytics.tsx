'use client'

/** @file GA4 script injector for production pages (FR-32). */
import Script from 'next/script'

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim()
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export default function GoogleAnalytics() {
  if (!IS_PRODUCTION || !GA4_ID) {
    return null
  }

  return (
    <>
      <Script
        id="ga4-script"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  )
}
