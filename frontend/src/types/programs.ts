import type { ProgressLevel } from './shared'

export interface ProgramModule {
  title: string
  description: string
  week: number
  duration: string
}

export interface Program {
  slug: string
  name: string
  description: string
  longDescription: string
  duration: string
  level: ProgressLevel
  price: number
  image: string
  modules: ProgramModule[]
  trainerId: string
  trainerName: string
  participants: number
  maxParticipants: number
  createdAt: string
  updatedAt: string
}
