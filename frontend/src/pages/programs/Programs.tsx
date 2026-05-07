import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getPrograms } from '@/services'
import type { Program } from '@/schemas/programs'
import { PageMeta, SectionHeading, ProgramCard } from '@/components/common'
import { Dumbbell } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([])
  useEffect(() => { getPrograms().then(setPrograms) }, [])

  return (
    <>
      <PageMeta title="Programs — VitalEdge" description="Structured training programmes for every level and goal." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Programmes" title="Structured Training" subtitle="Multi-week programmes designed for real results." align="center" />

          {programs.length === 0 ? (
            <div className="py-20 text-center">
              <Dumbbell className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg font-medium">No programmes available</p>
              <p className="mt-2 text-sm text-muted-foreground">New programmes are added regularly. Check back soon!</p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {programs.map((p) => (
                <motion.div key={p.slug} variants={item}>
                  <Link to={`/programs/${p.slug}`}>
                    <ProgramCard slug={p.slug} name={p.name} description={p.description} duration={p.duration} level={p.level} price={p.price} />
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
