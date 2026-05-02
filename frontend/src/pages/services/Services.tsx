import { useEffect, useState } from 'react'
import { getServices, getServiceCategories } from '@/services'
import type { Service } from '@/schemas/services'
import { PageMeta, SectionHeading, ServiceCard, FilterBar } from '@/components/common'
import * as Icons from 'lucide-react'

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

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([])
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    getServices().then(setServices)
    getServiceCategories().then((cats) =>
      setCategories([{ label: 'All', value: 'all' }, ...cats.map((c) => ({ label: c, value: c.toLowerCase() }))]),
    )
  }, [])

  const filtered = activeCategory === 'all' ? services : services.filter((s) => s.category.toLowerCase() === activeCategory)

  return (
    <>
      <PageMeta title="Services — VitalEdge" description="Explore our full range of fitness, recovery, and wellness services." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Our Services" title="What We Offer" subtitle="Expert-led programmes for every goal and fitness level." align="center" />
          <div className="mx-auto mt-8 max-w-2xl">
            <FilterBar categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} onSearchChange={() => {}} onSortChange={() => {}} onReset={() => setActiveCategory('all')} searchPlaceholder="Search services..." />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <ServiceCard key={s.id} slug={s.slug} icon={iconMap[s.icon] || <Icons.Activity className="h-6 w-6" />} name={s.name} category={s.category} description={s.description} priceFrom={s.priceFrom} popular={s.popular} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
