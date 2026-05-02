import { loadJson, searchItems } from './api'
import { trainersArraySchema, type Trainer, type TrainerReview } from '@/schemas/trainers'

const DATA_PATH = '/data/trainers.json'

let cachedTrainers: Trainer[] | null = null

export async function getTrainers(): Promise<Trainer[]> {
  if (cachedTrainers) return cachedTrainers
  cachedTrainers = await loadJson(DATA_PATH, trainersArraySchema)
  return cachedTrainers
}

export async function getTrainerBySlug(slug: string): Promise<Trainer | undefined> {
  const trainers = await getTrainers()
  return trainers.find((t) => t.slug === slug)
}

export async function getTrainerById(id: string): Promise<Trainer | undefined> {
  const trainers = await getTrainers()
  return trainers.find((t) => t.id === id)
}

export async function searchTrainers(query: string): Promise<Trainer[]> {
  const trainers = await getTrainers()
  return searchItems(trainers, query, ['name', 'title', 'specialties'])
}

export async function getTrainersBySpecialty(specialty: string): Promise<Trainer[]> {
  const trainers = await getTrainers()
  return trainers.filter((t) =>
    t.specialties.some((s) => s.toLowerCase().includes(specialty.toLowerCase())),
  )
}

export async function getTopRatedTrainers(limit = 4): Promise<Trainer[]> {
  const trainers = await getTrainers()
  return [...trainers].sort((a, b) => b.rating - a.rating).slice(0, limit)
}

export function getTrainerReviews(trainerId: string): TrainerReview[] {
  return [
    {
      id: `rev-${trainerId}-1`,
      trainerId,
      author: 'Alex M.',
      authorAvatar: '',
      rating: 5,
      comment: 'Absolutely fantastic experience. Highly recommend!',
      date: '2025-03-01',
    },
    {
      id: `rev-${trainerId}-2`,
      trainerId,
      author: 'Sam K.',
      authorAvatar: '',
      rating: 4,
      comment: 'Great sessions, saw real progress in just a few weeks.',
      date: '2025-02-15',
    },
  ]
}
