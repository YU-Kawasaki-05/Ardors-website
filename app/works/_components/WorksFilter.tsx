/**
 * @file Filter bar for the works list (FR-04, AC-04-01, AC-04-02).
 *
 * Client Component — uses useRouter to update the URL query parameter,
 * enabling shareable filter state without full page reload (AC-04-02).
 */
'use client'

import { useRouter } from 'next/navigation'

type WorksFilterProps = {
  outcomes: string[]
  currentOutcome: string | null
}

export function WorksFilter({ outcomes, currentOutcome }: WorksFilterProps) {
  const router = useRouter()

  const navigate = (outcome: string | null) => {
    const url = outcome ? `/works?outcome=${encodeURIComponent(outcome)}` : '/works'
    router.push(url)
  }

  const btnBase =
    'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'
  const btnActive = 'border-indigo-600 bg-indigo-600 text-white'
  const btnIdle = 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50'

  return (
    <nav aria-label="アウトカムフィルタ">
      <ul className="flex flex-wrap gap-2">
        <li>
          <button
            type="button"
            onClick={() => navigate(null)}
            className={`${btnBase} ${currentOutcome === null ? btnActive : btnIdle}`}
            aria-pressed={currentOutcome === null}
          >
            すべて
          </button>
        </li>
        {outcomes.map((outcome) => (
          <li key={outcome}>
            <button
              type="button"
              onClick={() => navigate(outcome)}
              className={`${btnBase} ${currentOutcome === outcome ? btnActive : btnIdle}`}
              aria-pressed={currentOutcome === outcome}
            >
              {outcome}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
