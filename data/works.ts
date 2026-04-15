/**
 * @file Work case study data (FR-04, BR-11).
 *
 * Dummy content for development; replace with CMS fetch when the CMS is ready (ARD-40〜).
 * Items with `published: false` are excluded from the public list automatically.
 */

import type { Work } from '@/types/works'

export const WORKS: Work[] = [
  {
    slug: 'corporate-site-renewal',
    title: 'コーポレートサイト リニューアル',
    category: 'Web 開発',
    summary: '老朽化したコーポレートサイトを Next.js で再構築。パフォーマンスと CV 率を大幅改善。',
    outcomes: ['CV率向上', '表示速度改善'],
    publishedAt: '2024-09',
    published: true,
  },
  {
    slug: 'ec-ux-improvement',
    title: 'EC サイト UX 改善',
    category: 'UI/UX デザイン',
    summary: 'チェックアウトフローの整理と UI 刷新により、購買率・直帰率をそれぞれ改善。',
    outcomes: ['購買率向上', '直帰率改善'],
    publishedAt: '2024-06',
    published: true,
  },
  {
    slug: 'internal-ops-system',
    title: '社内業務管理システム 新規開発',
    category: 'Web 開発',
    summary:
      'スプレッドシート管理からの脱却を目的に、フロントエンドから DB 設計まで一気通貫で担当。',
    outcomes: ['工数削減', 'ヒューマンエラー削減'],
    publishedAt: '2024-03',
    published: true,
  },
  {
    slug: 'saas-mvp',
    title: 'SaaS MVP 開発支援',
    category: 'SaaS 開発',
    summary: 'スタートアップの SaaS MVP を設計・実装。3 ヶ月でリリースまで伴走支援。',
    outcomes: ['MVPリリース', 'ユーザー獲得'],
    publishedAt: '2023-12',
    published: true,
  },
  {
    // BR-11: published: false → list に表示されない
    slug: 'tech-consulting-nda',
    title: '技術コンサルティング（NDA）',
    category: '技術コンサル',
    summary: 'NDA 締結案件のため非公開。',
    outcomes: ['開発プロセス改善'],
    publishedAt: '2023-09',
    published: false,
  },
]
