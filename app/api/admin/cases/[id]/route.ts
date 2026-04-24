/** @file Admin cases item route (PUT/DELETE). */
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

import { ADMIN_SESSION_COOKIE_NAME, readAdminSession } from '@/lib/auth'
import { parseWorkUpsertInput } from '@/lib/schemas/work'
import { deleteWorkRecord, getAdminWorkRecordById, updateWorkRecord } from '@/lib/works-store'

export const runtime = 'nodejs'

type AdminCaseRouteContext = {
  params: Promise<{ id: string }>
}

function revalidateWorks(slugs: string[]) {
  revalidatePath('/works')

  for (const slug of slugs) {
    revalidatePath(`/works/${slug}`)
  }
}

async function ensureAdminSession(req: NextRequest): Promise<boolean> {
  const session = await readAdminSession(req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value)
  return Boolean(session)
}

export async function PUT(req: NextRequest, { params }: AdminCaseRouteContext) {
  if (!(await ensureAdminSession(req))) {
    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { id } = await params
  const currentRecord = await getAdminWorkRecordById(id)

  if (!currentRecord) {
    return NextResponse.json({ message: 'NOT_FOUND' }, { status: 404 })
  }

  try {
    const payload = parseWorkUpsertInput(await req.json())
    const record = await updateWorkRecord(id, payload)

    revalidateWorks([currentRecord.slug, record.slug])
    return NextResponse.json({ record }, { status: 200 })
  } catch (error) {
    if (error instanceof Error && error.message === 'DUPLICATE_SLUG') {
      return NextResponse.json({ message: 'DUPLICATE_SLUG' }, { status: 409 })
    }

    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return NextResponse.json({ message: 'NOT_FOUND' }, { status: 404 })
    }

    return NextResponse.json({ message: 'INVALID_INPUT' }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest, { params }: AdminCaseRouteContext) {
  if (!(await ensureAdminSession(req))) {
    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { id } = await params
  const currentRecord = await getAdminWorkRecordById(id)

  if (!currentRecord) {
    return NextResponse.json({ message: 'NOT_FOUND' }, { status: 404 })
  }

  await deleteWorkRecord(id)
  revalidateWorks([currentRecord.slug])

  return NextResponse.json({ ok: true }, { status: 200 })
}
