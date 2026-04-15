/** @file Terms of use page — SCR-10 (FR-61) */
import { LegalLayout } from '@/components/ui'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/i18n/request'

export default async function TermsPage() {
  const locale = await getRequestLocale()
  return <LegalLayout doc={getMessages(locale).legal.terms} locale={locale} />
}
