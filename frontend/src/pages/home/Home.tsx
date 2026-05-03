import { PageMeta } from '@/components/common'
import {
  HeroSection,
  StatsSection,
  ServicesSection,
  TrainersSection,
  BlogSection,
  TestimonialsSection,
  PricingSection,
} from '@/components/home'

export default function Home() {
  return (
    <>
      <PageMeta title="VitalEdge — Premium Health & Fitness" description="Transform your body and mind with expert coaching, personalised programmes, and a supportive community." />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <TrainersSection />
      <BlogSection />
      <TestimonialsSection />
      <PricingSection />
    </>
  )
}
