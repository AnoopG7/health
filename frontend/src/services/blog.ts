import { loadJson, searchItems } from './api'
import { blogPostsArraySchema, type BlogPost } from '@/schemas/blog'

const DATA_PATH = '/data/blog.json'

let cachedPosts: BlogPost[] | null = null

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (cachedPosts) return cachedPosts
  cachedPosts = await loadJson(DATA_PATH, blogPostsArraySchema)
  return cachedPosts
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts()
  return posts.find((p) => p.slug === slug)
}

export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts()
  return searchItems(posts, query, ['title', 'excerpt', 'author', 'category'])
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts()
  if (!category || category === 'all') return posts
  return posts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getBlogPosts()
  return posts.filter((p) => p.featured)
}

export async function getBlogCategories(): Promise<{ label: string; value: string; count: number }[]> {
  const posts = await getBlogPosts()
  const categoryMap = new Map<string, number>()
  posts.forEach((p) => {
    categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1)
  })
  return [...categoryMap.entries()].map(([label, count]) => ({
    label,
    value: label.toLowerCase().replace(/\s+/g, '-'),
    count,
  }))
}
