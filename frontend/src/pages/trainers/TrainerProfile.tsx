import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTrainerBySlug, getTrainerReviews } from '@/services'
import type { Trainer, TrainerReview } from '@/schemas/trainers'
import { PageMeta, SectionHeading, PlaceholderImage, StarRating } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function TrainerProfile() {
  const { slug } = useParams<{ slug: string }>()
  const [trainer, setTrainer] = useState<Trainer | null>(null)
  const [reviews, setReviews] = useState<TrainerReview[]>([])

  useEffect(() => {
    if (!slug) return
    getTrainerBySlug(slug).then((t) => {
      setTrainer(t ?? null)
      if (t) setReviews(getTrainerReviews(t.id))
    })
  }, [slug])

  if (!trainer) return <div className="py-20 text-center">Loading...</div>

  return (
    <>
      <PageMeta title={`${trainer.name} — VitalEdge`} description={trainer.bio} />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <PlaceholderImage type="avatar" text={trainer.name} className="mx-auto aspect-square w-64 rounded-full" />
            </div>
            <div className="lg:col-span-2">
              <Badge variant="secondary" className="mb-4">{trainer.title}</Badge>
              <h1 className="mb-2 text-3xl font-bold md:text-4xl">{trainer.name}</h1>
              <div className="mb-4 flex items-center gap-2">
                <StarRating rating={trainer.rating} size="md" showValue />
                <span className="text-sm text-muted-foreground">({trainer.reviewCount} reviews)</span>
              </div>
              <p className="mb-6 text-muted-foreground">{trainer.bio}</p>
              <div className="mb-6 grid grid-cols-2 gap-4">
                <Card><CardContent className="p-4"><span className="text-sm text-muted-foreground">Experience</span><p className="font-semibold">{trainer.experience}</p></CardContent></Card>
                <Card><CardContent className="p-4"><span className="text-sm text-muted-foreground">Starting From</span><p className="font-semibold">${trainer.priceFrom}/session</p></CardContent></Card>
              </div>
              <Button asChild size="lg"><Link to={`/book/${trainer.slug}`}>Book with {trainer.name.split(' ')[0]}</Link></Button>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {trainer.specialties.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Certifications</h2>
                <ul className="space-y-2">
                  {trainer.certifications.map((c) => <li key={c} className="flex items-center gap-2 text-sm"><span className="h-1.5 w-1.5 rounded-full bg-secondary" />{c}</li>)}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <SectionHeading title="Client Reviews" align="left" />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {reviews.map((r) => (
                <Card key={r.id}>
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <StarRating rating={r.rating} size="sm" showValue />
                      <span className="text-sm text-muted-foreground">{r.date}</span>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">{r.comment}</p>
                    <p className="font-medium">{r.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
