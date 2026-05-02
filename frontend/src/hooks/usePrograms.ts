import { useEffect, useState, useCallback } from 'react'
import type { Program } from '@/schemas/programs'
import { getPrograms, getProgramBySlug, getProgramsByLevel } from '@/services'

export function usePrograms() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    getPrograms()
      .then((data) => {
        if (!cancelled) {
          setPrograms(data)
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const getProgramBySlugFn = useCallback(async (slug: string) => {
    return getProgramBySlug(slug)
  }, [])

  const getProgramsByLevelFn = useCallback(async (level: string) => {
    return getProgramsByLevel(level)
  }, [])

  return {
    programs,
    getProgramBySlug: getProgramBySlugFn,
    getProgramsByLevel: getProgramsByLevelFn,
    isLoading,
    error,
  }
}
