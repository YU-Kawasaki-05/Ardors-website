/**
 * @file Profile content data (FR-03, AC-03-01).
 *
 * This file stores the Japanese source profile. English copy is maintained in
 * `lib/i18n/en.ts` so each locale can use natural wording.
 */

export type SkillGroup = {
  category: string
  items: string[]
}

export type CareerEntry = {
  period: string
  role: string
  organization: string
  description: string
}

export type ProfileData = {
  name: string
  nameEn: string
  title: string
  bio: string
  skills: SkillGroup[]
  career: CareerEntry[]
  /** FR-31: opened in a new tab */
  githubHref: string
  /** Optional X profile link */
  xHref?: string
  /** Optional Note.com profile link */
  noteHref?: string
}

export const PROFILE: ProfileData = {
  name: 'かわさき',
  nameEn: 'Yu Kawasaki',
  title: '価値を生むための開発とプロダクトづくり',
  bio: '顧客の課題を理解し、事業に役立つ形でシステムやプロダクトをつくる開発者です。生成AI・Web開発・業務改善の経験を活かし、技術そのものを目的にせず、データの蓄積・活用や顧客体験の改善を通じて価値につながる仕組みづくりを目指しています。',
  skills: [
    {
      category: '事業・業務理解',
      items: ['業務改善', '顧客ヒアリング', 'PoC 開発', 'データ活用'],
    },
    {
      category: '開発',
      items: ['TypeScript', 'React', 'Node.js', 'Python'],
    },
    {
      category: '基盤・連携',
      items: ['AWS', 'PostgreSQL', 'GitHub Actions', 'Stripe'],
    },
    {
      category: 'AI / 自動化',
      items: ['生成AI', 'Playwright', 'mabl', 'テスト自動化'],
    },
  ],
  career: [
    {
      period: '2026.3 〜 現在',
      role: '受け入れテスト自動化支援',
      organization: 'プライム上場企業B（インフラ業界）',
      description:
        '新規アプリ開発プロジェクトで、Playwright・mabl・JavaScript・API を活用した受け入れテスト自動化に従事。実装側やツールベンダーと連携しながら、テスト作成の工数削減と属人性低下を目指しています。',
    },
    {
      period: '2025.7 〜 現在',
      role: 'marubo 開発・販売',
      organization: '個人プロダクト',
      description:
        '学習塾向けAIチャット・生徒管理システム marubo を開発。ヒアリング、設計、開発、テストまで担当し、教育現場で安全にAIを活用するための仕組みづくりに取り組んでいます。',
    },
    {
      period: '2024.4 〜 2025.6',
      role: 'AI / IT コンサルタント',
      organization: 'プライム上場企業A（製薬業界）',
      description:
        'AI活用、業務改善、業務改善システムのPoC開発、社内向け資料・社内報作成、システムや業務に関する相談対応を担当。PoCとして作成した仕組みが評価され、社内システムへ実装されました。',
    },
  ],
  githubHref: 'https://github.com/YU-Kawasaki-05/Ardors-website',
  xHref: 'https://x.com/foooten_',
}
