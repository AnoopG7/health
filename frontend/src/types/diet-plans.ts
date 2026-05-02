import type { DietGoal, DietaryType } from './shared'

export interface DietPlanMeal {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface DietPlan {
  id: string
  slug: string
  name: string
  description: string
  longDescription: string
  duration: string
  goal: DietGoal
  caloriesPerDay: number
  price: number
  image: string
  mealsPerDay: number
  dietaryType: DietaryType
  sampleMeals: DietPlanMeal[]
  trainerId: string
  trainerName: string
  createdAt: string
  updatedAt: string
}
