import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ROUTES } from '@/constants/routes'
import { getFeaturedPosts } from '@/services'
import type { BlogPost } from '@/schemas'
import { SectionHeading, BlogCard } from '@/components/common'
import { Button } from '@/components/ui/button'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    getFeaturedPosts().then(setPosts)
  }, [])

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="Latest Articles"
          title="From Our Blog"
          subtitle="Expert advice, training tips, and wellness insights."
          align="center"
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {posts.slice(0, 3).map((p) => (
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Button asChild variant="outline">
            <Link to={ROUTES.BLOG}>Read More</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
