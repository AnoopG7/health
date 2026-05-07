import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { getBlogPostBySlug, getBlogPosts } from '@/services'
import type { BlogPost } from '@/schemas/blog'
import { PageMeta, PageSkeleton, Breadcrumb, BlogCard, SectionHeading, PlaceholderImage } from '@/components/common'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [related, setRelated] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getBlogPostBySlug(slug).then((p) => {
      setPost(p ?? null)
      if (p) getBlogPosts().then((all) => setRelated(all.filter((r) => r.category === p.category && r.slug !== p.slug).slice(0, 3)))
      setLoading(false)
    })
  }, [slug])

  if (loading) return <PageSkeleton />
  if (!post) return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold">Article Not Found</h2>
        <p className="mb-6 text-muted-foreground">The article you're looking for doesn't exist.</p>
        <Link to={ROUTES.BLOG} className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    </section>
  )

  return (
    <>
      <PageMeta title={`${post.title} — VitalEdge`} description={post.excerpt} />
      <article className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Breadcrumb items={[
              { label: 'Home', href: ROUTES.HOME },
              { label: 'Blog', href: ROUTES.BLOG },
              { label: post.title },
            ]} />

            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            <h1 className="mb-4 text-3xl font-bold md:text-5xl">{post.title}</h1>
            <div className="mb-8 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime} read</span>
            </div>
            <PlaceholderImage type="banner" text={post.title} className="mb-8 aspect-video w-full rounded-xl" />
            <div className="prose prose-lg max-w-none text-muted-foreground">
              {post.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16 border-t pt-16">
              <SectionHeading title="Related Articles" align="left" />
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} to={`/blog/${r.slug}`}>
                    <BlogCard
                      slug={r.slug}
                      title={r.title}
                      excerpt={r.excerpt}
                      category={r.category}
                      author={r.author}
                      readTime={r.readTime}
                      date={r.date}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
