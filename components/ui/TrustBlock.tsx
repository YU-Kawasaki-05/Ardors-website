/** @file Trust/credibility block with domains, tech stack, outcomes, and GitHub link (FR-10). */
type TrustBlockProps = {
  /** 対応ドメイン (e.g. ["Web 開発", "UI/UX デザイン"]) */
  domains: string[]
  /** 主要技術スタック (e.g. ["Next.js", "TypeScript", "Figma"]) */
  techStack: string[]
  /** 実績サマリー (e.g. "受託 12 件・継続率 80%") */
  outcomes: string
  /** GitHub プロフィール URL (FR-31) */
  githubHref: string
  /** Localized labels for headings. */
  labels: {
    ariaLabel: string
    domains: string
    techStack: string
    outcomes: string
    github: string
  }
}

function TagList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <span className="inline-block rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700">
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

function BlockHeading({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{children}</p>
}

export default function TrustBlock({
  domains,
  techStack,
  outcomes,
  githubHref,
  labels,
}: TrustBlockProps) {
  return (
    <section
      className="rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-8"
      aria-label={labels.ariaLabel}
    >
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {/* 対応ドメイン */}
        <div>
          <BlockHeading>{labels.domains}</BlockHeading>
          <TagList items={domains} />
        </div>

        {/* 主要技術 */}
        <div>
          <BlockHeading>{labels.techStack}</BlockHeading>
          <TagList items={techStack} />
        </div>

        {/* 実績サマリー */}
        <div>
          <BlockHeading>{labels.outcomes}</BlockHeading>
          <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-800">{outcomes}</p>
        </div>

        {/* GitHub リンク */}
        <div>
          <BlockHeading>{labels.github}</BlockHeading>
          <div className="mt-3">
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {labels.github}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
