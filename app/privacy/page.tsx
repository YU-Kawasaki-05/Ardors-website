/** @file Privacy policy page — SCR-09 (FR-60) */
import type { Metadata } from 'next'

import { buildPageMetadata } from '@/components/JsonLd'
import { LegalLayout } from '@/components/ui'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/i18n/request'

function getLegalSummary(body: string | string[]): string {
  return Array.isArray(body) ? body.join(' ') : body
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const doc = getMessages(locale).legal.privacy

  return buildPageMetadata({
    locale,
    pathname: '/privacy',
    title: doc.title,
    description: getLegalSummary(doc.sections[0]?.body ?? ''),
  })
}

export default async function PrivacyPage() {
  const locale = await getRequestLocale()
  return <LegalLayout doc={getMessages(locale).legal.privacy} locale={locale} />
}
