/**
 * @file SaaS product intro data (FR-06, AC-06-01).
 *
 * Hardcoded for now; update when product details are confirmed.
 */

export type SaasFeature = {
  title: string
  description: string
}

export type SaasTargetUser = {
  persona: string
  description: string
}

export type SaasStatus = {
  label: string
  /** badge color intent: "wip" | "beta" | "live" */
  intent: 'wip' | 'beta' | 'live'
  note: string
}

export type SaasData = {
  name: string
  tagline: string
  description: string
  status: SaasStatus
  features: SaasFeature[]
  targetUsers: SaasTargetUser[]
  /** Contact / early access CTA href */
  ctaHref: string
}

export const SAAS: SaasData = {
  name: 'Ardors Flow',
  tagline: 'タイムボクシングで案件を制御する、フリーランス向けプロジェクト管理ツール',
  description:
    '複数案件を抱えるフリーランスが「今日何をすべきか」を迷わず決められるようにする SaaS。タイムボクシング設計とコールドスタート設計を組み合わせ、段取りから振り返りまでを一気通貫でサポートします。',
  status: {
    label: '開発中',
    intent: 'wip',
    note: '現在プロトタイプを設計中です。早期アクセス登録を受け付けています。',
  },
  features: [
    {
      title: 'タイムボックス設計',
      description:
        '1 日を時間ブロックに分割し、案件ごとの集中時間を可視化。割り込みに負けない日次計画を実現します。',
    },
    {
      title: 'コールドスタート設計',
      description:
        '新案件開始時の段取りテンプレートを自動生成。「何から手をつければいいか」という最初の迷いをなくします。',
    },
    {
      title: '案件別進捗ダッシュボード',
      description:
        '複数案件の進捗・稼働時間・次のアクションを 1 画面で確認。クライアントへの報告も素早く作成できます。',
    },
    {
      title: '週次レビュー & 次週計画',
      description:
        '振り返りと翌週の計画をセットで行うワークフロー。継続的な改善サイクルをシステムで支援します。',
    },
  ],
  targetUsers: [
    {
      persona: 'フリーランスエンジニア / デザイナー',
      description: '3 件以上の案件を同時進行していて、優先順位の判断に時間を取られている方。',
    },
    {
      persona: '小規模制作チームのディレクター',
      description: 'メンバーへのタスク割り当てとスケジュール管理をシンプルにしたい方。',
    },
    {
      persona: '個人事業主',
      description: '案件管理ツールを使い始めたいが、大規模 PM ツールは重すぎると感じている方。',
    },
  ],
  ctaHref: '/contact',
}
