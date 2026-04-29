/** @file Japanese messages and page content sources (BR-21). */
import { PRIVACY } from '@/data/legal/privacy'
import { TERMS } from '@/data/legal/terms'
import { TOKUSHOHO } from '@/data/legal/tokushoho'
import { PRODUCTS } from '@/data/products'
import { PROFILE } from '@/data/profile'
import { SERVICES } from '@/data/services'
import type { Category } from '@/lib/schemas/contact'

const contactCategoryLabels: Record<Category, string> = {
  相談: '相談',
  協業: '協業',
  その他: 'その他',
}

export const jaMessages = {
  common: {
    brand: 'ARDORS',
    menu: 'メニュー',
    language: {
      label: 'Language',
      ja: 'JA',
      en: 'EN',
      switchAria: '言語切替',
    },
    github: 'GitHub',
  },
  header: {
    navAria: 'グローバルナビゲーション',
    menuButtonAria: 'ナビゲーションメニューを開閉',
  },
  footer: {
    navigationHeading: 'ナビゲーション',
    legalHeading: '法務',
    linksHeading: 'リンク',
    copyright: (year: number) => `© ${year} Ardors. All rights reserved.`,
  },
  legalLayout: {
    updatedAt: '最終更新日',
    dateLocale: 'ja-JP',
  },
  trustBlock: {
    ariaLabel: '信頼ブロック',
    domains: '対応領域',
    techStack: '主要技術',
    outcomes: '活動軸',
    github: 'GitHub',
  },
  home: {
    hero: {
      target: '受託開発 / 業務改善 / プロダクトづくり',
      title: '事業の次の一手を、\n動く仕組みにする。',
      description:
        '顧客の課題を理解し、Web開発・AI活用・業務改善を組み合わせて、事業に役立つプロダクトやシステムを形にします。技術だけでなく、使われ方と価値につながる設計を大切にしています。',
      primaryCTA: '実績を見る',
      primaryHref: '/works',
      secondaryCTA: '相談する',
      secondaryHref: '/contact',
    },
    entryBranches: [
      {
        label: '実績を見たい',
        description: 'marubo、Ardors website、AI/ITコンサル、テスト自動化の実績を紹介しています。',
        href: '/works',
      },
      {
        label: '相談したい',
        description: '受託開発、業務改善、決済導入、開発伴走など、まずは状況を聞かせてください。',
        href: '/contact',
      },
      {
        label: 'プロダクトを知りたい',
        description:
          '学習塾向けAIチャット・生徒管理システム marubo などの取り組みを掲載しています。',
        href: '/products',
      },
    ],
    trust: {
      domains: ['Webアプリ開発', '業務改善・AI活用', 'SaaS / MVP 開発'],
      techStack: ['TypeScript', 'React', 'Node.js', 'AWS', 'Stripe'],
      outcomes: '顧客理解・データ活用・継続改善を重視',
      githubHref: 'https://github.com/YU-Kawasaki-05/Ardors-website',
    },
    nextPagesHeading: '関連ページ',
    nextPages: [
      {
        label: 'サービス紹介',
        description: '受託開発・業務改善・開発伴走などの提供内容をご覧ください。',
        href: '/services',
      },
      {
        label: 'プロダクト',
        description: 'marubo と構想中プロダクトの方針を紹介しています。',
        href: '/products',
      },
    ],
    cta: {
      heading: 'まずは状況を聞かせてください',
      description:
        '価格や進め方は案件内容に合わせて柔軟に整理します。初回は相談ベースで問題ありません。',
      primaryCTA: '相談する',
      secondaryCTA: '実績を見る',
    },
  },
  services: {
    eyebrow: 'Services',
    title: '提供サービス',
    description:
      '受託開発、業務改善、SaaS / MVP 開発、決済導入相談、技術相談まで、事業や現場の課題に合わせて柔軟に支援します。価格は固定で見せず、内容を聞いたうえで無理のない進め方を提案します。',
    nextPagesHeading: '関連ページ',
    nextPages: [
      { label: '実績一覧', description: '過去の案件と取り組みをご覧ください。', href: '/works' },
      {
        label: 'プロフィール',
        description: '担当者の経歴・考え方・スキルを紹介しています。',
        href: '/profile',
      },
    ],
    cta: {
      heading: 'どの形が合うか迷ったら',
      description: '単発相談から継続支援まで、ご状況に合わせて現実的な進め方を一緒に整理します。',
      primaryCTA: '相談する',
      secondaryCTA: '実績を見る',
    },
    items: SERVICES,
  },
  profile: {
    eyebrow: 'Profile',
    skillsHeading: 'スキルセット',
    careerHeading: '経歴',
    linksHeading: '外部リンク',
    cta: {
      heading: '価値につながる開発を一緒に進めませんか',
      description:
        '受託開発、業務改善、プロダクト開発の相談があれば、まずはお気軽にご連絡ください。',
      primaryCTA: '相談する',
      secondaryCTA: '実績を見る',
    },
    data: PROFILE,
  },
  works: {
    eyebrow: 'Works',
    title: '実績一覧',
    description:
      '公開できるプロダクト開発と、匿名化した支援実績を掲載しています。数値だけではなく、課題・対応・結果の流れが伝わるよう整理しています。',
    detailLink: '詳細を見る',
    countLabel: '件',
    empty: '該当する実績が見つかりませんでした。',
    filter: {
      ariaLabel: 'アウトカムフィルタ',
      all: 'すべて',
    },
    detail: {
      backToList: '実績一覧に戻る',
      problem: '課題',
      solution: '対応',
      result: '結果',
      nextHeading: '次に読む実績',
      cta: {
        heading: '似た課題をお持ちですか',
        description: 'まずは状況を聞かせてください。最適な進め方を一緒に整理します。',
        primaryCTA: '相談する',
        secondaryCTA: '実績一覧に戻る',
      },
    },
    cta: {
      heading: '似た課題をお持ちですか',
      description: '実績に近い案件のご相談はお気軽にどうぞ。まずは状況を聞かせてください。',
      primaryCTA: '相談する',
      secondaryCTA: 'サービスを見る',
    },
  },
  products: {
    eyebrow: 'Products',
    philosophyHeading: 'プロダクトづくりの考え方',
    productsHeading: '公開中・準備中のプロダクト',
    plannedHeading: '構想中',
    highlightsLabel: '主な機能・価値',
    techStackLabel: '主な技術・連携',
    cta: {
      heading: 'プロダクトについて相談する',
      description:
        'marubo の利用相談や、プロダクト開発・MVPづくりの壁打ちがあればお問い合わせください。',
      primaryCTA: '利用相談する',
      secondaryCTA: '実績を見る',
    },
    data: PRODUCTS,
  },
  contact: {
    title: 'お問い合わせ',
    intro:
      'ご相談のみでも歓迎です。まずはお気軽にご連絡ください。いただいたご連絡には、原則 2営業日以内 にお返事いたします。',
    fields: {
      name: 'お名前',
      email: 'メールアドレス',
      category: '相談種別',
      body: 'メッセージ',
    },
    required: '必須',
    placeholders: {
      name: '山田 太郎',
      email: 'taro@example.com',
      body: 'ご相談内容をご記入ください（3000文字以内）',
      category: '選択してください',
    },
    categories: contactCategoryLabels,
    privacyLead: '送信内容は',
    privacyLink: 'プライバシーポリシー',
    privacyTail: 'に基づき適切に管理します。',
    submit: '送信する',
    submitting: '送信中…',
    errors: {
      rateLimit: '送信回数の上限に達しました。しばらく時間を置いてから再度お試しください。',
      generic: '送信中にエラーが発生しました。時間を置いて再度お試しください。',
      network: 'ネットワークエラーが発生しました。接続を確認してください。',
    },
  },
  contactComplete: {
    title: 'お問い合わせありがとうございます',
    description: '内容を確認のうえ、2営業日以内にご返信いたします。しばらくお待ちください。',
    nextHeading: '次におすすめのページ',
    nextLinks: [
      { label: 'トップへ', href: '/' },
      { label: '実績を見る', href: '/works' },
      { label: 'プロダクトを見る', href: '/products' },
    ],
  },
  notFound: {
    title: 'ページが見つかりません',
    description:
      'お探しのページは移動または削除された可能性があります。URL をご確認のうえ、以下のリンクからご覧ください。',
    backToTop: 'トップへ戻る',
    quickLinksHeading: 'よく見られているページ',
    quickLinksAria: 'クイックリンク',
    quickLinks: [
      { label: 'サービスを見る', href: '/services' },
      { label: '実績を見る', href: '/works' },
      { label: 'プロフィール', href: '/profile' },
      { label: 'お問い合わせ', href: '/contact' },
    ],
  },
  legal: {
    privacy: PRIVACY,
    terms: TERMS,
    tokushoho: TOKUSHOHO,
  },
}

export type Messages = typeof jaMessages
