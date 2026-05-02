import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { getPopularServices, getTopRatedTrainers, getFeaturedPosts, getRandomTestimonials, getPricingTiers } from '@/services'
import type { Service, Trainer, BlogPost, Testimonial, PricingTier } from '@/schemas'
import { PageMeta, SectionHeading, ServiceCard, TrainerCard, BlogCard, TestimonialCard, PricingCard, StatCard } from '@/components/common'
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

export default function Home() {
  const [services, setServices] = useState<Service[]>([])
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [pricing, setPricing] = useState<PricingTier[]>([])

  useEffect(() => {
    getPopularServices().then(setServices)
    getTopRatedTrainers(4).then(setTrainers)
    getFeaturedPosts().then(setPosts)
    getRandomTestimonials(4).then(setTestimonials)
    getPricingTiers().then(setPricing)
  }, [])

  return (
    <>
      <PageMeta title="VitalEdge — Premium Health & Fitness" description="Transform your body and mind with expert coaching, personalised programmes, and a supportive community." />

      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Your Edge Starts{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Here
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Expert coaching, personalised programmes, and a community that pushes you further.
            Transform your body, recover smarter, and perform at your peak.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link to={ROUTES.SERVICES}>Explore Services</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to={ROUTES.SHOWCASE}>Book a Session</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <StatCard icon={<Icons.Users className="h-6 w-6" />} value={500} label="Active Clients" suffix="+" />
            <StatCard icon={<Icons.Dumbbell className="h-6 w-6" />} value={1200} label="Sessions Completed" suffix="+" />
            <StatCard icon={<Icons.Star className="h-6 w-6" />} value={4.9} label="Average Rating" suffix="/5" />
            <StatCard icon={<Icons.Trophy className="h-6 w-6" />} value={98} label="Success Rate" suffix="%" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="What We Offer" title="Our Services" subtitle="Expert-led programmes designed for every goal and fitness level." align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.id} slug={s.slug} icon={iconMap[s.icon] || <Icons.Activity className="h-6 w-6" />} name={s.name} category={s.category} description={s.description} priceFrom={s.priceFrom} popular={s.popular} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to={ROUTES.SERVICES}>View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Meet The Team" title="Expert Trainers" subtitle="Certified professionals dedicated to your success." align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trainers.map((t) => (
              <TrainerCard key={t.id} id={t.id} name={t.name} title={t.title} rating={t.rating} reviewCount={t.reviewCount} specialties={t.specialties} priceFrom={t.priceFrom} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to={ROUTES.TRAINERS}>Meet All Trainers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Latest Articles" title="From Our Blog" subtitle="Expert advice, training tips, and wellness insights." align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`}>
                <BlogCard slug={p.slug} title={p.title} excerpt={p.excerpt} category={p.category} author={p.author} readTime={p.readTime} date={p.date} featured={p.featured} />
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link to={ROUTES.BLOG}>Read More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Client Stories" title="What People Say" subtitle="Real results from real people." align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} quote={t.quote} name={t.name} role={t.role} service={t.service} rating={t.rating} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Simple Pricing" title="Choose Your Plan" subtitle="Flexible options to fit your goals and budget." align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pricing.map((p) => <PricingCard key={p.name} tier={p} />)}
          </div>
        </div>
      </section>
    </>
  )
}
