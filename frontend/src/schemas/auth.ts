import { z } from 'zod'
import { userRoleSchema, genderSchema, themeModeSchema } from './shared'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
})

export const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  phone: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const userSchema = z.object({
  id: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  avatar: z.string(),
  role: userRoleSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const userProfileSchema = userSchema.extend({
  dateOfBirth: z.string(),
  gender: genderSchema,
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  emergencyContact: z.string(),
  emergencyPhone: z.string(),
  bio: z.string(),
  goals: z.array(z.string()),
})

export const authStateSchema = z.object({
  user: userSchema.nullable(),
  token: z.string().nullable(),
  isAuthenticated: z.boolean(),
  isLoading: z.boolean(),
})

export const accountSettingsSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  twoFactorEnabled: z.boolean(),
  language: z.string(),
  timezone: z.string(),
  theme: themeModeSchema,
})

export type LoginCredentials = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>
export type User = z.infer<typeof userSchema>
export type UserProfile = z.infer<typeof userProfileSchema>
export type AuthState = z.infer<typeof authStateSchema>
export type AccountSettings = z.infer<typeof accountSettingsSchema>
