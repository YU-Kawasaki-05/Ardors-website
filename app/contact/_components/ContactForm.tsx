'use client'

/** @file Client-side contact form UI and submit flow — SCR-07 (FR-20). */
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { localizeHref, type Locale } from '@/config/i18n'
import { getMessages } from '@/lib/i18n'
import {
  CATEGORIES,
  getContactSchema,
  type Category,
  type ContactInput,
} from '@/lib/schemas/contact'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-1 text-xs text-red-600" role="alert">
      {message}
    </p>
  )
}

export default function ContactForm({ locale }: { locale: Locale }) {
  const router = useRouter()
  const t = getMessages(locale).contact
  const schema = useMemo(() => getContactSchema(locale), [locale])
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: ContactInput) {
    setServerError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push(localizeHref(locale, '/contact/complete'))
        return
      }

      if (res.status === 429) {
        setServerError(t.errors.rateLimit)
        return
      }

      setServerError(t.errors.generic)
    } catch {
      setServerError(t.errors.network)
    }
  }

  const categoryLabels = t.categories as Record<Category, string>

  return (
    <>
      <section className="border-b border-zinc-100 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{t.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">{t.intro}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                {t.fields.name}
                <span className="ml-1 text-red-500" aria-label={t.required}>
                  *
                </span>
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder={t.placeholders.name}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                {...register('name')}
              />
              <FieldError message={errors.name?.message} />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                {t.fields.email}
                <span className="ml-1 text-red-500" aria-label={t.required}>
                  *
                </span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder={t.placeholders.email}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                {...register('email')}
              />
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-1.5 block text-sm font-semibold text-zinc-700"
              >
                {t.fields.category}
                <span className="ml-1 text-red-500" aria-label={t.required}>
                  *
                </span>
              </label>
              <select
                id="category"
                aria-invalid={!!errors.category}
                aria-describedby={errors.category ? 'category-error' : undefined}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                defaultValue=""
                {...register('category')}
              >
                <option value="" disabled>
                  {t.placeholders.category}
                </option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {categoryLabels[category]}
                  </option>
                ))}
              </select>
              <FieldError message={errors.category?.message} />
            </div>

            <div>
              <label htmlFor="body" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                {t.fields.body}
                <span className="ml-1 text-red-500" aria-label={t.required}>
                  *
                </span>
              </label>
              <textarea
                id="body"
                rows={8}
                placeholder={t.placeholders.body}
                aria-invalid={!!errors.body}
                aria-describedby={errors.body ? 'body-error' : undefined}
                className="w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm leading-relaxed text-zinc-900 placeholder-zinc-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                {...register('body')}
              />
              <FieldError message={errors.body?.message} />
            </div>

            {serverError && (
              <p
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {serverError}
              </p>
            )}

            <p className="text-xs leading-relaxed text-zinc-400">
              {t.privacyLead}{' '}
              <a href={localizeHref(locale, '/privacy')} className="underline hover:text-zinc-600">
                {t.privacyLink}
              </a>
              {t.privacyTail}
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? t.submitting : t.submit}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
