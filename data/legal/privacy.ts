/**
 * @file Privacy policy content (FR-60, SCR-09).
 * Update with actual legal text before launch.
 */

export type LegalSection = {
  heading: string
  /** Paragraph string, or string[] for a bullet list. */
  body: string | string[]
}

export type LegalDoc = {
  title: string
  /** ISO 8601 date string — display as "最終更新日: YYYY年MM月DD日". */
  updatedAt: string
  sections: LegalSection[]
  /** Bottom CTA */
  cta: { label: string; href: string }
}

export const PRIVACY: LegalDoc = {
  title: 'プライバシーポリシー',
  updatedAt: '2026-04-15',
  sections: [
    {
      heading: 'はじめに',
      body: 'Ardors（以下「当サービス」）は、お客様の個人情報の保護を重要な責務と考え、以下のポリシーに従って適切に取り扱います。',
    },
    {
      heading: '取得する情報',
      body: [
        'お問い合わせフォームより取得：氏名、メールアドレス、ご相談内容',
        'アクセス解析：Google Analytics 4 によるアクセス情報（匿名化・統計処理済み）',
        'その他ご連絡の過程でご提供いただいた情報',
      ],
    },
    {
      heading: '利用目的',
      body: [
        'お問い合わせへの返信・対応',
        'サービス改善および品質向上のための統計分析',
        '法令に基づく対応',
      ],
    },
    {
      heading: '第三者提供',
      body: '法令に基づく場合および本人の同意がある場合を除き、取得した個人情報を第三者に提供することはありません。ただし、業務委託先（例：メール送信サービス）への提供は、適切な管理のもとで行うことがあります。',
    },
    {
      heading: 'Cookie・アクセス解析',
      body: '当サービスでは Google Analytics 4 を使用してアクセス状況を分析しています。Cookie により匿名の利用データが収集される場合がありますが、個人を特定するものではありません。ブラウザの設定により Cookie を無効にすることができます。',
    },
    {
      heading: '個人情報の管理',
      body: '取得した個人情報は、適切なセキュリティ対策を講じて管理します。保存期間は業務上必要な期間とし、不要となった情報は適切に廃棄します。',
    },
    {
      heading: 'お問い合わせ',
      body: '個人情報の取り扱いに関するご質問・開示請求は、お問い合わせフォームよりご連絡ください。',
    },
  ],
  cta: { label: 'お問い合わせへ', href: '/contact' },
}
