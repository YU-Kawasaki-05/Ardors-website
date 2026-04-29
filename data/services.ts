/**
 * @file Service content data (FR-02).
 *
 * Hardcoded for now; replace with CMS fetch when the CMS layer is ready.
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
  /** CTA label for this service card. */
  ctaLabel: string
  /** CTA destination (always /contact for direct inquiry). */
  ctaHref: string
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-app-development',
    name: 'Webアプリ / 業務システム開発',
    tagline: '業務に合わせた管理画面・Webアプリを設計から実装まで',
    description:
      '現場の業務や利用者の動きを理解したうえで、必要な機能を整理し、使われるWebアプリや管理画面を形にします。小さく始めるPoCから、継続改善を前提にした開発まで対応します。',
    deliverables: [
      '要件整理・画面設計・データ設計',
      'Next.js / React / TypeScript を中心にした実装',
      'API・データベース・外部サービス連携',
      'リリース後の改善相談・軽微な運用支援',
    ],
    ctaLabel: '開発について相談する',
    ctaHref: '/contact',
  },
  {
    id: 'business-improvement',
    name: '業務改善・効率化支援',
    tagline: 'AIや自動化を、現場で使える形に落とし込む',
    description:
      '生成AIや自動化ツールを単体で導入するのではなく、業務フローやデータ活用と合わせて整理します。PoC、社内向け資料、運用設計まで、現場に定着する形を重視します。',
    deliverables: [
      '業務ヒアリング・改善ポイントの整理',
      'AI活用・自動化のPoC設計と実装',
      '社内向け解説資料・運用資料の作成',
      '効果検証と次の改善案の整理',
    ],
    ctaLabel: '業務改善について相談する',
    ctaHref: '/contact',
  },
  {
    id: 'saas-mvp-support',
    name: 'SaaS / MVP 開発支援',
    tagline: 'アイデアを検証できるプロダクトにする',
    description:
      '最初から大きく作り込むのではなく、検証したい価値やユーザー体験を絞り、MVPとして動く形にします。自分自身のプロダクト開発経験も活かして、事業側の迷いにも寄り添います。',
    deliverables: [
      'プロダクト仮説・必要機能の整理',
      'MVPスコープの設計',
      '認証・管理画面・基本機能の実装',
      'リリース後の改善・運用相談',
    ],
    ctaLabel: 'MVP開発について相談する',
    ctaHref: '/contact',
  },
  {
    id: 'stripe-consultation',
    name: 'Stripe / 決済導入相談',
    tagline: '課金や販売導線を小さく検証するための相談',
    description:
      'Stripeを使った決済導線や月額課金の設計について相談できます。実装は要件に応じて慎重に進め、利用規約や運用フローなど、決済前後に必要な整理も含めて検討します。',
    deliverables: [
      '決済導線・料金体系の整理',
      'Stripe Checkout 等の導入相談',
      '返金・解約・運用フローの整理',
      '既存プロダクトへの段階的な導入検討',
    ],
    ctaLabel: '決済導入について相談する',
    ctaHref: '/contact',
  },
  {
    id: 'technical-partner',
    name: '技術相談・開発伴走',
    tagline: '壁打ちから実装まで、必要な距離感で支援',
    description:
      '技術選定、実装方針、開発プロセス、AI活用などを一緒に整理します。単発相談から、実装を伴う継続支援まで、状況に合わせた関わり方が可能です。',
    deliverables: [
      '技術選定・実装方針の壁打ち',
      'コード・設計レビュー',
      'GitHub Actions 等の開発フロー整備',
      '継続的な改善相談・実装支援',
    ],
    ctaLabel: '技術相談をする',
    ctaHref: '/contact',
  },
]
