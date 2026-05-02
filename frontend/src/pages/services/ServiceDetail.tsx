import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { getServiceBySlug, getServices } from '@/services'
import type { Service } from '@/schemas/services'
import { PageMeta, SectionHeading, PlaceholderImage } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import * as Icons from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  Dumbbell: <Icons.Dumbbell className="h-5 w-5" />,
  Activity: <Icons.Activity className="h-5 w-5" />,
  Zap: <Icons.Zap className="h-5 w-5" />,
  StretchHorizontal: <Icons.StretchHorizontal className="h-5 w-5" />,
  Hand: <Icons.Hand className="h-5 w-5" />,
  Apple: <Icons.Apple className="h-5 w-5" />,
  Target: <Icons.Target className="h-5 w-5" />,
  Brain: <Icons.Brain className="h-5 w-5" />,
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [service, setService] = useState<Service | null>(null)
  const [related, setRelated] = useState<Service[]>([])

  useEffect(() => {
    if (!slug) return
    getServiceBySlug(slug).then((s) => {
      setService(s ?? null)
      if (s) getServices().then((all) => setRelated(all.filter((r) => r.category === s.category && r.slug !== s.slug).slice(0, 3)))
    })
  }, [slug])

  if (!service) return <div className="py-20 text-center">Loading...</div>

  return (
    <>
      <PageMeta title={`${service.name} — VitalEdge`} description={service.description} />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 grid gap-8 lg:grid-cols-2">
            <PlaceholderImage type="banner" text={service.name} className="aspect-video w-full rounded-xl" />
            <div>
              <Badge variant="secondary" className="mb-4">{service.category}</Badge>
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">{service.name}</h1>
              <p className="mb-6 text-muted-foreground">{service.longDescription}</p>
              <div className="mb-6 flex items-center gap-4">
                <span className="text-2xl font-bold text-primary">${service.priceFrom}</span>
                <span className="text-muted-foreground">/ {service.duration}</span>
              </div>
              <div className="flex gap-4">
                <Button asChild size="lg"><Link to={`/book/${service.slug}`}>Book Now</Link></Button>
                <Button asChild variant="outline" size="lg"><Link to={ROUTES.SERVICES}>Back to Services</Link></Button>
              </div>
            </div>
          </div>

          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="mb-6 text-2xl font-semibold">What's Included</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {service.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Icons.Check className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {related.length > 0 && (
            <>
              <SectionHeading title="Related Services" subtitle="You might also be interested in" align="left" />
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.id} to={`/services/${r.slug}`}>
                    <Card className="card-hover h-full">
                      <CardContent className="p-6">
                        <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2 text-primary">{iconMap[r.icon]}</div>
                        <h3 className="mb-1 font-semibold">{r.name}</h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
