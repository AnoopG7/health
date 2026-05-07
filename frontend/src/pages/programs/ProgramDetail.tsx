import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { getProgramBySlug, getPrograms } from '@/services'
import type { Program } from '@/schemas/programs'
import { PageMeta, SectionHeading, PlaceholderImage, ProgressBadge, PageSkeleton, Breadcrumb } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function ProgramDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [program, setProgram] = useState<Program | null>(null)
  const [related, setRelated] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getProgramBySlug(slug).then((p) => {
      setProgram(p ?? null)
      if (p) getPrograms().then((all) => setRelated(all.filter((r) => r.level === p.level && r.slug !== p.slug).slice(0, 3)))
      setLoading(false)
    })
  }, [slug])

  if (loading) return <PageSkeleton />
  if (!program) return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold">Program Not Found</h2>
        <p className="mb-6 text-muted-foreground">The program you're looking for doesn't exist.</p>
        <Button asChild><Link to={ROUTES.PROGRAMS}>Back to Programs</Link></Button>
      </div>
    </section>
  )

  const spotsLeft = program.maxParticipants - program.participants
  const fillPercentage = (program.participants / program.maxParticipants) * 100

  return (
    <>
      <PageMeta title={`${program.name} — VitalEdge`} description={program.description} />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[
            { label: 'Home', href: ROUTES.HOME },
            { label: 'Programs', href: ROUTES.PROGRAMS },
            { label: program.name },
          ]} />

          <div className="mb-12 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PlaceholderImage type="banner" text={program.name} className="mb-6 aspect-video w-full rounded-xl" />
              <h1 className="mb-4 text-3xl font-bold md:text-4xl">{program.name}</h1>
              <p className="mb-6 text-muted-foreground">{program.longDescription}</p>

              <SectionHeading title="Programme Modules" align="left" />
              <div className="mt-8 space-y-4">
                {program.modules.map((m, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">Week {m.week}: {m.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                        </div>
                        <Badge variant="secondary">{m.duration}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <ProgressBadge level={program.level} />
                    <Badge variant="outline">{program.duration}</Badge>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-primary">${program.price}</span>
                    <span className="ml-1 text-muted-foreground">total</span>
                  </div>
                  <div className="mb-4 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Trainer</span><span>{program.trainerName}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Enrolled</span><span>{program.participants}/{program.maxParticipants}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Spots left</span><span className="font-medium text-primary">{spotsLeft}</span></div>
                  </div>
                  <div className="mb-4">
                    <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                      <span>Capacity</span><span>{Math.round(fillPercentage)}%</span>
                    </div>
                    <Progress value={fillPercentage} className="h-2" />
                  </div>
                  <Button asChild className="w-full" size="lg"><Link to={`/book/${program.slug}`}>Enrol Now</Link></Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-12 border-t pt-12">
              <SectionHeading title="Similar Programs" subtitle="You might also like" align="left" />
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} to={`/programs/${r.slug}`}>
                    <Card className="card-hover h-full">
                      <CardContent className="p-6">
                        <ProgressBadge level={r.level} />
                        <h3 className="mt-3 mb-1 font-semibold">{r.name}</h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
