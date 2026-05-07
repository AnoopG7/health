import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { getDietPlanBySlug } from '@/services'
import type { DietPlan } from '@/schemas/diet-plans'
import { PageMeta, SectionHeading, PlaceholderImage, PageSkeleton, Breadcrumb } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { Check } from 'lucide-react'

const mealTypeLabels: Record<string, string> = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Snack' }

export default function DietPlanDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [plan, setPlan] = useState<DietPlan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getDietPlanBySlug(slug).then((p) => {
      setPlan(p ?? null)
      setLoading(false)
    })
  }, [slug])

  if (loading) return <PageSkeleton />
  if (!plan) return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold">Diet Plan Not Found</h2>
        <p className="mb-6 text-muted-foreground">The diet plan you're looking for doesn't exist.</p>
        <Button asChild><Link to={ROUTES.DIET_PLANS}>Back to Diet Plans</Link></Button>
      </div>
    </section>
  )

  return (
    <>
      <PageMeta title={`${plan.name} — VitalEdge`} description={plan.description} />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[
            { label: 'Home', href: ROUTES.HOME },
            { label: 'Diet Plans', href: ROUTES.DIET_PLANS },
            { label: plan.name },
          ]} />

          <div className="mb-12 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PlaceholderImage type="banner" text={plan.name} className="mb-6 aspect-video w-full rounded-xl" />
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">{plan.name}</h1>
              <p className="mb-6 text-muted-foreground">{plan.longDescription}</p>

              <SectionHeading title="Daily Macros" align="left" />
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {(() => {
                  const totals = plan.sampleMeals.reduce(
                    (acc, m) => ({ protein: acc.protein + m.protein, carbs: acc.carbs + m.carbs, fat: acc.fat + m.fat }),
                    { protein: 0, carbs: 0, fat: 0 },
                  )
                  const total = totals.protein + totals.carbs + totals.fat || 1
                  return [
                    { label: 'Protein', value: Math.round((totals.protein / total) * 100), color: '[&>div]:bg-primary' },
                    { label: 'Carbs', value: Math.round((totals.carbs / total) * 100), color: '[&>div]:bg-secondary' },
                    { label: 'Fat', value: Math.round((totals.fat / total) * 100), color: '[&>div]:bg-amber-500' },
                  ].map((m) => (
                    <Card key={m.label}>
                      <CardContent className="p-4 text-center">
                        <div className="mb-2 font-semibold">{m.label}</div>
                        <div className="mb-2 text-2xl font-bold">{m.value}%</div>
                        <Progress value={m.value} className={`h-2 ${m.color}`} />
                      </CardContent>
                    </Card>
                  ))
                })()}
              </div>

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
                  <div className="mb-6 space-y-2">
                    <h4 className="text-sm font-semibold">What's Included</h4>
                    {['Personalised meal plan', 'Weekly macro adjustments', 'Dietitian support', 'Shopping list'].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-secondary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full" size="lg"><Link to={`/book/${plan.slug}`}>Get This Plan</Link></Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
