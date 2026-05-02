import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import PlaceholderImage from '@/components/common/PlaceholderImage'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  readTime: string
  date: string
  featured?: boolean
  className?: string
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  category,
  author,
  readTime,
  date,
  featured,
  className,
}: BlogCardProps) {
  return (
    <Card className={cn('card-hover group flex flex-col overflow-hidden', className)}>
      <PlaceholderImage type="thumbnail" text={category} />
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <Badge variant="secondary">{category}</Badge>
          {featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
        </div>
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 line-clamp-3 flex-1 text-sm text-muted-foreground">{excerpt}</p>
        <div className="mb-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{author}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readTime}
          </span>
          <span>{date}</span>
        </div>
        <Link
          to={`/blog/${slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  )
}
