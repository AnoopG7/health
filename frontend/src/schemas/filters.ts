import { z } from 'zod'

export const filtersSchema = z.object({
  category: z.string().optional(),
  priceRange: z.tuple([z.number(), z.number()]).optional(),
  minRating: z.number().min(0).max(5).optional(),
  sortBy: z.enum(['name', 'price', 'rating', 'popular']).default('name'),
  searchQuery: z.string().optional(),
})

export type FiltersData = z.infer<typeof filtersSchema>
