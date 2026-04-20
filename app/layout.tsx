/** @file Root application layout. */
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

import GoogleAnalytics from '@/components/GoogleAnalytics'
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/components/JsonLd'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { getRequestLocale } from '@/lib/i18n/request'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ardors',
    template: '%s | Ardors',
  },
  description: 'フリーランス Web 開発者・デザイナーの Ardors ポートフォリオ',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: SITE_URL,
    siteName: 'Ardors',
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: 'Ardors' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [DEFAULT_OG_IMAGE],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getRequestLocale()

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
