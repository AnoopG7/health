import type { ReactNode } from 'react'
import type { ProgressLevel, ImageType, RatingSize, FilterCategory } from './shared'

export interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  align: 'left' | 'center'
  className?: string
}

export interface PlaceholderImageProps {
  type: ImageType
  text: string
  className?: string
}

export interface StarRatingProps {
  rating: number
  size: RatingSize
  showValue: boolean
  className?: string
}

export interface ProgressBadgeProps {
  level: ProgressLevel
  className?: string
}

export interface StatCardProps {
  icon: ReactNode
  value: number
  label: string
  suffix: string
  className?: string
}

export interface ServiceCardProps {
  slug: string
  icon: ReactNode
  name: string
  category: string
  description: string
  priceFrom: number
  popular: boolean
  className?: string
}

export interface TrainerCardProps {
  id: string
  name: string
  title: string
  rating: number
  reviewCount: number
  specialties: string[]
  priceFrom: number
  className?: string
}

export interface ProgramCardProps {
  slug: string
  name: string
  description: string
  duration: string
  level: ProgressLevel
  price: number
  className?: string
}

export interface DietPlanCardProps {
  slug: string
  name: string
  description: string
  duration: string
  goal: string
  caloriesPerDay: number
  price: number
  className?: string
}

export interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  readTime: string
  date: string
  featured: boolean
  className?: string
}

export interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  service: string
  rating: number
  className?: string
}

export interface PricingCardProps {
  name: string
  price: number
  period: string
  features: { label: string; included: boolean }[]
  cta: string
  popular: boolean
  className?: string
}

export interface FilterBarProps {
  categories: FilterCategory[]
  activeCategory: string
  onCategoryChange: (value: string) => void
  onSearchChange: (value: string) => void
  onSortChange: (value: string) => void
  onReset: () => void
  searchPlaceholder: string
  className?: string
}

export interface PageMetaProps {
  title: string
  description: string
}
