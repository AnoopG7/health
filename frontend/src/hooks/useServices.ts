import { useEffect, useState, useCallback } from 'react'
import type { Service } from '@/schemas/services'
import { getServices, getServiceBySlug, getServicesByCategory, getPopularServices, getServiceCategories } from '@/services'

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    getServices()
      .then((data) => {
        if (!cancelled) {
          setServices(data)
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

  const getServiceBySlugFn = useCallback(async (slug: string) => {
    return getServiceBySlug(slug)
  }, [])

  const getServicesByCategoryFn = useCallback(async (cat: string) => {
    return getServicesByCategory(cat)
  }, [])

  const getPopular = useCallback(async (limit?: number) => {
    const popular = await getPopularServices()
    return limit ? popular.slice(0, limit) : popular
  }, [])

  const getCategories = useCallback(async () => {
    return getServiceCategories()
  }, [])

  return {
    services,
    getServiceBySlug: getServiceBySlugFn,
    getServicesByCategory: getServicesByCategoryFn,
    getPopularServices: getPopular,
    getServiceCategories: getCategories,
    isLoading,
    error,
  }
}
