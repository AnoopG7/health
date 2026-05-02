import { Star, StarHalf } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  className?: string
}

export default function StarRating({
  rating,
  size = 'md',
  showValue = false,
  className,
}: StarRatingProps) {
  const iconSizes = { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-5 w-5' }
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.3
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className={cn('fill-primary text-primary', iconSizes[size])} />
        ))}
        {hasHalf && (
          <StarHalf className={cn('fill-primary text-primary', iconSizes[size])} />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className={cn('text-muted-foreground/30', iconSizes[size])} />
        ))}
      </div>
      {showValue && (
        <span className="ml-1 text-sm font-medium text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
