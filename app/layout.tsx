/** @file Root application layout. */
import type { Metadata } from 'next'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { getRequestLocale } from '@/lib/i18n/request'

import './globals.css'

export const metadata: Metadata = {
  title: 'Ardors — WIP',
  description: 'Ardors website project scaffold',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getRequestLocale()

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
