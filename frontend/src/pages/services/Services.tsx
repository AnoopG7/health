import { useEffect, useState } from 'react'
import { getServices, getServiceCategories } from '@/services'
import type { Service } from '@/schemas/services'
import { PageMeta, SectionHeading, ServiceCard, FilterBar } from '@/components/common'
import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'

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
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    getServices().then(setServices)
    getServiceCategories().then((cats) =>
      setCategories([{ label: 'All', value: 'all' }, ...cats.map((c) => ({ label: c, value: c.toLowerCase() }))]),
    )
  }, [])

  let filtered = activeCategory === 'all' ? services : services.filter((s) => s.category.toLowerCase() === activeCategory)
  if (searchQuery) filtered = filtered.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase()))

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.priceFrom - b.priceFrom
    if (sortBy === 'price-high') return b.priceFrom - a.priceFrom
    return a.name.localeCompare(b.name)
  })

  return (
    <>
      <PageMeta title="Services — VitalEdge" description="Explore our full range of fitness, recovery, and wellness services." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Our Services" title="What We Offer" subtitle="Expert-led programmes for every goal and fitness level." align="center" />
          <div className="mx-auto mt-8 max-w-2xl">
            <FilterBar
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onSearchChange={setSearchQuery}
              onSortChange={setSortBy}
              onReset={() => { setActiveCategory('all'); setSearchQuery('') }}
              searchPlaceholder="Search services..."
            />
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-medium">No services found</p>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((s) => (
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
          )}
        </div>
      </section>
    </>
  )
}
