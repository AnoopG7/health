export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  authorBio: string
  authorAvatar: string
  readTime: string
  date: string
  featured: boolean
  image: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface BlogCategory {
  label: string
  value: string
  count: number
}
