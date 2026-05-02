import { z } from 'zod'

export const trainerSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  title: z.string().min(1),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().min(0),
  specialties: z.array(z.string().min(1)),
  priceFrom: z.number().positive(),
  image: z.string(),
  bio: z.string().min(1),
  experience: z.string().min(1),
  certifications: z.array(z.string().min(1)),
  languages: z.array(z.string().min(1)),
  availability: z.array(z.string().min(1)),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const trainerReviewSchema = z.object({
  id: z.string().min(1),
  trainerId: z.string().min(1),
  author: z.string().min(1),
  authorAvatar: z.string(),
  rating: z.number().min(0).max(5),
  comment: z.string().min(1),
  date: z.string(),
})

export type Trainer = z.infer<typeof trainerSchema>
export type TrainerReview = z.infer<typeof trainerReviewSchema>
export const trainersArraySchema = z.array(trainerSchema)
export const trainerReviewsArraySchema = z.array(trainerReviewSchema)
