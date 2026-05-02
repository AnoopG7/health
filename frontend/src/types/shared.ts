export type ProgressLevel = 'beginner' | 'intermediate' | 'advanced'

export type ImageType = 'avatar' | 'banner' | 'thumbnail' | 'square'

export type RatingSize = 'sm' | 'md' | 'lg'

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export type DietGoal = 'weight-loss' | 'muscle-gain' | 'maintenance' | 'detox' | 'specialty'

export type DietaryType = 'vegetarian' | 'vegan' | 'keto' | 'paleo' | 'balanced' | 'custom'

export type UserRole = 'client' | 'trainer' | 'admin'

export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say'

export type BookingLocation = 'online' | 'in-person'

export type InvoiceStatus = 'paid' | 'pending' | 'active' | 'overdue'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface FilterCategory {
  label: string
  value: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialLinks {
  twitter: string
  instagram: string
  facebook: string
  linkedin: string
  youtube: string
}

export interface ContactInfo {
  email: string
  phone: string
  address: string
}

export interface PricingFeature {
  label: string
  included: boolean
}
