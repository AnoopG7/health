import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getBlogPosts, getBlogCategories } from '@/services'
import type { BlogPost } from '@/schemas/blog'
import { PageMeta, SectionHeading, BlogCard, FilterBar } from '@/components/common'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Calendar, ArrowRight, TrendingUp } from 'lucide-react'
import PlaceholderImage from '@/components/common/PlaceholderImage'

const blogSortOptions = [
  { label: 'Newest First', value: 'date' },
  { label: 'Title (A-Z)', value: 'title' },
  { label: 'Shortest Read', value: 'readTime' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date')

  useEffect(() => {
    getBlogPosts().then(setPosts)
    getBlogCategories().then((cats) => setCategories([{ label: 'All', value: 'all' }, ...cats]))
  }, [])

  const filtered = posts.filter((p) => {
    const matchCategory = activeCategory === 'all' || p.category.toLowerCase() === activeCategory
    const matchSearch = searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime()
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    if (sortBy === 'readTime') return parseInt(a.readTime) - parseInt(b.readTime)
    return 0
  })

  const featuredPosts = sorted.filter((p) => p.featured)
  const regularPosts = sorted.filter((p) => !p.featured)

  return (
    <>
      <PageMeta title="Blog — VitalEdge" description="Expert advice, training tips, and wellness insights from our team." />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Our Blog" title="Latest Articles" subtitle="Expert advice and insights from our team." align="center" />

          {featuredPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12"
            >
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Featured</p>
              </div>
              <Link to={`/blog/${featuredPosts[0].slug}`} className="group block">
                <div className="overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg md:grid md:grid-cols-2 md:items-center">
                  <div className="aspect-video md:aspect-auto">
                    <PlaceholderImage type="banner" text={featuredPosts[0].category} />
                  </div>
                  <div className="p-8">
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant="secondary">{featuredPosts[0].category}</Badge>
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    </div>
                    <h2 className="mb-3 text-2xl font-bold transition-colors group-hover:text-primary md:text-3xl">
                      {featuredPosts[0].title}
                    </h2>
                    <p className="mb-6 line-clamp-3 text-muted-foreground">{featuredPosts[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{featuredPosts[0].author}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {featuredPosts[0].date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featuredPosts[0].readTime}</span>
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                      Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          <div className="mx-auto mt-12 max-w-2xl">
            <FilterBar
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onSearchChange={setSearchQuery}
              onSortChange={setSortBy}
              onReset={() => { setActiveCategory('all'); setSearchQuery(''); setSortBy('date') }}
              searchPlaceholder="Search articles..."
              sortOptions={blogSortOptions}
              defaultSort="date"
            />
          </div>

          {regularPosts.length > 0 && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {regularPosts.map((p) => (
                <motion.div key={p.slug} variants={item}>
                  <Link to={`/blog/${p.slug}`}>
                    <BlogCard
                      slug={p.slug}
                      title={p.title}
                      excerpt={p.excerpt}
                      category={p.category}
                      author={p.author}
                      readTime={p.readTime}
                      date={p.date}
                      featured={p.featured}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium">No articles found</p>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
              <Button
                variant="link"
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); setSortBy('date') }}
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
