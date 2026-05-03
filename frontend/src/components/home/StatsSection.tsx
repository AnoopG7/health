import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 500, label: 'Active Clients', suffix: '+', delay: 0.1 },
  { value: 1200, label: 'Sessions Completed', suffix: '+', delay: 0.2 },
  { value: 4.9, label: 'Average Rating', suffix: '/5', delay: 0.3 },
  { value: 98, label: 'Success Rate', suffix: '%', delay: 0.4 },
]

function AnimatedValue({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const start = Date.now()
    const target = Math.floor(value)
    const isDecimal = value % 1 !== 0
    const animate = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(isDecimal ? +(target * eased).toFixed(1) : Math.floor(target * eased))
      if (progress < 1) requestAnimationFrame(animate)
    }
    const timer = setTimeout(animate, delay * 1000)
    return () => clearTimeout(timer)
  }, [isInView, value, delay])

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay }}
        className="text-4xl font-bold tracking-tight text-primary md:text-5xl"
      >
        {displayValue}
        {suffix}
      </motion.div>
      <p className="mt-2 text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="border-b py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedValue key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
