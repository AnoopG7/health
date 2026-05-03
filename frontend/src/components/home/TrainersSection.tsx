import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { getTopRatedTrainers } from '@/services'
import type { Trainer } from '@/schemas'
import { SectionHeading, TrainerCard } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

export default function TrainersSection() {
  const [trainers, setTrainers] = useState<Trainer[]>([])

  useEffect(() => {
    getTopRatedTrainers(10).then(setTrainers)
  }, [])

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="Meet The Team"
          title="Expert Trainers"
          subtitle="Certified professionals dedicated to your success."
          align="center"
        />
        <Carousel
          opts={{ loop: true, align: 'start' }}
          className="mt-12 w-full"
        >
          <CarouselContent className="-ml-4">
            {trainers.map((t) => (
              <CarouselItem key={t.id} className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <TrainerCard
                  id={t.id}
                  name={t.name}
                  title={t.title}
                  rating={t.rating}
                  reviewCount={t.reviewCount}
                  specialties={t.specialties}
                  priceFrom={t.priceFrom}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-3 sm:-left-12" />
          <CarouselNext className="-right-3 sm:-right-12" />
        </Carousel>
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link to={ROUTES.TRAINERS}>Meet All Trainers</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
