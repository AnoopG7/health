import { loadJson, searchItems } from './api'
import { programsArraySchema, type Program } from '@/schemas/programs'

const DATA_PATH = '/data/programs.json'

let cachedPrograms: Program[] | null = null

export async function getPrograms(): Promise<Program[]> {
  if (cachedPrograms) return cachedPrograms
  cachedPrograms = await loadJson(DATA_PATH, programsArraySchema)
  return cachedPrograms
}

export async function getProgramBySlug(slug: string): Promise<Program | undefined> {
  const programs = await getPrograms()
  return programs.find((p) => p.slug === slug)
}

export async function searchPrograms(query: string): Promise<Program[]> {
  const programs = await getPrograms()
  return searchItems(programs, query, ['name', 'description', 'trainerName'])
}

export async function getProgramsByLevel(level: string): Promise<Program[]> {
  const programs = await getPrograms()
  if (!level || level === 'all') return programs
  return programs.filter((p) => p.level === level)
}

export async function getProgramsByTrainer(trainerId: string): Promise<Program[]> {
  const programs = await getPrograms()
  return programs.filter((p) => p.trainerId === trainerId)
}

export async function getAvailablePrograms(): Promise<Program[]> {
  const programs = await getPrograms()
  return programs.filter((p) => p.participants < p.maxParticipants)
}
