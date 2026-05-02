import { z } from 'zod'
import { progressLevelSchema } from './shared'

export const programModuleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  week: z.number().int().min(1),
  duration: z.string().min(1),
})

export const programSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().min(1),
  duration: z.string().min(1),
  level: progressLevelSchema,
  price: z.number().positive(),
  image: z.string(),
  modules: z.array(programModuleSchema),
  trainerId: z.string().min(1),
  trainerName: z.string().min(1),
  participants: z.number().int().min(0),
  maxParticipants: z.number().int().min(1),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Program = z.infer<typeof programSchema>
export type ProgramModule = z.infer<typeof programModuleSchema>
export const programsArraySchema = z.array(programSchema)
