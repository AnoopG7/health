import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  slug: string
  icon: React.ReactNode
  name: string
  category: string
  description: string
  priceFrom: number
  popular?: boolean
  className?: string
}

export default function ServiceCard({
  slug,
  icon,
  name,
  category,
  description,
  priceFrom,
  popular,
  className,
}: ServiceCardProps) {
  return (
    <Card className={cn('card-hover group relative overflow-hidden', className)}>
      {popular && (
        <Badge className="absolute right-3 top-3 bg-primary text-primary-foreground">
          Popular
        </Badge>
      )}
      <CardContent className="p-6">
        <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <Badge variant="secondary" className="mb-2">
          {category}
        </Badge>
        <h3 className="mb-2 text-xl font-semibold">{name}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            From ${priceFrom}
          </span>
          <Link
            to={`/services/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
          >
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
