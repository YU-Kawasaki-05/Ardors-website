/** @file Terms of use page — SCR-10 (FR-61) */
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
  const doc = getMessages(locale).legal.terms

  return buildPageMetadata({
    locale,
    pathname: '/terms',
    title: doc.title,
    description: getLegalSummary(doc.sections[0]?.body ?? ''),
  })
}

export default async function TermsPage() {
  const locale = await getRequestLocale()
  return <LegalLayout doc={getMessages(locale).legal.terms} locale={locale} />
}
