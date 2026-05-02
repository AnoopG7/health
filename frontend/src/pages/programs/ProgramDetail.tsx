import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProgramBySlug } from '@/services'
import type { Program } from '@/schemas/programs'
import { PageMeta, SectionHeading, PlaceholderImage, ProgressBadge } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function ProgramDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [program, setProgram] = useState<Program | null>(null)
  useEffect(() => { if (slug) getProgramBySlug(slug).then((p) => setProgram(p ?? null)) }, [slug])

  if (!program) return <div className="py-20 text-center">Loading...</div>

  const spotsLeft = program.maxParticipants - program.participants

  return (
    <>
      <PageMeta title={`${program.name} — VitalEdge`} description={program.description} />
      <section className="py-20">
        <div className="container mx-auto px-4">
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
                  <Button asChild className="w-full" size="lg">Enrol Now</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
