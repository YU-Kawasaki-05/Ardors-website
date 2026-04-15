/**
 * @file Service content data (FR-02).
 *
 * Hardcoded for now; replace with CMS fetch when the CMS layer is ready (ARD-40〜).
 * Keep types in sync with any future API schema.
 */

export type ServiceItem = {
  /** Unique identifier (stable — used as React key and future CMS slug). */
  id: string
  /** Service display name. */
  name: string
  /** One-line summary shown in card header. */
  tagline: string
  /** Paragraph describing the service in detail. */
  description: string
  /** Key deliverables or scope items (bullet list). */
  deliverables: string[]
  /** Price range as human-readable text. */
  priceNote: string
  /** CTA label for this service card. */
  ctaLabel: string
  /** CTA destination (always /contact for direct inquiry). */
  ctaHref: string
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-development',
    name: 'Web 開発',
    tagline: 'Next.js / TypeScript でのサイト・アプリ構築',
    description:
      'マーケティングサイトから管理画面付き Web アプリまで、要件に合わせた構成で設計・実装します。パフォーマンス・アクセシビリティ・保守性を標準品質として担保します。',
    deliverables: [
      'フロントエンド設計・実装（Next.js / React）',
      'API 設計・バックエンド連携',
      'レスポンシブ対応・パフォーマンスチューニング',
      'Vercel / AWS へのデプロイ・CI/CD 整備',
    ],
    priceNote: '50 万円〜（規模・要件により変動）',
    ctaLabel: 'Web 開発について相談する',
    ctaHref: '/contact',
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX デザイン',
    tagline: 'Figma を起点にした設計・プロトタイプ・実装',
    description:
      'ユーザーの目的を起点に情報設計・ワイヤーフレーム・ビジュアルデザインを行います。デザインと実装を同一人物が担うため、意図が正確にプロダクトへ反映されます。',
    deliverables: [
      '情報アーキテクチャ・ワイヤーフレーム作成',
      'Figma でのビジュアルデザイン・コンポーネント設計',
      'インタラクティブプロトタイプ',
      'デザインシステム・スタイルガイド整備',
    ],
    priceNote: '20 万円〜（成果物の範囲による）',
    ctaLabel: 'デザインについて相談する',
    ctaHref: '/contact',
  },
  {
    id: 'tech-consulting',
    name: '技術コンサルティング',
    tagline: '技術選定・設計レビュー・開発プロセス改善',
    description:
      '技術的な意思決定に伴走します。アーキテクチャ設計・コードレビュー・CI/CD 整備・チームへの技術導入支援など、短期スポットから顧問契約まで対応します。',
    deliverables: [
      '技術選定・アーキテクチャ設計レビュー',
      'コードレビュー・品質基準策定',
      '開発プロセス・CI/CD 改善',
      '技術勉強会・ドキュメント整備支援',
    ],
    priceNote: 'スポット 3 万円〜 / 月額顧問 10 万円〜',
    ctaLabel: 'コンサルについて相談する',
    ctaHref: '/contact',
  },
  {
    id: 'saas-development',
    name: 'SaaS 開発支援',
    tagline: 'プロダクト企画から MVP 構築まで',
    description:
      'SaaS 立ち上げにおける設計・実装・インフラをトータルでサポートします。ゼロから MVP を作る場合から、既存プロダクトの機能拡張まで相談ください。',
    deliverables: [
      'プロダクト要件定義・設計支援',
      'MVP 開発（フロントエンド〜バックエンド）',
      'マルチテナント設計・認証基盤構築',
      'リリース後の運用・改善サポート',
    ],
    priceNote: '要相談（規模・期間により個別見積もり）',
    ctaLabel: 'SaaS 開発について相談する',
    ctaHref: '/contact',
  },
]
