import { z } from 'zod'

export const blogPostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  category: z.string().min(1),
  author: z.string().min(1),
  authorBio: z.string().min(1),
  authorAvatar: z.string(),
  readTime: z.string().min(1),
  date: z.string(),
  featured: z.boolean(),
  image: z.string(),
  tags: z.array(z.string().min(1)),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const blogCategorySchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  count: z.number().int().min(0),
})

export type BlogPost = z.infer<typeof blogPostSchema>
export type BlogCategory = z.infer<typeof blogCategorySchema>
export const blogPostsArraySchema = z.array(blogPostSchema)
