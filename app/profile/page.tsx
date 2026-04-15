/**
 * @file Profile page — SCR-03 (FR-03, FR-08, BR-20, BR-21)
 */
import type { Metadata } from 'next'

import { localizeHref } from '@/config/i18n'
import JsonLd, { buildPageMetadata, toAbsoluteUrl } from '@/components/JsonLd'
import { CTABlock } from '@/components/ui'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/i18n/request'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = getMessages(locale).profile

  return buildPageMetadata({
    locale,
    pathname: '/profile',
    title: t.data.name,
    description: t.data.bio,
  })
}

export default async function ProfilePage() {
  const locale = await getRequestLocale()
  const t = getMessages(locale).profile
  const profile = t.data
  const profileUrl = toAbsoluteUrl(localizeHref(locale, '/profile'))
  const sameAs = [profile.githubHref, profile.noteHref].filter(
    (link): link is string => typeof link === 'string' && link.length > 0,
  )

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: profile.name,
          url: profileUrl,
          description: profile.bio,
          jobTitle: profile.title,
          sameAs,
        }}
      />
      <section className="border-b border-zinc-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {profile.name}
            <span className="ml-3 text-2xl font-normal text-zinc-400">{profile.nameEn}</span>
          </h1>
          <p className="mt-2 text-base font-medium text-zinc-500">{profile.title}</p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">{profile.bio}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-xl font-bold text-zinc-900">{t.skillsHeading}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {profile.skills.map((group) => (
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

      <section className="border-t border-zinc-100 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-xl font-bold text-zinc-900">{t.careerHeading}</h2>
          <ol className="relative border-l border-zinc-200">
            {profile.career.map((entry, i) => (
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

      <section className="border-t border-zinc-100 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-bold text-zinc-900">{t.linksHeading}</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={profile.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
            >
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
            {profile.noteHref && (
              <a
                href={profile.noteHref}
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

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CTABlock
            heading={t.cta.heading}
            description={t.cta.description}
            primaryCTA={{ label: t.cta.primaryCTA, href: localizeHref(locale, '/contact') }}
            secondaryCTA={{ label: t.cta.secondaryCTA, href: localizeHref(locale, '/works') }}
          />
        </div>
      </section>
    </>
  )
}
