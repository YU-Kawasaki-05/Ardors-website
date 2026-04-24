/** @file Admin cases API collection route (GET/POST). */
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

import { ADMIN_SESSION_COOKIE_NAME, readAdminSession } from '@/lib/auth'
import { parseWorkUpsertInput } from '@/lib/schemas/work'
import { createWorkRecord, listAdminWorkRecords } from '@/lib/works-store'

export const runtime = 'nodejs'

function revalidateWorks(slug?: string) {
  revalidatePath('/works')

  if (slug) {
    revalidatePath(`/works/${slug}`)
  }
}

async function ensureAdminSession(req: NextRequest): Promise<boolean> {
  const session = await readAdminSession(req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value)
  return Boolean(session)
}

export async function GET(req: NextRequest) {
  if (!(await ensureAdminSession(req))) {
    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  }

  const records = await listAdminWorkRecords()
  return NextResponse.json({ records }, { status: 200 })
}

export async function POST(req: NextRequest) {
  if (!(await ensureAdminSession(req))) {
    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  }

  try {
    const payload = parseWorkUpsertInput(await req.json())
    const record = await createWorkRecord(payload)

    revalidateWorks(record.slug)
    return NextResponse.json({ record }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'DUPLICATE_SLUG') {
      return NextResponse.json({ message: 'DUPLICATE_SLUG' }, { status: 409 })
    }

    return NextResponse.json({ message: 'INVALID_INPUT' }, { status: 400 })
  }
}
