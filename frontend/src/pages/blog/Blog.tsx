import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBlogPosts, getBlogCategories } from '@/services'
import type { BlogPost } from '@/schemas/blog'
import { PageMeta, SectionHeading, BlogCard, FilterBar } from '@/components/common'

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([])
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    getBlogPosts().then(setPosts)
    getBlogCategories().then((cats) => setCategories([{ label: 'All', value: 'all' }, ...cats]))
  }, [])

  const filtered = activeCategory === 'all' ? posts : posts.filter((p) => p.category.toLowerCase() === activeCategory)

  return (
    <>
      <PageMeta title="Blog — VitalEdge" description="Expert advice, training tips, and wellness insights from our team." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Our Blog" title="Latest Articles" subtitle="Expert advice and insights from our team." align="center" />
          <div className="mx-auto mt-8 max-w-2xl">
            <FilterBar categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} onSearchChange={() => {}} onSortChange={() => {}} onReset={() => setActiveCategory('all')} searchPlaceholder="Search articles..." />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`}>
                <BlogCard slug={p.slug} title={p.title} excerpt={p.excerpt} category={p.category} author={p.author} readTime={p.readTime} date={p.date} featured={p.featured} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
