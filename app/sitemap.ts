/** @file Generates /sitemap.xml for all public pages (FR-33). */
import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/components/JsonLd'

const PUBLIC_PATHS = [
  '',
  '/services',
  '/works',
  '/profile',
  '/saas',
  '/contact',
  '/privacy',
  '/terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return PUBLIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : 0.8,
  }))
}
