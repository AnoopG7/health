import { z } from 'zod'

export const serviceSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().min(1),
  priceFrom: z.number().positive(),
  popular: z.boolean(),
  icon: z.string().min(1),
  features: z.array(z.string().min(1)),
  duration: z.string().min(1),
  image: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Service = z.infer<typeof serviceSchema>
export const servicesArraySchema = z.array(serviceSchema)
