'use client'
/** @file コンタクトフォームページ — SCR-07 (FR-20, BR-30〜33) */

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { CATEGORIES, contactSchema, type ContactInput } from '@/lib/schemas/contact'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-1 text-xs text-red-600" role="alert">
      {message}
    </p>
  )
}

export default function ContactPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
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
        router.push('/contact/complete')
        return
      }

      if (res.status === 429) {
        setServerError('送信回数の上限に達しました。しばらく時間を置いてから再度お試しください。')
        return
      }

      setServerError('送信中にエラーが発生しました。時間を置いて再度お試しください。')
    } catch {
      setServerError('ネットワークエラーが発生しました。接続を確認してください。')
    }
  }

  return (
    <>
      {/* Page header */}
      <section className="border-b border-zinc-100 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            お問い合わせ
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            ご相談のみでも歓迎です。まずはお気軽にご連絡ください。
            <br />
            いただいたご連絡には、原則 <strong className="text-zinc-700">2営業日以内</strong>{' '}
            にお返事いたします。
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                お名前
                <span className="ml-1 text-red-500" aria-label="必須">
                  *
                </span>
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="山田 太郎"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                {...register('name')}
              />
              <FieldError message={errors.name?.message} />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                メールアドレス
                <span className="ml-1 text-red-500" aria-label="必須">
                  *
                </span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="taro@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                {...register('email')}
              />
              <FieldError message={errors.email?.message} />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-1.5 block text-sm font-semibold text-zinc-700"
              >
                相談種別
                <span className="ml-1 text-red-500" aria-label="必須">
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
                  選択してください
                </option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <FieldError message={errors.category?.message} />
            </div>

            {/* Body */}
            <div>
              <label htmlFor="body" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                メッセージ
                <span className="ml-1 text-red-500" aria-label="必須">
                  *
                </span>
              </label>
              <textarea
                id="body"
                rows={8}
                placeholder="ご相談内容をご記入ください（3000文字以内）"
                aria-invalid={!!errors.body}
                aria-describedby={errors.body ? 'body-error' : undefined}
                className="w-full resize-y rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm leading-relaxed text-zinc-900 placeholder-zinc-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                {...register('body')}
              />
              <FieldError message={errors.body?.message} />
            </div>

            {/* Server error */}
            {serverError && (
              <p
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {serverError}
              </p>
            )}

            {/* Privacy note */}
            <p className="text-xs leading-relaxed text-zinc-400">
              送信内容は
              <a href="/privacy" className="underline hover:text-zinc-600">
                プライバシーポリシー
              </a>
              に基づき適切に管理します。
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? '送信中…' : '送信する'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
