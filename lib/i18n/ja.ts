/** @file Japanese messages and page content sources (BR-21). */
import { PRIVACY } from '@/data/legal/privacy'
import { TERMS } from '@/data/legal/terms'
import { TOKUSHOHO } from '@/data/legal/tokushoho'
import { PROFILE } from '@/data/profile'
import { SAAS } from '@/data/saas'
import { SERVICES } from '@/data/services'
import { WORKS } from '@/data/works'
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
    domains: '対応ドメイン',
    techStack: '主要技術',
    outcomes: '実績',
    github: 'GitHub',
  },
  home: {
    hero: {
      target: 'フリーランス受託 / 技術コンサル',
      title: 'デザインと技術で、\nWebを事業の武器に。',
      description:
        '受託開発・UXデザイン・技術コンサルを一気通貫で提供します。課題の整理から設計・実装・改善まで、Ardors が伴走します。',
      primaryCTA: '相談する',
      secondaryCTA: '実績を見る',
    },
    entryBranches: [
      {
        label: '相談したい',
        description: '困りごとを整理して、一緒に解決策を考えます。まずはお気軽にどうぞ。',
        href: '/contact',
      },
      {
        label: '実績を見たい',
        description: '課題・対応・成果の軸で整理した実績をご覧いただけます。',
        href: '/works',
      },
      {
        label: '人物を知りたい',
        description: '経歴・スキル・得意領域を紹介しています。',
        href: '/profile',
      },
    ],
    trust: {
      domains: ['Web 開発', 'UI/UX デザイン', '技術コンサル'],
      techStack: ['Next.js', 'TypeScript', 'React', 'Figma'],
      outcomes: '受託 12 件・継続率 80%',
      githubHref: 'https://github.com/YU-Kawasaki-05',
    },
    nextPagesHeading: '関連ページ',
    nextPages: [
      {
        label: 'サービス紹介',
        description: '受託・コンサルの提供内容と進め方をご覧ください。',
        href: '/services',
      },
      {
        label: 'SaaS 構想',
        description: '取り組んでいる自社プロダクトの構想と進捗を公開しています。',
        href: '/saas',
      },
    ],
    cta: {
      heading: 'まずは気軽にご相談ください',
      description: 'お見積り・ご相談は無料です。どんな小さな疑問でもお気軽にどうぞ。',
      primaryCTA: '相談する',
      secondaryCTA: '実績を見る',
    },
  },
  services: {
    eyebrow: 'Services',
    title: '提供サービス',
    description:
      'Web 開発・デザイン・技術コンサルを一気通貫で担当します。課題の大きさに合わせて、単発スポットから継続支援まで柔軟に対応します。',
    nextPagesHeading: '関連ページ',
    nextPages: [
      { label: '実績一覧', description: '過去の案件と成果をご覧ください。', href: '/works' },
      {
        label: 'プロフィール',
        description: '担当者の経歴・スキルを紹介しています。',
        href: '/profile',
      },
    ],
    cta: {
      heading: 'どのサービスが合うか迷ったら',
      description: 'ご状況をお聞きした上で、最適な進め方をご提案します。まずはお気軽にどうぞ。',
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
      heading: '一緒に仕事をしませんか',
      description: 'ポートフォリオ・実績にご興味があれば、お気軽にご連絡ください。',
      primaryCTA: '相談する',
      secondaryCTA: '実績を見る',
    },
    data: PROFILE,
  },
  works: {
    eyebrow: 'Works',
    title: '実績一覧',
    description:
      'これまで担当したプロジェクトをご紹介します。成果軸でフィルタして、課題に近い実績をご覧ください。',
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
        description: 'まずは状況を聞かせてください。最適な進め方をご提案します。',
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
    items: WORKS,
  },
  saas: {
    eyebrow: 'SaaS',
    featuresHeading: '主要機能',
    targetUsersHeading: 'こんな方に',
    cta: {
      heading: '興味がある・一緒に作りたい',
      description:
        '早期アクセス登録や機能のご意見もお待ちしています。開発状況の更新もお伝えします。',
      primaryCTA: '連絡する / 登録する',
      secondaryCTA: 'サービスを見る',
    },
    data: SAAS,
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
      { label: 'SaaS 構想', href: '/saas' },
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
