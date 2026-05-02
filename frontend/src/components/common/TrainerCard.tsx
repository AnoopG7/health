import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StarRating from '@/components/common/StarRating'
import PlaceholderImage from '@/components/common/PlaceholderImage'
import { cn } from '@/lib/utils'

interface TrainerCardProps {
  id: string
  name: string
  title: string
  rating: number
  reviewCount: number
  specialties: string[]
  priceFrom: number
  className?: string
}

export default function TrainerCard({
  id,
  name,
  title,
  rating,
  reviewCount,
  specialties,
  priceFrom,
  className,
}: TrainerCardProps) {
  const initials = name.split(' ').map((n) => n[0]).join('')

  return (
    <Card className={cn('card-hover group', className)}>
      <CardContent className="p-6">
        <div className="mb-4 flex items-start gap-4">
          <PlaceholderImage type="avatar" text={initials} />
          <div className="flex-1">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{title}</p>
            <StarRating rating={rating} size="sm" showValue className="mt-1" />
            <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {specialties.slice(0, 3).map((spec) => (
            <Badge key={spec} variant="secondary" className="text-xs">
              {spec}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-sm font-medium text-muted-foreground">
            From ${priceFrom}/session
          </span>
          <Link
            to={`/trainers/${id}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
          >
            View Profile
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
