import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PricingTier {
  name: string
  price: number
  period: string
  features: { label: string; included: boolean }[]
  cta: string
  popular?: boolean
}

interface PricingCardProps {
  tier: PricingTier
  className?: string
}

export default function PricingCard({ tier, className }: PricingCardProps) {
  return (
    <Card
      className={cn(
        'relative flex flex-col transition-all',
        tier.popular && 'border-primary shadow-lg ring-1 ring-primary/20',
        className,
      )}
    >
      {tier.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
          Most Popular
        </Badge>
      )}
      <CardContent className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold">{tier.name}</h3>
        <div className="mt-4 mb-6">
          <span className="text-4xl font-bold">${tier.price}</span>
          <span className="text-muted-foreground">/{tier.period}</span>
        </div>
        <ul className="mb-6 flex-1 space-y-3">
          {tier.features.map((feature) => (
            <li key={feature.label} className="flex items-center gap-2 text-sm">
              {feature.included ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground/40" />
              )}
              <span className={cn(feature.included ? 'text-foreground' : 'text-muted-foreground/60')}>
                {feature.label}
              </span>
            </li>
          ))}
        </ul>
        <Button
          variant={tier.popular ? 'default' : 'outline'}
          className="w-full"
        >
          {tier.cta}
        </Button>
      </CardContent>
    </Card>
  )
}
