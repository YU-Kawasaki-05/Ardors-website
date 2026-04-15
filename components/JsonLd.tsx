/** @file JSON-LD script injector and locale-aware SEO metadata helpers (FR-71). */
import type { Metadata } from 'next'

import { localizeHref, type Locale } from '@/config/i18n'

export const SITE_NAME = 'Ardors'
export const SITE_URL = 'https://ardors.jp'
export const DEFAULT_OG_IMAGE = '/og-default.png'

type JsonLdData = Record<string, unknown> | Array<Record<string, unknown>>

type PageMetadataInput = {
  locale: Locale
  pathname: string
  title: string
  description: string
  openGraphType?: 'website' | 'article'
  image?: string
}

function getOpenGraphLocale(locale: Locale): string {
  return locale === 'ja' ? 'ja_JP' : 'en_US'
}

export function toJsonLdLanguage(locale: Locale): string {
  return locale === 'ja' ? 'ja-JP' : 'en-US'
}

export function toAbsoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString()
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  openGraphType = 'website',
  image = DEFAULT_OG_IMAGE,
}: PageMetadataInput): Metadata {
  const canonicalPath = localizeHref(locale, pathname)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        ja: localizeHref('ja', pathname),
        en: localizeHref('en', pathname),
      },
    },
    openGraph: {
      type: openGraphType,
      locale: getOpenGraphLocale(locale),
      url: canonicalPath,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

function serializeJsonLd(data: JsonLdData): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export default function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  )
}
