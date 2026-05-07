import { loadJson } from './api'
import { z } from 'zod'

const faqSchema = z.object({
  id: z.string(),
  category: z.string(),
  question: z.string(),
  answer: z.string(),
})

export type Faq = z.infer<typeof faqSchema>

const DATA_PATH = '/data/faq.json'
let cachedFaqs: Faq[] | null = null

export async function getFaqs(): Promise<Faq[]> {
  if (cachedFaqs) return cachedFaqs
  cachedFaqs = await loadJson(DATA_PATH, z.array(faqSchema))
  return cachedFaqs
}

export async function getFaqsByCategory(category: string): Promise<Faq[]> {
  const faqs = await getFaqs()
  return faqs.filter((f) => f.category.toLowerCase() === category.toLowerCase())
}

export async function getFaqCategories(): Promise<string[]> {
  const faqs = await getFaqs()
  return [...new Set(faqs.map((f) => f.category))]
}
