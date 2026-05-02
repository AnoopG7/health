import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ProgressBadge from '@/components/common/ProgressBadge'
import PlaceholderImage from '@/components/common/PlaceholderImage'
import { cn } from '@/lib/utils'

interface ProgramCardProps {
  slug: string
  name: string
  description: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  price: number
  className?: string
}

export default function ProgramCard({
  slug,
  name,
  description,
  duration,
  level,
  price,
  className,
}: ProgramCardProps) {
  return (
    <Card className={cn('card-hover group flex flex-col overflow-hidden', className)}>
      <PlaceholderImage type="banner" text={name} />
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <ProgressBadge level={level} />
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {duration}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-semibold">{name}</h3>
        <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${price}</span>
          <Link
            to={`/programs/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
          >
            Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
