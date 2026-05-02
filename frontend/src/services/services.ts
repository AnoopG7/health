import { loadJson, filterByCategory, searchItems } from './api'
import { servicesArraySchema, type Service } from '@/schemas/services'

const DATA_PATH = '/data/services.json'

let cachedServices: Service[] | null = null

export async function getServices(): Promise<Service[]> {
  if (cachedServices) return cachedServices
  cachedServices = await loadJson(DATA_PATH, servicesArraySchema)
  return cachedServices
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const services = await getServices()
  return services.find((s) => s.slug === slug)
}

export async function getServicesByCategory(category: string): Promise<Service[]> {
  const services = await getServices()
  return filterByCategory(services, category)
}

export async function searchServices(query: string): Promise<Service[]> {
  const services = await getServices()
  return searchItems(services, query, ['name', 'description', 'category'])
}

export async function getPopularServices(): Promise<Service[]> {
  const services = await getServices()
  return services.filter((s) => s.popular)
}

export async function getServiceCategories(): Promise<string[]> {
  const services = await getServices()
  const categories = [...new Set(services.map((s) => s.category))]
  return categories.sort()
}
