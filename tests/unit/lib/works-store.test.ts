/** @file Unit tests for the works datastore fallback behavior. */
import { beforeEach, describe, expect, it, vi } from 'vitest'

const readFileMock = vi.hoisted(() => vi.fn())
const writeFileMock = vi.hoisted(() => vi.fn())

vi.mock('node:fs/promises', () => ({
  readFile: readFileMock,
  writeFile: writeFileMock,
}))

import { listPublicWorks } from '@/lib/works-store'

function createNodeError(message: string, code: string): Error & { code: string } {
  return Object.assign(new Error(message), { code })
}

describe('works-store', () => {
  beforeEach(() => {
    readFileMock.mockReset()
    writeFileMock.mockReset()
  })

  it('falls back to bundled works data when the JSON file is missing in the runtime bundle', async () => {
    readFileMock.mockRejectedValue(createNodeError('missing works data', 'ENOENT'))

    const works = await listPublicWorks('ja')

    expect(readFileMock).toHaveBeenCalledWith(expect.stringContaining('data/works.json'), 'utf8')
    expect(works.map((work) => work.slug)).toContain('corporate-site-renewal')
  })

  it('rethrows non-missing file errors', async () => {
    readFileMock.mockRejectedValue(createNodeError('permission denied', 'EACCES'))

    await expect(listPublicWorks('ja')).rejects.toThrow('permission denied')
  })
})
