import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getRandomTestimonials } from '@/services'
import type { Testimonial } from '@/schemas'
import { SectionHeading, TestimonialCard } from '@/components/common'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    getRandomTestimonials(4).then(setTestimonials)
  }, [])

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="Client Stories"
          title="What People Say"
          subtitle="Real results from real people."
          align="center"
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {testimonials.map((t) => (
            <motion.div key={t.id} variants={item}>
              <TestimonialCard
                quote={t.quote}
                name={t.name}
                role={t.role}
                service={t.service}
                rating={t.rating}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
