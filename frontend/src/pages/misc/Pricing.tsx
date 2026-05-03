import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getPricingTiers } from '@/services'
import type { PricingTier } from '@/schemas/content'
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

const faqs = [
  { q: 'Can I switch plans later?', a: 'Absolutely. You can upgrade or downgrade your plan at any time from your account settings. Changes take effect at the start of your next billing cycle.' },
  { q: 'Do you offer packages?', a: 'Yes, multi-session packages are available at discounted rates. Contact us for details on bulk pricing for 10, 20, or 50 session bundles.' },
  { q: 'Is there a free trial?', a: 'We offer a complimentary initial consultation and fitness assessment for all new clients. This gives you a chance to experience our approach before committing.' },
  { q: 'Do you accept insurance?', a: 'We accept most major insurance plans for physiotherapy and sports massage services. Check with your provider about coverage for personal training and nutrition coaching.' },
  { q: 'What is your cancellation policy?', a: 'You can cancel or reschedule any session up to 24 hours in advance at no charge. Late cancellations within 24 hours may incur a fee.' },
  { q: 'Can I share my plan with someone?', a: 'Plans are individual and non-transferable. However, we offer couple and family packages at discounted rates — contact us for details.' },
]

const guarantees = [
  { icon: Shield, title: 'Satisfaction Guarantee', desc: 'Not happy after your first session? Full refund, no questions asked.' },
  { icon: Zap, title: 'Flexible Scheduling', desc: 'Book, reschedule, or cancel sessions up to 24 hours in advance.' },
  { icon: Heart, title: 'Expert Coaches', desc: 'All trainers are certified with 5+ years of professional experience.' },
]

export default function Pricing() {
  const [tiers, setTiers] = useState<PricingTier[]>([])
  const [isAnnual, setIsAnnual] = useState(false)

  useEffect(() => { getPricingTiers().then(setTiers) }, [])

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
            <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 px-0"
            >
              <div className={`h-5 w-5 rounded-full bg-primary transition-transform ${isAnnual ? 'translate-x-3' : 'translate-x-0'}`} />
            </Button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
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
                <AccordionItem key={faq.q} value={faq.q} className="border-b px-0">
                  <AccordionTrigger className="text-left font-medium">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
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
                      <a href="/contact">Contact Us</a>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <a href="/services">Explore Services</a>
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
