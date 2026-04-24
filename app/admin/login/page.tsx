/** @file Admin login page backed by PBKDF2 credentials and a signed session cookie. */
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { buildPageMetadata } from '@/components/JsonLd'
import { localizeHref, type Locale, isLocale } from '@/config/i18n'
import {
  ADMIN_SESSION_COOKIE_NAME,
  type AdminLoginError,
  authenticateAdminCredentials,
  buildAdminLoginHref,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  getDefaultAdminReturnPath,
  isAdminAuthConfigured,
  normalizeAdminReturnPath,
  readAdminSession,
} from '@/lib/auth'
import { getRequestLocale } from '@/lib/i18n/request'

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string
    next?: string
  }>
}

const LOGIN_COPY = {
  ja: {
    title: '管理者ログイン',
    description: 'Ardors の管理画面へアクセスするための認証ページです。',
    eyebrow: 'Admin Access',
    heading: '管理画面にログイン',
    body: 'サイト運営者のみが /admin 配下にアクセスできます。メールアドレスとパスワードを入力してください。',
    emailLabel: 'メールアドレス',
    passwordLabel: 'パスワード',
    submit: 'ログイン',
    configured: '環境変数の設定を確認済みです。認証情報を入力して続行してください。',
    notConfigured:
      '管理者認証の環境変数が未設定です。.env.local に ADMIN_EMAIL / ADMIN_PASSWORD_HASH / ADMIN_SESSION_SECRET を設定してください。',
    redirectHint: 'ログイン後は要求された管理画面に戻ります。',
    errors: {
      invalid_credentials: 'メールアドレスまたはパスワードが正しくありません。',
      missing_fields: 'メールアドレスとパスワードを入力してください。',
      not_configured: '管理者認証がまだ設定されていません。',
    },
  },
  en: {
    title: 'Admin Login',
    description: 'Authentication page for accessing the Ardors admin area.',
    eyebrow: 'Admin Access',
    heading: 'Sign in to the admin area',
    body: 'Only the site owner can access routes under /admin. Enter the configured email and password.',
    emailLabel: 'Email address',
    passwordLabel: 'Password',
    submit: 'Sign in',
    configured: 'Environment variables are configured. Enter your credentials to continue.',
    notConfigured:
      'Admin auth env vars are missing. Set ADMIN_EMAIL / ADMIN_PASSWORD_HASH / ADMIN_SESSION_SECRET in .env.local.',
    redirectHint: 'After signing in, you will return to the requested admin page.',
    errors: {
      invalid_credentials: 'The email or password is incorrect.',
      missing_fields: 'Enter both your email and password.',
      not_configured: 'Admin authentication is not configured yet.',
    },
  },
} as const satisfies Record<
  Locale,
  {
    title: string
    description: string
    eyebrow: string
    heading: string
    body: string
    emailLabel: string
    passwordLabel: string
    submit: string
    configured: string
    notConfigured: string
    redirectHint: string
    errors: Record<AdminLoginError, string>
  }
>

function getLoginErrorMessage(locale: Locale, error?: string): string | null {
  if (error !== 'invalid_credentials' && error !== 'missing_fields' && error !== 'not_configured') {
    return null
  }

  return LOGIN_COPY[locale].errors[error]
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = LOGIN_COPY[locale]

  return {
    ...buildPageMetadata({
      locale,
      pathname: '/admin/login',
      title: t.title,
      description: t.description,
    }),
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const locale = await getRequestLocale()
  const t = LOGIN_COPY[locale]
  const { error, next } = await searchParams
  const normalizedNext = normalizeAdminReturnPath(next)
  const loginError = getLoginErrorMessage(locale, error)
  const isConfigured = isAdminAuthConfigured()

  const cookieStore = await cookies()
  const session = await readAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value)

  if (session) {
    redirect(getDefaultAdminReturnPath(locale))
  }

  async function loginAction(formData: FormData) {
    'use server'

    const submittedLocale = formData.get('locale')
    const nextLocale =
      typeof submittedLocale === 'string' && isLocale(submittedLocale) ? submittedLocale : locale
    const email = formData.get('email')
    const password = formData.get('password')
    const nextPath = normalizeAdminReturnPath(
      typeof formData.get('next') === 'string' ? (formData.get('next') as string) : normalizedNext,
    )

    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
      redirect(buildAdminLoginHref(nextLocale, { error: 'missing_fields', nextPath }))
    }

    if (!isAdminAuthConfigured()) {
      redirect(buildAdminLoginHref(nextLocale, { error: 'not_configured', nextPath }))
    }

    const isAuthenticated = await authenticateAdminCredentials(email, password)

    if (!isAuthenticated) {
      redirect(buildAdminLoginHref(nextLocale, { error: 'invalid_credentials', nextPath }))
    }

    const token = await createAdminSessionToken(email)

    if (!token) {
      redirect(buildAdminLoginHref(nextLocale, { error: 'not_configured', nextPath }))
    }

    const nextCookieStore = await cookies()
    nextCookieStore.set(ADMIN_SESSION_COOKIE_NAME, token, getAdminSessionCookieOptions())

    redirect(localizeHref(nextLocale, nextPath))
  }

  return (
    <section className="bg-zinc-50 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:px-8">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
            {t.eyebrow}
          </p>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              {t.heading}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-600">{t.body}</p>
          </div>
          <div
            className={`rounded-2xl border px-4 py-3 text-sm ${
              isConfigured
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-amber-200 bg-amber-50 text-amber-800'
            }`}
          >
            {isConfigured ? t.configured : t.notConfigured}
          </div>
          {normalizedNext !== '/admin/cases' && (
            <p className="text-sm text-zinc-600">{t.redirectHint}</p>
          )}
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <form action={loginAction} className="space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="next" value={normalizedNext} />

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                {t.emailLabel}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-zinc-700"
              >
                {t.passwordLabel}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                required
              />
            </div>

            {loginError && (
              <p
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {t.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
