'use client'

/** @file Reusable CTA section block (FR-09, BR-02). */
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { buildCtaClickEventParams, getClientEventContext } from '@/lib/analytics/events'
import { sendAnalyticsEvent } from '@/lib/analytics/gtag'

type CTAItem = {
  label: string
  href: string
}

type CTABlockProps = {
  heading: string
  description?: string
  primaryCTA: CTAItem
  secondaryCTA?: CTAItem
  ctaArea?: string
}

export default function CTABlock({
  heading,
  description,
  primaryCTA,
  secondaryCTA,
  ctaArea = 'cta_block',
}: CTABlockProps) {
  const pathname = usePathname()

  const trackCTAClick = (cta: CTAItem) => {
    const context = getClientEventContext(pathname)
    sendAnalyticsEvent(
      'cta_click',
      buildCtaClickEventParams(context, {
        cta_label: cta.label,
        cta_target: cta.href,
        cta_area: ctaArea,
      }),
    )
  }

  return (
    <section className="rounded-2xl bg-zinc-50 px-8 py-14 text-center">
      <h2 className="text-2xl font-bold leading-snug text-zinc-900 sm:text-3xl">{heading}</h2>

      {description && (
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-600">
          {description}
        </p>
      )}

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        {/* Primary CTA — brand color (--color-primary: #4F46E5) */}
        <Link
          href={primaryCTA.href}
          onClick={() => trackCTAClick(primaryCTA)}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          {primaryCTA.label}
        </Link>

        {/* Secondary CTA — outlined neutral */}
        {secondaryCTA && (
          <Link
            href={secondaryCTA.href}
            onClick={() => trackCTAClick(secondaryCTA)}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
          >
            {secondaryCTA.label}
          </Link>
        )}
      </div>
    </section>
  )
}
