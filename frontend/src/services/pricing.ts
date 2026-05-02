import { loadJson } from './api'
import { pricingTiersArraySchema, type PricingTier } from '@/schemas/content'

const DATA_PATH = '/data/pricing.json'

let cachedTiers: PricingTier[] | null = null

export async function getPricingTiers(): Promise<PricingTier[]> {
  if (cachedTiers) return cachedTiers
  cachedTiers = await loadJson(DATA_PATH, pricingTiersArraySchema)
  return cachedTiers
}

export async function getPopularTier(): Promise<PricingTier | undefined> {
  const tiers = await getPricingTiers()
  return tiers.find((t) => t.popular)
}
