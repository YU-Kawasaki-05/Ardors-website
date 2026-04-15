/** @file Privacy policy page — SCR-09 (FR-60) */
import { LegalLayout } from '@/components/ui'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/i18n/request'

export default async function PrivacyPage() {
  const locale = await getRequestLocale()
  return <LegalLayout doc={getMessages(locale).legal.privacy} locale={locale} />
}
