export interface Trainer {
  id: string
  slug: string
  name: string
  title: string
  rating: number
  reviewCount: number
  specialties: string[]
  priceFrom: number
  image: string
  bio: string
  experience: string
  certifications: string[]
  languages: string[]
  availability: string[]
  createdAt: string
  updatedAt: string
}

export interface TrainerReview {
  id: string
  trainerId: string
  author: string
  authorAvatar: string
  rating: number
  comment: string
  date: string
}
