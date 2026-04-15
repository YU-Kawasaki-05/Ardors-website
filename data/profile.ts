/**
 * @file Profile content data (FR-03, AC-03-01).
 *
 * Update this file to reflect the actual profile.
 * Structure is designed to be replaced with CMS / frontmatter in the future.
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
  /** Optional Note.com profile link */
  noteHref?: string
}

export const PROFILE: ProfileData = {
  name: '河崎 祐',
  nameEn: 'Yuu Kawasaki',
  title: 'フリーランス Web エンジニア / UI デザイナー',
  bio: '設計から実装まで一気通貫で担当できるフリーランス。事業の課題を技術とデザインで解決することを得意とします。小さなチームが大きな成果を出せるよう、一緒に考えます。',
  skills: [
    {
      category: 'フロントエンド',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML / CSS'],
    },
    {
      category: 'バックエンド',
      items: ['Node.js', 'PostgreSQL', 'Prisma', 'REST API'],
    },
    {
      category: 'デザイン',
      items: ['Figma', 'UI 設計', 'ワイヤーフレーム', 'プロトタイピング'],
    },
    {
      category: 'インフラ / ツール',
      items: ['Vercel', 'AWS', 'Docker', 'GitHub Actions'],
    },
  ],
  career: [
    {
      period: '2024 〜 現在',
      role: 'フリーランス Web エンジニア / デザイナー',
      organization: 'Ardors（個人事業）',
      description:
        'Web 開発・UI デザイン・技術コンサルを提供。スタートアップ・中小企業を中心に複数案件を並行して担当。',
    },
    {
      period: '2020 〜 2024',
      role: 'Web エンジニア',
      organization: 'fouryou',
      description: 'フロントエンド開発を担当。設計・実装・改善をフルサイクルで経験。',
    },
  ],
  githubHref: 'https://github.com/YU-Kawasaki-05',
  noteHref: 'https://note.com/ardors',
}
