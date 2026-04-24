/** @file Admin route layout with defense-in-depth session checks and logout action. */
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { type Locale, isLocale } from '@/config/i18n'
import {
  ADMIN_SESSION_COOKIE_NAME,
  buildAdminLoginHref,
  getAdminLogoutCookieOptions,
  readAdminSession,
} from '@/lib/auth'
import { getRequestLocale, getRequestPathWithSearch, getRequestPathname } from '@/lib/i18n/request'

const ADMIN_LAYOUT_COPY = {
  ja: {
    badge: 'Admin Console',
    authenticatedAs: 'ログイン中',
    logout: 'ログアウト',
  },
  en: {
    badge: 'Admin Console',
    authenticatedAs: 'Signed in as',
    logout: 'Log out',
  },
} as const satisfies Record<
  Locale,
  {
    badge: string
    authenticatedAs: string
    logout: string
  }
>

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getRequestLocale()
  const pathname = await getRequestPathname()

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const cookieStore = await cookies()
  const session = await readAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value)

  if (!session) {
    redirect(buildAdminLoginHref(locale, { nextPath: await getRequestPathWithSearch() }))
  }

  async function logoutAction(formData: FormData) {
    'use server'

    const submittedLocale = formData.get('locale')
    const nextLocale =
      typeof submittedLocale === 'string' && isLocale(submittedLocale) ? submittedLocale : locale

    const nextCookieStore = await cookies()
    nextCookieStore.set(ADMIN_SESSION_COOKIE_NAME, '', getAdminLogoutCookieOptions())

    redirect(buildAdminLoginHref(nextLocale))
  }

  const t = ADMIN_LAYOUT_COPY[locale]

  return (
    <div className="bg-zinc-50">
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
              {t.badge}
            </p>
            <p className="text-sm text-zinc-600">
              {t.authenticatedAs}:{' '}
              <span className="font-medium text-zinc-900">{session.email}</span>
            </p>
          </div>

          <form action={logoutAction}>
            <input type="hidden" name="locale" value={locale} />
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {t.logout}
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}
