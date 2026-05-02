import { loadJson, searchItems } from './api'
import { dietPlansArraySchema, type DietPlan } from '@/schemas/diet-plans'

const DATA_PATH = '/data/diet-plans.json'

let cachedDietPlans: DietPlan[] | null = null

export async function getDietPlans(): Promise<DietPlan[]> {
  if (cachedDietPlans) return cachedDietPlans
  cachedDietPlans = await loadJson(DATA_PATH, dietPlansArraySchema)
  return cachedDietPlans
}

export async function getDietPlanBySlug(slug: string): Promise<DietPlan | undefined> {
  const plans = await getDietPlans()
  return plans.find((p) => p.slug === slug)
}

export async function searchDietPlans(query: string): Promise<DietPlan[]> {
  const plans = await getDietPlans()
  return searchItems(plans, query, ['name', 'description', 'goal'])
}

export async function getDietPlansByGoal(goal: string): Promise<DietPlan[]> {
  const plans = await getDietPlans()
  if (!goal || goal === 'all') return plans
  return plans.filter((p) => p.goal === goal)
}

export async function getDietPlansByType(type: string): Promise<DietPlan[]> {
  const plans = await getDietPlans()
  if (!type || type === 'all') return plans
  return plans.filter((p) => p.dietaryType === type)
}
