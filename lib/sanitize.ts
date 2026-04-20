/** @file Dangerous input pattern detection helpers for contact API security checks (BR-34). */

const DANGEROUS_PATTERNS = [
  /<script/i,
  /javascript:/i,
  /on\w+\s*=/i, // onclick=, onerror=, etc.
  /SELECT\s+.+\s+FROM/i,
  /INSERT\s+INTO/i,
  /DROP\s+TABLE/i,
  /UNION\s+SELECT/i,
  /';\s*--/,
]

export function containsDangerousPattern(input: string): boolean {
  return DANGEROUS_PATTERNS.some((pattern) => pattern.test(input))
}
