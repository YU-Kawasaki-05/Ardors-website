/** @file Root application layout. */
import type { Metadata } from 'next'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

import './globals.css'

export const metadata: Metadata = {
  title: 'Ardors — WIP',
  description: 'Ardors website project scaffold',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
