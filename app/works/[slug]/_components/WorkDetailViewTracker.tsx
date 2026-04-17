'use client'

/** @file Emits work detail view GA4 event once on first mount (FR-32). */
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { buildWorkDetailViewEventParams, getClientEventContext } from '@/lib/analytics/events'
import { sendAnalyticsEvent } from '@/lib/analytics/gtag'

type WorkDetailViewTrackerProps = {
  workSlug: string
  workCategory: string
}

export default function WorkDetailViewTracker({
  workSlug,
  workCategory,
}: WorkDetailViewTrackerProps) {
  const pathname = usePathname()
  const hasTrackedView = useRef(false)

  useEffect(() => {
    if (hasTrackedView.current) {
      return
    }

    hasTrackedView.current = true
    const context = getClientEventContext(pathname)
    sendAnalyticsEvent(
      'work_detail_view',
      buildWorkDetailViewEventParams(context, {
        work_slug: workSlug,
        work_category: workCategory,
      }),
    )
  }, [pathname, workCategory, workSlug])

  return null
}
