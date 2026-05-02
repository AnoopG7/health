import { z } from 'zod'

export const progressLevelSchema = z.enum(['beginner', 'intermediate', 'advanced'])
export const dietGoalSchema = z.enum(['weight-loss', 'muscle-gain', 'maintenance', 'detox', 'specialty'])
export const dietaryTypeSchema = z.enum(['vegetarian', 'vegan', 'keto', 'paleo', 'balanced', 'custom'])
export const userRoleSchema = z.enum(['client', 'trainer', 'admin'])
export const genderSchema = z.enum(['male', 'female', 'other', 'prefer-not-to-say'])
export const bookingStatusSchema = z.enum(['pending', 'confirmed', 'completed', 'cancelled'])
export const bookingLocationSchema = z.enum(['online', 'in-person'])
export const invoiceStatusSchema = z.enum(['paid', 'pending', 'active', 'overdue'])
export const themeModeSchema = z.enum(['light', 'dark', 'system'])

export const pricingFeatureSchema = z.object({
  label: z.string().min(1),
  included: z.boolean(),
})

export const filterCategorySchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
})

export type ProgressLevel = z.infer<typeof progressLevelSchema>
export type DietGoal = z.infer<typeof dietGoalSchema>
export type DietaryType = z.infer<typeof dietaryTypeSchema>
export type UserRole = z.infer<typeof userRoleSchema>
export type Gender = z.infer<typeof genderSchema>
export type BookingStatus = z.infer<typeof bookingStatusSchema>
export type BookingLocation = z.infer<typeof bookingLocationSchema>
export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>
export type ThemeMode = z.infer<typeof themeModeSchema>
export type PricingFeature = z.infer<typeof pricingFeatureSchema>
export type FilterCategory = z.infer<typeof filterCategorySchema>
