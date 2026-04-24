/** @file Admin authentication helpers using PBKDF2 credentials and signed cookies. */
import { localizeHref, stripLocalePrefix, type Locale } from '@/config/i18n'

export const ADMIN_SESSION_COOKIE_NAME = 'ardors_admin_session'
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12
export const DEFAULT_ADMIN_RETURN_PATH = '/admin/cases'

const PASSWORD_HASH_PREFIX = 'pbkdf2'
const PASSWORD_HASH_ALGORITHM = 'sha256'
const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()
const EXTERNAL_PROTOCOL_RE = /^[a-zA-Z][a-zA-Z\d+\-.]*:/

type AdminPasswordHash = {
  iterations: number
  salt: Uint8Array
  hash: Uint8Array
}

type AdminSessionPayload = {
  email: string
  exp: number
}

export type AdminSession = {
  email: string
  expiresAt: number
}

export type AdminLoginError = 'invalid_credentials' | 'missing_fields' | 'not_configured'

function normalizeEmail(value: string | null | undefined): string {
  return value?.trim().toLowerCase() ?? ''
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = ''

  for (let index = 0; index < bytes.length; index += 0x8000) {
    const chunk = bytes.subarray(index, index + 0x8000)
    binary += String.fromCharCode(...chunk)
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function base64UrlToBytes(value: string): Uint8Array | null {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4))

  try {
    const binary = atob(`${normalized}${padding}`)
    const bytes = new Uint8Array(binary.length)

    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index)
    }

    return bytes
  } catch {
    return null
  }
}

function parsePasswordHash(value: string | undefined): AdminPasswordHash | null {
  if (!value) {
    return null
  }

  const [prefix, algorithm, iterationsRaw, saltRaw, hashRaw] = value.split('$')
  const iterations = Number(iterationsRaw)
  const salt = base64UrlToBytes(saltRaw)
  const hash = base64UrlToBytes(hashRaw)

  if (
    prefix !== PASSWORD_HASH_PREFIX ||
    algorithm !== PASSWORD_HASH_ALGORITHM ||
    !Number.isInteger(iterations) ||
    iterations <= 0 ||
    !salt ||
    !hash
  ) {
    return null
  }

  return { iterations, salt, hash }
}

function getSessionSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim()
  return secret ? secret : null
}

async function derivePasswordHash(
  password: string,
  salt: Uint8Array,
  iterations: number,
): Promise<Uint8Array> {
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )

  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: Uint8Array.from(salt),
      iterations,
    },
    passwordKey,
    256,
  )

  return new Uint8Array(bits)
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array): boolean {
  const length = Math.max(left.length, right.length)
  let mismatch = left.length ^ right.length

  for (let index = 0; index < length; index += 1) {
    mismatch |= (left[index] ?? 0) ^ (right[index] ?? 0)
  }

  return mismatch === 0
}

async function signValue(value: string): Promise<string | null> {
  const secret = getSessionSecret()

  if (!secret) {
    return null
  }

  const signingKey = await crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign('HMAC', signingKey, textEncoder.encode(value))
  return bytesToBase64Url(new Uint8Array(signature))
}

function decodeSessionPayload(value: string): AdminSessionPayload | null {
  const bytes = base64UrlToBytes(value)

  if (!bytes) {
    return null
  }

  try {
    const parsed = JSON.parse(textDecoder.decode(bytes)) as Partial<AdminSessionPayload>

    if (
      typeof parsed.email !== 'string' ||
      !parsed.email ||
      typeof parsed.exp !== 'number' ||
      !Number.isFinite(parsed.exp)
    ) {
      return null
    }

    return {
      email: parsed.email,
      exp: parsed.exp,
    }
  } catch {
    return null
  }
}

function isAdminPath(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/')
}

export function getAdminSessionCookieOptions() {
  return {
    path: '/',
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  }
}

export function getAdminLogoutCookieOptions() {
  return {
    ...getAdminSessionCookieOptions(),
    maxAge: 0,
  }
}

export function getDefaultAdminReturnPath(locale: Locale): string {
  return localizeHref(locale, DEFAULT_ADMIN_RETURN_PATH)
}

export function normalizeAdminReturnPath(value: string | null | undefined): string {
  if (!value || EXTERNAL_PROTOCOL_RE.test(value) || value.startsWith('//')) {
    return DEFAULT_ADMIN_RETURN_PATH
  }

  const [pathAndQuery, hashFragment] = value.split('#', 2)
  const [pathname, query] = pathAndQuery.split('?', 2)
  const normalizedPathname = stripLocalePrefix(pathname || '/')

  if (!isAdminPath(normalizedPathname) || normalizedPathname === '/admin/login') {
    return DEFAULT_ADMIN_RETURN_PATH
  }

  const search = query ? `?${query}` : ''
  const hash = hashFragment ? `#${hashFragment}` : ''
  return `${normalizedPathname}${search}${hash}`
}

export function buildAdminLoginHref(
  locale: Locale,
  options?: {
    error?: AdminLoginError
    nextPath?: string | null
  },
): string {
  const searchParams = new URLSearchParams()

  if (options?.error) {
    searchParams.set('error', options.error)
  }

  const nextPath = normalizeAdminReturnPath(options?.nextPath)

  if (nextPath !== DEFAULT_ADMIN_RETURN_PATH) {
    searchParams.set('next', nextPath)
  }

  const search = searchParams.toString()
  const pathname = localizeHref(locale, '/admin/login')
  return search ? `${pathname}?${search}` : pathname
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(
    normalizeEmail(process.env.ADMIN_EMAIL) &&
    parsePasswordHash(process.env.ADMIN_PASSWORD_HASH) &&
    getSessionSecret(),
  )
}

export async function authenticateAdminCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const configuredEmail = normalizeEmail(process.env.ADMIN_EMAIL)
  const passwordHash = parsePasswordHash(process.env.ADMIN_PASSWORD_HASH)

  if (!configuredEmail || !passwordHash || !password) {
    return false
  }

  const normalizedEmail = normalizeEmail(email)
  const derivedHash = await derivePasswordHash(password, passwordHash.salt, passwordHash.iterations)
  return configuredEmail === normalizedEmail && constantTimeEqual(derivedHash, passwordHash.hash)
}

export async function createAdminSessionToken(email: string): Promise<string | null> {
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail || !getSessionSecret()) {
    return null
  }

  const payload = bytesToBase64Url(
    textEncoder.encode(
      JSON.stringify({
        email: normalizedEmail,
        exp: Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000,
      } satisfies AdminSessionPayload),
    ),
  )

  const signature = await signValue(payload)

  if (!signature) {
    return null
  }

  return `${payload}.${signature}`
}

export async function readAdminSession(
  token: string | null | undefined,
): Promise<AdminSession | null> {
  if (!token || !isAdminAuthConfigured()) {
    return null
  }

  const [payload, signature] = token.split('.')

  if (!payload || !signature) {
    return null
  }

  const expectedSignature = await signValue(payload)
  const providedSignature = base64UrlToBytes(signature)
  const expectedSignatureBytes = expectedSignature ? base64UrlToBytes(expectedSignature) : null

  if (!providedSignature || !expectedSignatureBytes) {
    return null
  }

  if (!constantTimeEqual(providedSignature, expectedSignatureBytes)) {
    return null
  }

  const session = decodeSessionPayload(payload)
  const configuredEmail = normalizeEmail(process.env.ADMIN_EMAIL)

  if (!session || session.exp <= Date.now() || normalizeEmail(session.email) !== configuredEmail) {
    return null
  }

  return {
    email: session.email,
    expiresAt: session.exp,
  }
}
