import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getPricingTiers } from '@/services'
import type { PricingTier } from '@/schemas'
import { SectionHeading, PricingCard } from '@/components/common'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function PricingSection() {
  const [pricing, setPricing] = useState<PricingTier[]>([])

  useEffect(() => {
    getPricingTiers().then(setPricing)
  }, [])

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="Simple Pricing"
          title="Choose Your Plan"
          subtitle="Flexible options to fit your goals and budget."
          align="center"
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {pricing.map((p) => (
            <motion.div key={p.name} variants={item}>
              <PricingCard tier={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
