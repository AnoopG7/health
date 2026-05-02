import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPrograms } from '@/services'
import type { Program } from '@/schemas/programs'
import { PageMeta, SectionHeading, ProgramCard } from '@/components/common'

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([])
  useEffect(() => { getPrograms().then(setPrograms) }, [])

  return (
    <>
      <PageMeta title="Programs — VitalEdge" description="Structured training programmes for every level and goal." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Programmes" title="Structured Training" subtitle="Multi-week programmes designed for real results." align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <Link key={p.slug} to={`/programs/${p.slug}`}>
                <ProgramCard slug={p.slug} name={p.name} description={p.description} duration={p.duration} level={p.level} price={p.price} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
