/**
 * @file Single source of truth for all site navigation (BR-76).
 *
 * Requirements: FR-07 (global header), FR-08 (footer / language toggle)
 * Screen IDs:   SCR-01〜12 (public), SCR-A1〜A3 (admin)
 *
 * Usage
 * -----
 * - Header:   `getHeaderItems()`
 * - Footer:   `getFooterItems()` or `getFooterItemsByGroup(group)`
 * - All:      `NAV_ITEMS`
 *
 * Adding a page
 * -------------
 * 1. Add one entry to `NAV_ITEMS` below.
 * 2. Set `showInHeader` / `showInFooter` / `footerGroup` as needed.
 * 3. That's it — Header and Footer pick it up automatically (BR-76).
 */

import type { FooterGroup, NavItem } from '@/types/navigation'

export const NAV_ITEMS: NavItem[] = [
  // ─── Public pages ──────────────────────────────────────────────────────────

  {
    key: 'home',
    screenId: 'SCR-01',
    href: '/',
    label: { ja: 'トップ', en: 'Home' },
    showInHeader: false, // ロゴがホームリンクを兼ねる
    showInFooter: false,
  },
  {
    key: 'services',
    screenId: 'SCR-02',
    href: '/services',
    label: { ja: 'サービス', en: 'Services' },
    showInHeader: true,
    showInFooter: true,
    footerGroup: 'main',
  },
  {
    key: 'profile',
    screenId: 'SCR-03',
    href: '/profile',
    label: { ja: 'プロフィール', en: 'Profile' },
    showInHeader: true,
    showInFooter: true,
    footerGroup: 'main',
  },
  {
    key: 'works',
    screenId: 'SCR-04',
    href: '/works',
    label: { ja: '実績', en: 'Works' },
    showInHeader: true,
    showInFooter: true,
    footerGroup: 'main',
  },
  {
    key: 'works-detail',
    screenId: 'SCR-05',
    href: '/works/[slug]',
    isDynamic: true,
    label: { ja: '実績詳細', en: 'Work Detail' },
    showInHeader: false,
    showInFooter: false,
  },
  {
    key: 'saas',
    screenId: 'SCR-06',
    href: '/saas',
    label: { ja: 'SaaS構想', en: 'SaaS' },
    showInHeader: true,
    showInFooter: true,
    footerGroup: 'main',
  },
  {
    key: 'contact',
    screenId: 'SCR-07',
    href: '/contact',
    label: { ja: 'お問い合わせ', en: 'Contact' },
    showInHeader: true,
    showInFooter: true,
    footerGroup: 'main',
  },
  {
    key: 'contact-complete',
    screenId: 'SCR-08',
    href: '/contact/complete',
    label: { ja: '送信完了', en: 'Sent' },
    showInHeader: false,
    showInFooter: false,
  },
  {
    key: 'privacy',
    screenId: 'SCR-09',
    href: '/privacy',
    label: { ja: 'プライバシーポリシー', en: 'Privacy Policy' },
    showInHeader: false,
    showInFooter: true,
    footerGroup: 'legal',
  },
  {
    key: 'terms',
    screenId: 'SCR-10',
    href: '/terms',
    label: { ja: '利用規約', en: 'Terms of Use' },
    showInHeader: false,
    showInFooter: true,
    footerGroup: 'legal',
  },
  {
    key: 'tokushoho',
    screenId: 'SCR-11',
    href: '/legal/tokushoho',
    label: { ja: '特定商取引法に基づく表記', en: 'Legal Notice' },
    showInHeader: false,
    showInFooter: true,
    footerGroup: 'legal',
  },
  {
    key: 'not-found',
    screenId: 'SCR-12',
    href: '/404',
    label: { ja: '404', en: 'Not Found' },
    showInHeader: false,
    showInFooter: false,
  },

  // ─── Admin pages (SCR-A*) ──────────────────────────────────────────────────

  {
    key: 'admin-login',
    screenId: 'SCR-A1',
    href: '/admin/login',
    label: { ja: '管理者ログイン', en: 'Admin Login' },
    showInHeader: false,
    showInFooter: false,
    isAdmin: true,
  },
  {
    key: 'admin-cases',
    screenId: 'SCR-A2',
    href: '/admin/cases',
    label: { ja: 'CMS事例一覧', en: 'Admin Cases' },
    showInHeader: false,
    showInFooter: false,
    isAdmin: true,
  },
  {
    key: 'admin-cases-edit',
    screenId: 'SCR-A3',
    href: '/admin/cases/[id]',
    isDynamic: true,
    label: { ja: 'CMS事例編集', en: 'Edit Case' },
    showInHeader: false,
    showInFooter: false,
    isAdmin: true,
  },
]

// ─── Helper selectors ─────────────────────────────────────────────────────────

/**
 * Items rendered in the global header (FR-07).
 * Excludes admin pages and dynamic routes automatically.
 */
export function getHeaderItems(): NavItem[] {
  return NAV_ITEMS.filter((item) => item.showInHeader && !item.isAdmin && !item.isDynamic)
}

/**
 * All footer items (FR-08).
 * Excludes admin pages and dynamic routes automatically.
 */
export function getFooterItems(): NavItem[] {
  return NAV_ITEMS.filter((item) => item.showInFooter && !item.isAdmin && !item.isDynamic)
}

/**
 * Footer items for a specific section group (FR-08).
 * @example getFooterItemsByGroup("legal")
 */
export function getFooterItemsByGroup(group: FooterGroup): NavItem[] {
  return NAV_ITEMS.filter(
    (item) => item.showInFooter && item.footerGroup === group && !item.isAdmin && !item.isDynamic,
  )
}
