/** @file Redirects the legacy SaaS route to the Products page (ARD-34). */
import { redirect } from 'next/navigation'

import { localizeHref } from '@/config/i18n'
import { getRequestLocale } from '@/lib/i18n/request'

export default async function SaasRedirectPage() {
  const locale = await getRequestLocale()

  redirect(localizeHref(locale, '/products'))
}
