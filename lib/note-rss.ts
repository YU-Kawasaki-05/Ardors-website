/** @file Note RSS fetch and parse helpers (FR-30). */

export type NoteArticle = {
  title: string
  link: string
  publishedAt: string
  description: string
}

const ITEM_RE = /<item\b[\s\S]*?<\/item>/gi
const EXCERPT_MAX_LENGTH = 180

function getNoteRssUrl(): string | null {
  const rssUrl = process.env.NOTE_RSS_URL?.trim()
  return rssUrl ? rssUrl : null
}

function escapeTagName(tagName: string): string {
  return tagName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function extractTagContent(source: string, tagNames: string[]): string {
  for (const tagName of tagNames) {
    const pattern = new RegExp(
      `<${escapeTagName(tagName)}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapeTagName(tagName)}>`,
      'i',
    )
    const match = pattern.exec(source)

    if (match?.[1]) {
      return match[1].trim()
    }
  }

  return ''
}

function unwrapCdata(value: string): string {
  const trimmed = value.trim()
  const match = /^<!\[CDATA\[([\s\S]*?)\]\]>$/i.exec(trimmed)
  return match?.[1]?.trim() ?? trimmed
}

function decodeXmlEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-fA-F]+|amp|lt|gt|quot|apos|#39);/g, (entity, code) => {
    switch (code) {
      case 'amp':
        return '&'
      case 'lt':
        return '<'
      case 'gt':
        return '>'
      case 'quot':
        return '"'
      case 'apos':
      case '#39':
        return "'"
      default: {
        if (!code.startsWith('#')) {
          return entity
        }

        const isHex = code[1]?.toLowerCase() === 'x'
        const rawValue = isHex ? code.slice(2) : code.slice(1)
        const parsed = Number.parseInt(rawValue, isHex ? 16 : 10)
        return Number.isNaN(parsed) ? entity : String.fromCodePoint(parsed)
      }
    }
  })
}

function stripHtml(value: string): string {
  return decodeXmlEntities(unwrapCdata(value))
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function toExcerpt(value: string, limit = EXCERPT_MAX_LENGTH): string {
  if (value.length <= limit) {
    return value
  }

  return `${value.slice(0, limit).trimEnd()}...`
}

export function hasNoteRssUrl(): boolean {
  return getNoteRssUrl() !== null
}

export function parseNoteRss(xml: string): NoteArticle[] {
  const items = xml.match(ITEM_RE) ?? []

  return items
    .map((item): NoteArticle | null => {
      const title = decodeXmlEntities(unwrapCdata(extractTagContent(item, ['title'])))
      const link = decodeXmlEntities(unwrapCdata(extractTagContent(item, ['link'])))
      const publishedAt = decodeXmlEntities(
        unwrapCdata(extractTagContent(item, ['pubDate', 'dc:date'])),
      )
      const descriptionSource = extractTagContent(item, ['description', 'content:encoded'])
      const description = toExcerpt(stripHtml(descriptionSource))

      if (!title || !link) {
        return null
      }

      return {
        title,
        link,
        publishedAt,
        description,
      }
    })
    .filter((article): article is NoteArticle => article !== null)
}

export async function getNoteArticles(): Promise<NoteArticle[]> {
  const rssUrl = getNoteRssUrl()

  if (!rssUrl) {
    return []
  }

  const response = await fetch(rssUrl, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch Note RSS: ${response.status} ${response.statusText}`)
  }

  const xml = await response.text()
  return parseNoteRss(xml)
}
