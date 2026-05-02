import type { PricingFeature } from './shared'

export interface PricingTier {
  name: string
  price: number
  period: string
  features: PricingFeature[]
  cta: string
  popular: boolean
  description: string
  discount: string
}
