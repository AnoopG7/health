import { z } from 'zod'
import { dietGoalSchema, dietaryTypeSchema } from './shared'

export const dietPlanMealSchema = z.object({
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  name: z.string().min(1),
  calories: z.number().int().min(0),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fat: z.number().min(0),
})

export const dietPlanSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().min(1),
  duration: z.string().min(1),
  goal: dietGoalSchema,
  caloriesPerDay: z.number().int().min(0),
  price: z.number().positive(),
  image: z.string(),
  mealsPerDay: z.number().int().min(1),
  dietaryType: dietaryTypeSchema,
  sampleMeals: z.array(dietPlanMealSchema),
  trainerId: z.string().min(1),
  trainerName: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type DietPlan = z.infer<typeof dietPlanSchema>
export type DietPlanMeal = z.infer<typeof dietPlanMealSchema>
export const dietPlansArraySchema = z.array(dietPlanSchema)
