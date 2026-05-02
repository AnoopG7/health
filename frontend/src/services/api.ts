import { z } from 'zod'

export class ValidationError extends Error {
  errors: z.ZodIssue[]

  constructor(message: string, errors: z.ZodIssue[]) {
    super(message)
    this.name = 'ValidationError'
    this.errors = errors
  }
}

export async function loadJson<T>(
  path: string,
  schema: { parse: (data: unknown) => T },
): Promise<T> {
  const response = await fetch(path)

  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.statusText}`)
  }

  const raw = await response.json()

  try {
    return schema.parse(raw)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(`Invalid data in ${path}`, error.issues)
    }
    throw error
  }
}

export function filterByCategory<T extends { category?: string }>(
  items: T[],
  category: string,
): T[] {
  if (!category || category === 'all') return items
  return items.filter((item) => item.category?.toLowerCase() === category.toLowerCase())
}

export function searchItems<T extends Record<string, unknown>>(
  items: T[],
  query: string,
  fields: (keyof T)[],
): T[] {
  if (!query.trim()) return items
  const lower = query.toLowerCase()
  return items.filter((item) =>
    fields.some((field) => {
      const value = item[field]
      return typeof value === 'string' && value.toLowerCase().includes(lower)
    }),
  )
}

export function sortByField<T>(items: T[], field: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...items].sort((a, b) => {
    const aVal = a[field]
    const bVal = b[field]
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return order === 'asc' ? aVal - bVal : bVal - aVal
    }
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    }
    return 0
  })
}
