/** @file Contact page metadata wrapper — SCR-07 (FR-20, FR-71). */
import type { Metadata } from 'next'

import { buildPageMetadata } from '@/components/JsonLd'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/i18n/request'

import ContactForm from './_components/ContactForm'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = getMessages(locale).contact

  return buildPageMetadata({
    locale,
    pathname: '/contact',
    title: t.title,
    description: t.intro,
  })
}

export default async function ContactPage() {
  const locale = await getRequestLocale()

  return <ContactForm locale={locale} />
}
