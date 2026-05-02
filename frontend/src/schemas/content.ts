import { z } from 'zod'
import { pricingFeatureSchema } from './shared'

export const testimonialSchema = z.object({
  id: z.string().min(1),
  quote: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  service: z.string().min(1),
  rating: z.number().min(0).max(5),
  image: z.string(),
  verified: z.boolean(),
  createdAt: z.string(),
})

export const pricingTierSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  period: z.string().min(1),
  description: z.string().min(1),
  features: z.array(pricingFeatureSchema),
  cta: z.string().min(1),
  popular: z.boolean(),
  discount: z.string(),
})

export type Testimonial = z.infer<typeof testimonialSchema>
export type PricingTier = z.infer<typeof pricingTierSchema>
export const testimonialsArraySchema = z.array(testimonialSchema)
export const pricingTiersArraySchema = z.array(pricingTierSchema)
