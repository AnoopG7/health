import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { getPricingTiers, getFaqs } from '@/services'
import type { PricingTier } from '@/schemas/content'
import type { Faq } from '@/services/faq'
import { PageMeta, SectionHeading, PricingCard } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Zap, Heart } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const guarantees = [
  { icon: Shield, title: 'Satisfaction Guarantee', desc: 'Not happy after your first session? Full refund, no questions asked.' },
  { icon: Zap, title: 'Flexible Scheduling', desc: 'Book, reschedule, or cancel sessions up to 24 hours in advance.' },
  { icon: Heart, title: 'Expert Coaches', desc: 'All trainers are certified with 5+ years of professional experience.' },
]

export default function Pricing() {
  const [tiers, setTiers] = useState<PricingTier[]>([])
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [isAnnual, setIsAnnual] = useState(false)

  useEffect(() => {
    getPricingTiers().then(setTiers)
    getFaqs().then(setFaqs)
  }, [])

  return (
    <>
      <PageMeta title="Pricing — VitalEdge" description="Flexible pricing options to fit your goals and budget." />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Pricing"
            title="Simple, Transparent Pricing"
            subtitle="Choose the plan that works for you. No hidden fees, cancel anytime."
            align="center"
          />

          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative flex h-7 w-12 items-center rounded-full px-1 transition-colors ${isAnnual ? 'bg-primary' : 'bg-muted'}`}
              role="switch"
              aria-checked={isAnnual}
            >
              <div className={`h-5 w-5 rounded-full bg-background shadow-sm transition-transform ${isAnnual ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">Save 20%</span>
            </span>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <PricingCard tier={t} isAnnual={isAnnual} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Why Choose VitalEdge" align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {guarantees.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full transition-all hover:shadow-md">
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                      <g.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-semibold">{g.title}</h3>
                    <p className="text-sm text-muted-foreground">{g.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Frequently Asked Questions" subtitle="Got questions? We've got answers." align="center" />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-b px-0">
                  <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="border-t py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="mx-auto max-w-3xl overflow-hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5" />
                <CardContent className="relative p-12 text-center">
                  <h2 className="text-2xl font-bold">Still Have Questions?</h2>
                  <p className="mt-3 text-muted-foreground">
                    Our team is here to help you find the perfect plan for your goals.
                  </p>
                  <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button size="lg" asChild>
                      <Link to={ROUTES.CONTACT}>Contact Us</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link to={ROUTES.SERVICES}>Explore Services</Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  )
}
