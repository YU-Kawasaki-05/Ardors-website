/**
 * @file Work case study data (FR-04, FR-05, BR-11).
 *
 * All entries are typed as WorkDetail (superset of Work) so both list and
 * detail pages can share this single source.
 * Items with `published: false` are excluded from the public list (BR-11).
 *
 * Replace with CMS fetch when the CMS is ready (ARD-40〜).
 */

import type { WorkDetail } from '@/types/works'

export const WORKS: WorkDetail[] = [
  {
    slug: 'corporate-site-renewal',
    title: 'コーポレートサイト リニューアル',
    category: 'Web 開発',
    summary: '老朽化したコーポレートサイトを Next.js で再構築。パフォーマンスと CV 率を大幅改善。',
    outcomes: ['CV率向上', '表示速度改善'],
    publishedAt: '2024-09',
    published: true,
    problem:
      '4〜5年前に構築した WordPress サイトが老朽化し、ページ速度の低下が著しかった。モバイル体験の悪さも重なり、CV 率が年々落ち込んでいた。',
    solution:
      'Next.js + Tailwind CSS で完全リニューアル。SSG を主軸に構成し、画像最適化（next/image）とコード分割を徹底。CMS は Headless 構成に切り替え、コンテンツ更新フローも整備した。',
    result:
      'LCP が 5.2s → 1.4s に改善（WCAG Core Web Vitals 合格）。リリース後 2 ヶ月で CV 率 1.2% → 2.1% に向上。',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Headless CMS'],
    nextWorks: ['ec-ux-improvement', 'internal-ops-system'],
  },
  {
    slug: 'ec-ux-improvement',
    title: 'EC サイト UX 改善',
    category: 'UI/UX デザイン',
    summary: 'チェックアウトフローの整理と UI 刷新により、購買率・直帰率をそれぞれ改善。',
    outcomes: ['購買率向上', '直帰率改善'],
    publishedAt: '2024-06',
    published: true,
    problem:
      'カート追加率・購買完了率が競合比で低く、特にモバイルでの直帰率が高かった。ユーザーインタビューとヒートマップ分析から、チェックアウトフローの複雑さが主因と判明。',
    solution:
      'ユーザー行動分析を基に、チェックアウトフローを 5 ステップ → 3 ステップに簡素化。Figma でモバイルファーストの UI を再設計し、エンジニアと協働して実装した。',
    result: '購買完了率 2.3% → 3.8%（+65%）、モバイル直帰率 68% → 45% に改善。',
    techStack: ['Figma', 'React', 'Tailwind CSS'],
    nextWorks: ['corporate-site-renewal', 'saas-mvp'],
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
    problem:
      '30 名規模の制作会社でスプレッドシート + 口頭連絡による案件管理が行われており、進捗の可視化ができず、ヒューマンエラーによる差し戻しが頻発していた。',
    solution:
      '案件・メンバー・進捗を一元管理する Web アプリを新規開発。Next.js + PostgreSQL + Prisma で構成し、Slack 通知・カレンダー連携を実装。権限管理も考慮した設計とした。',
    result:
      '週次進捗確認の工数が平均 3 時間/週から 1 時間/週に削減。ヒューマンエラー起因の差し戻し案件が 90% 以上減少した。',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Vercel'],
    nextWorks: ['saas-mvp', 'corporate-site-renewal'],
  },
  {
    slug: 'saas-mvp',
    title: 'SaaS MVP 開発支援',
    category: 'SaaS 開発',
    summary: 'スタートアップの SaaS MVP を設計・実装。3 ヶ月でリリースまで伴走支援。',
    outcomes: ['MVPリリース', 'ユーザー獲得'],
    publishedAt: '2023-12',
    published: true,
    problem:
      '市場検証のための MVP を 3 ヶ月以内にリリースしたかったが、内製エンジニアが不在。仮説検証に必要な最小機能セットの特定から着手する必要があった。',
    solution:
      'コアユーザーフロー 5 つに絞って MVP のスコープを定義。週次デモとフィードバックループを設計しながら、設計・実装・インフラ構築を担当した。',
    result: '3 ヶ月でリリース達成。初月でアクティブユーザー 100 名を獲得し、継続率 60% を記録。',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'AWS'],
    nextWorks: ['internal-ops-system', 'ec-ux-improvement'],
  },
  {
    // BR-11: published: false → list / detail ともに非公開
    slug: 'tech-consulting-nda',
    title: '技術コンサルティング（NDA）',
    category: '技術コンサル',
    summary: 'NDA 締結案件のため非公開。',
    outcomes: ['開発プロセス改善'],
    publishedAt: '2023-09',
    published: false,
    problem: 'NDA',
    solution: 'NDA',
    result: 'NDA',
    techStack: [],
    nextWorks: [],
  },
]
