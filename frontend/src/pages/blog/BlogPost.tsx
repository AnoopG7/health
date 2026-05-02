import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogPostBySlug, getBlogPosts } from '@/services'
import type { BlogPost } from '@/schemas/blog'
import { PageMeta, SectionHeading, PlaceholderImage } from '@/components/common'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [related, setRelated] = useState<BlogPost[]>([])

  useEffect(() => {
    if (!slug) return
    getBlogPostBySlug(slug).then((p) => {
      setPost(p ?? null)
      if (p) getBlogPosts().then((all) => setRelated(all.filter((r) => r.category === p.category && r.slug !== p.slug).slice(0, 3)))
    })
  }, [slug])

  if (!post) return <div className="py-20 text-center">Loading...</div>

  return (
    <>
      <PageMeta title={`${post.title} — VitalEdge`} description={post.excerpt} />
      <article className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            <h1 className="mb-4 text-3xl font-bold md:text-5xl">{post.title}</h1>
            <div className="mb-8 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.author}</span><span>·</span><span>{post.date}</span><span>·</span><span>{post.readTime} read</span>
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
                    <Card className="card-hover h-full">
                      <CardContent className="p-6">
                        <Badge variant="secondary" className="mb-2">{r.category}</Badge>
                        <h3 className="mb-2 font-semibold">{r.title}</h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">{r.excerpt}</p>
                      </CardContent>
                    </Card>
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
