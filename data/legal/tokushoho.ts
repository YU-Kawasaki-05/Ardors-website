/**
 * @file 特定商取引法に基づく表記 (FR-62, SCR-11).
 * Update with actual business information before launch.
 */

import type { LegalDoc } from './privacy'

export const TOKUSHOHO: LegalDoc = {
  title: '特定商取引法に基づく表記',
  updatedAt: '2026-04-15',
  sections: [
    {
      heading: '販売業者',
      body: 'Ardors（個人事業）',
    },
    {
      heading: '代表者',
      body: '河崎 祐（Kawasaki Yuu）',
    },
    {
      heading: '所在地',
      body: '請求があった場合には遅滞なく開示します。',
    },
    {
      heading: '電話番号',
      body: '請求があった場合には遅滞なく開示します。',
    },
    {
      heading: 'メールアドレス',
      body: 'お問い合わせフォームよりご連絡ください。',
    },
    {
      heading: '役務の対価（サービス料金）',
      body: '各サービスページに記載の目安価格を参照してください。正式なお見積もりは個別にご案内します（お見積もり・ご相談は無料）。',
    },
    {
      heading: '支払方法',
      body: '銀行振込（請求書払い）。詳細は契約時にご案内します。',
    },
    {
      heading: '支払時期',
      body: '契約締結後、請求書に記載の期日までにお支払いください。',
    },
    {
      heading: 'サービス提供時期',
      body: '契約後、別途協議のうえで定める納期・スケジュールに準じます。',
    },
    {
      heading: '返品・キャンセルについて',
      body: '役務の性質上、提供開始後のキャンセル・返金はお受けできません。詳細は契約書の定めによります。',
    },
  ],
  cta: { label: 'トップへ戻る', href: '/' },
}
