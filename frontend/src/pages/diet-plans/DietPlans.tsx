import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDietPlans } from '@/services'
import type { DietPlan } from '@/schemas/diet-plans'
import { PageMeta, SectionHeading, PlaceholderImage } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function DietPlans() {
  const [plans, setPlans] = useState<DietPlan[]>([])
  useEffect(() => { getDietPlans().then(setPlans) }, [])

  return (
    <>
      <PageMeta title="Diet Plans — VitalEdge" description="Personalised nutrition plans for every goal and dietary preference." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Nutrition" title="Diet Plans" subtitle="Science-backed meal plans tailored to your goals." align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <Link key={p.id} to={`/diet-plans/${p.slug}`}>
                <Card className="card-hover h-full overflow-hidden">
                  <PlaceholderImage type="thumbnail" text={p.name} className="aspect-video w-full" />
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant="secondary">{p.goal}</Badge>
                      <Badge variant="outline">{p.dietaryType}</Badge>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">{p.name}</h3>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{p.caloriesPerDay} cal/day · {p.mealsPerDay} meals</span>
                      <span className="font-semibold text-primary">${p.price}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
