/**
 * @file POST /api/contact — コンタクトフォーム API (ARD-16)
 *
 * - サーバーサイド Zod バリデーション (BR-30, BR-32)
 * - IP ベースのインメモリレート制限: 5件/分 (BR-33)
 * - XSS/SQLi パターン拒否 (BR-34)
 * - スタックトレース非公開 (BR-40)
 * - メール送信: RESEND_API_KEY があれば Resend、なければ console.log スタブ
 */
import { NextRequest, NextResponse } from 'next/server'

import { contactSchema } from '@/lib/schemas/contact'
import { containsDangerousPattern } from '@/lib/sanitize'

// ---------------------------------------------------------------------------
// Rate limiter — in-memory (Node.js runtime)
// ---------------------------------------------------------------------------
type RateBucket = { count: number; resetAt: number }
const rateBuckets = new Map<string, RateBucket>()
const RATE_LIMIT = 5
const WINDOW_MS = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const bucket = rateBuckets.get(ip)

  if (!bucket || now >= bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  bucket.count += 1
  if (bucket.count > RATE_LIMIT) return true
  return false
}

// ---------------------------------------------------------------------------
// Email dispatch
// ---------------------------------------------------------------------------
async function dispatchEmail(data: {
  name: string
  email: string
  category: string
  body: string
}): Promise<void> {
  const to = process.env.CONTACT_EMAIL_TO
  const resendKey = process.env.RESEND_API_KEY

  const subject = `[Ardors] お問い合わせ: ${data.category} — ${data.name}`
  const text = [
    `名前: ${data.name}`,
    `メール: ${data.email}`,
    `種別: ${data.category}`,
    '',
    data.body,
  ].join('\n')

  if (resendKey) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@ardors.jp',
        to: to ?? 'yuu.kawasaki@fouryou.co.jp',
        subject,
        text,
      }),
    })
    return
  }

  // Stub — no email service configured
  console.log('[contact] stub — would send email:', { to, subject, text })
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const INVALID_INPUT_RESPONSE = NextResponse.json({ message: 'Invalid input' }, { status: 400 })

  // Resolve client IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  // Rate limit check (BR-33)
  if (isRateLimited(ip)) {
    return NextResponse.json({ message: 'Too Many Requests' }, { status: 429 })
  }

  // Content-Type check (BR-34)
  const contentType = req.headers.get('content-type')?.toLowerCase()
  if (!contentType?.startsWith('application/json')) {
    return INVALID_INPUT_RESPONSE
  }

  // Parse body
  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return INVALID_INPUT_RESPONSE
  }

  // Zod validation (BR-30, BR-32)
  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  const { name, email, category, body } = parsed.data

  // Malicious content check (BR-34)
  if ([name, email, category, body].some(containsDangerousPattern)) {
    return INVALID_INPUT_RESPONSE
  }

  // Send / dispatch (BR-40: never expose internals in response)
  try {
    await dispatchEmail({ name, email, category, body })
  } catch (err) {
    console.error('[contact] dispatch error:', err)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
