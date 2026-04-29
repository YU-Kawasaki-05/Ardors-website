/** @file Product and product-plan content data (ARD-34). */

export type ProductStatus = {
  label: string
  intent: 'live' | 'beta' | 'wip' | 'planned'
}

export type ProductItem = {
  id: string
  name: string
  tagline: string
  description: string
  status: ProductStatus
  highlights: string[]
  techStack: string[]
  ctaLabel: string
  ctaHref: string
}

export type ProductPlan = {
  label: string
  description: string
  status: ProductStatus
  themes: string[]
}

export type ProductsData = {
  title: string
  description: string
  philosophy: string[]
  products: ProductItem[]
  plans: ProductPlan[]
}

export const PRODUCTS: ProductsData = {
  title: 'プロダクト',
  description:
    '受託開発だけでなく、自分自身でも課題を見つけ、プロダクトとして形にする取り組みを続けています。marubo を中心に、顧客理解から設計・開発・運用までを実践しています。',
  philosophy: [
    '顧客の課題を起点に、使われる仕組みとして実装する',
    'データの蓄積・活用を前提に、次の改善につながる形をつくる',
    '小さく検証しながら、継続して育てられるプロダクトを目指す',
  ],
  products: [
    {
      id: 'marubo',
      name: 'marubo',
      tagline: '学習塾向けAIチャット・生徒管理システム',
      description:
        '学習塾の生徒が安全かつ効果的にAIを利用して学習を進められるようにし、塾側が生徒の学習状況やAIの使用状況を把握・監視できるようにするシステムです。知り合いの現場での開発をきっかけに、ヒアリングから設計、開発、テストまで担当しています。',
      status: { label: '開発・販売準備中', intent: 'wip' },
      highlights: [
        'AIチャットによる学習支援',
        '生徒管理と利用状況の把握',
        '学習状況の分析・レポート生成',
        '教育現場で安全にAIを使うための管理設計',
      ],
      techStack: ['Next.js', 'TypeScript', 'Supabase', 'Resend', 'AI API', 'Stripe（予定）'],
      ctaLabel: '利用相談する',
      ctaHref: '/contact',
    },
  ],
  plans: [
    {
      label: '構想中のプロダクト',
      description:
        '業務改善、データ活用、顧客体験の改善につながる小さなプロダクトを継続的に検討しています。まだ名前や仕様を固定せず、現場の課題に合わせて検証していく段階です。',
      status: { label: '構想中', intent: 'planned' },
      themes: ['業務改善', 'データ活用', '顧客体験', 'AI活用'],
    },
  ],
}
