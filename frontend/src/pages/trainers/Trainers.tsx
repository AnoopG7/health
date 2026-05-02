import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTrainers } from '@/services'
import type { Trainer } from '@/schemas/trainers'
import { PageMeta, SectionHeading, TrainerCard } from '@/components/common'

export default function Trainers() {
  const [trainers, setTrainers] = useState<Trainer[]>([])

  useEffect(() => {
    getTrainers().then(setTrainers)
  }, [])

  return (
    <>
      <PageMeta title="Trainers — VitalEdge" description="Meet our certified fitness professionals and rehabilitation specialists." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Our Team" title="Expert Trainers" subtitle="Certified professionals dedicated to your success." align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trainers.map((t) => (
              <Link key={t.id} to={`/trainers/${t.slug}`}>
                <TrainerCard id={t.id} name={t.name} title={t.title} rating={t.rating} reviewCount={t.reviewCount} specialties={t.specialties} priceFrom={t.priceFrom} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
