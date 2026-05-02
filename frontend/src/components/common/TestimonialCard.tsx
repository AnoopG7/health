import { Card, CardContent } from '@/components/ui/card'
import StarRating from '@/components/common/StarRating'
import { cn } from '@/lib/utils'

interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  service: string
  rating: number
  className?: string
}

export default function TestimonialCard({
  quote,
  name,
  role,
  service,
  rating,
  className,
}: TestimonialCardProps) {
  const initials = name.split(' ').map((n) => n[0]).join('')

  return (
    <Card className={cn('h-full', className)}>
      <CardContent className="p-6">
        <div className="mb-1 flex">
          <StarRating rating={rating} size="sm" />
        </div>
        <blockquote className="mb-4 text-sm italic text-muted-foreground">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">
              {role} &middot; {service}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
