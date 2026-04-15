/**
 * @file Profile page — SCR-03 (FR-03, BR-02, AC-03-01)
 *
 * Section order:
 *   1. Intro       — 氏名 / 肩書 / 一言紹介
 *   2. Skills      — カテゴリ別スキルタグ
 *   3. Career      — 経歴タイムライン
 *   4. Links       — GitHub / Note 外部リンク (FR-31)
 *   5. CTABlock    — お問い合わせ CTA (BR-02)
 */
import { CTABlock } from '@/components/ui'
import { PROFILE } from '@/data/profile'

export default function ProfilePage() {
  return (
    <>
      {/* 1. Intro */}
      <section className="border-b border-zinc-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Profile</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {PROFILE.name}
            <span className="ml-3 text-2xl font-normal text-zinc-400">{PROFILE.nameEn}</span>
          </h1>
          <p className="mt-2 text-base font-medium text-zinc-500">{PROFILE.title}</p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">{PROFILE.bio}</p>
        </div>
      </section>

      {/* 2. Skills (AC-03-01: スキルセットが表示される) */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-xl font-bold text-zinc-900">スキルセット</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROFILE.skills.map((group) => (
              <div key={group.category}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  {group.category}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="inline-block rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Career timeline (AC-03-01: 実績サマリが表示される) */}
      <section className="border-t border-zinc-100 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-xl font-bold text-zinc-900">経歴</h2>
          <ol className="relative border-l border-zinc-200">
            {PROFILE.career.map((entry, i) => (
              <li key={i} className="mb-8 ml-6 last:mb-0">
                <span className="absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full border border-zinc-200 bg-white ring-4 ring-white">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                </span>
                <p className="mb-1 text-xs font-medium text-zinc-400">{entry.period}</p>
                <p className="text-sm font-semibold text-zinc-900">{entry.role}</p>
                <p className="text-xs text-zinc-500">{entry.organization}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{entry.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. External links (AC-03-01: GitHub導線 / FR-31) */}
      <section className="border-t border-zinc-100 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-bold text-zinc-900">外部リンク</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={PROFILE.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
            >
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
            {PROFILE.noteHref && (
              <a
                href={PROFILE.noteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
              >
                Note
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 5. CTABlock (BR-02) */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CTABlock
            heading="一緒に仕事をしませんか"
            description="ポートフォリオ・実績にご興味があれば、お気軽にご連絡ください。"
            primaryCTA={{ label: '相談する', href: '/contact' }}
            secondaryCTA={{ label: '実績を見る', href: '/works' }}
          />
        </div>
      </section>
    </>
  )
}
