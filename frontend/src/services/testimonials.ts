import { loadJson } from './api'
import { testimonialsArraySchema, type Testimonial } from '@/schemas/content'

const DATA_PATH = '/data/testimonials.json'

let cachedTestimonials: Testimonial[] | null = null

export async function getTestimonials(): Promise<Testimonial[]> {
  if (cachedTestimonials) return cachedTestimonials
  cachedTestimonials = await loadJson(DATA_PATH, testimonialsArraySchema)
  return cachedTestimonials
}

export async function getTestimonialsByService(service: string): Promise<Testimonial[]> {
  const testimonials = await getTestimonials()
  if (!service || service === 'all') return testimonials
  return testimonials.filter((t) => t.service.toLowerCase().includes(service.toLowerCase()))
}

export async function getVerifiedTestimonials(): Promise<Testimonial[]> {
  const testimonials = await getTestimonials()
  return testimonials.filter((t) => t.verified)
}

export async function getRandomTestimonials(limit = 4): Promise<Testimonial[]> {
  const testimonials = await getTestimonials()
  const shuffled = [...testimonials].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, limit)
}
