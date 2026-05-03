import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { getServices } from '@/services'
import type { Service } from '@/schemas'
import { SectionHeading, ServiceCard } from '@/components/common'
import { Button } from '@/components/ui/button'

const iconMap: Record<string, React.ReactNode> = {
  Dumbbell: <Icons.Dumbbell className="h-6 w-6" />,
  Activity: <Icons.Activity className="h-6 w-6" />,
  Zap: <Icons.Zap className="h-6 w-6" />,
  StretchHorizontal: <Icons.StretchHorizontal className="h-6 w-6" />,
  Hand: <Icons.Hand className="h-6 w-6" />,
  Apple: <Icons.Apple className="h-6 w-6" />,
  Target: <Icons.Target className="h-6 w-6" />,
  Brain: <Icons.Brain className="h-6 w-6" />,
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    getServices().then(setServices)
  }, [])

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="What We Offer"
          title="Our Services"
          subtitle="Expert-led programmes designed for every goal and fitness level."
          align="center"
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s) => (
            <motion.div key={s.id} variants={item}>
              <ServiceCard
                slug={s.slug}
                icon={iconMap[s.icon] || <Icons.Activity className="h-6 w-6" />}
                name={s.name}
                category={s.category}
                description={s.description}
                priceFrom={s.priceFrom}
                popular={s.popular}
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Button asChild variant="outline">
            <Link to={ROUTES.SERVICES}>View All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
