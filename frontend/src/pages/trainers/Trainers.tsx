import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getTrainers } from '@/services'
import type { Trainer } from '@/schemas/trainers'
import { PageMeta, SectionHeading, TrainerCard } from '@/components/common'
import { Users } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

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

          {trainers.length === 0 ? (
            <div className="py-20 text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg font-medium">No trainers available</p>
              <p className="mt-2 text-sm text-muted-foreground">Check back later for new team members.</p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {trainers.map((t) => (
                <motion.div key={t.id} variants={item}>
                  <Link to={`/trainers/${t.slug}`}>
                    <TrainerCard id={t.id} name={t.name} title={t.title} rating={t.rating} reviewCount={t.reviewCount} specialties={t.specialties} priceFrom={t.priceFrom} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
