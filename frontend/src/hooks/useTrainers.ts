import { useEffect, useState, useCallback } from 'react'
import type { Trainer } from '@/schemas/trainers'
import { getTrainers, getTrainerBySlug, getTrainersBySpecialty, getTopRatedTrainers } from '@/services'
import { useFiltersStore } from '@/store'

export function useTrainers() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { sortBy, searchQuery } = useFiltersStore()

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    getTrainers()
      .then((data) => {
        if (!cancelled) {
          let filtered = [...data]
          if (searchQuery) {
            filtered = filtered.filter((t) =>
              t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())),
            )
          }
          if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating)
          else if (sortBy === 'price') filtered.sort((a, b) => a.priceFrom - b.priceFrom)
          else if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name))
          setTrainers(filtered)
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
  }, [searchQuery, sortBy])

  const getTrainerBySlugFn = useCallback(async (slug: string) => {
    return getTrainerBySlug(slug)
  }, [])

  const filterTrainers = useCallback(async (specialty: string) => {
    return getTrainersBySpecialty(specialty)
  }, [])

  const getTopRated = useCallback(async (limit?: number) => {
    return getTopRatedTrainers(limit)
  }, [])

  return {
    trainers,
    getTrainerBySlug: getTrainerBySlugFn,
    filterTrainers,
    getTopRatedTrainers: getTopRated,
    isLoading,
    error,
  }
}
