import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDietPlanBySlug } from '@/services'
import type { DietPlan } from '@/schemas/diet-plans'
import { PageMeta, SectionHeading, PlaceholderImage } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const mealTypeLabels: Record<string, string> = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Snack' }

export default function DietPlanDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [plan, setPlan] = useState<DietPlan | null>(null)
  useEffect(() => { if (slug) getDietPlanBySlug(slug).then((p) => setPlan(p ?? null)) }, [slug])

  if (!plan) return <div className="py-20 text-center">Loading...</div>

  return (
    <>
      <PageMeta title={`${plan.name} — VitalEdge`} description={plan.description} />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PlaceholderImage type="banner" text={plan.name} className="mb-6 aspect-video w-full rounded-xl" />
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">{plan.name}</h1>
              <p className="mb-6 text-muted-foreground">{plan.longDescription}</p>

              <SectionHeading title="Sample Day" align="left" />
              <Card className="mt-8">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow><TableHead>Meal</TableHead><TableHead>Name</TableHead><TableHead className="text-right">Calories</TableHead><TableHead className="text-right">Protein</TableHead><TableHead className="text-right">Carbs</TableHead><TableHead className="text-right">Fat</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                      {plan.sampleMeals.map((m, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{mealTypeLabels[m.mealType]}</TableCell>
                          <TableCell>{m.name}</TableCell>
                          <TableCell className="text-right">{m.calories}</TableCell>
                          <TableCell className="text-right">{m.protein}g</TableCell>
                          <TableCell className="text-right">{m.carbs}g</TableCell>
                          <TableCell className="text-right">{m.fat}g</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">{plan.goal}</Badge>
                    <Badge variant="outline">{plan.dietaryType}</Badge>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-primary">${plan.price}</span>
                    <span className="ml-1 text-muted-foreground">/ {plan.duration}</span>
                  </div>
                  <div className="mb-4 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Calories</span><span>{plan.caloriesPerDay}/day</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Meals</span><span>{plan.mealsPerDay}/day</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span>{plan.duration}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Coach</span><span>{plan.trainerName}</span></div>
                  </div>
                  <Button className="w-full" size="lg">Get This Plan</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
