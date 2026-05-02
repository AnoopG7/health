import { useEffect, useState } from 'react'
import { getPricingTiers } from '@/services'
import type { PricingTier } from '@/schemas/content'
import { PageMeta, SectionHeading, PricingCard } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'

export default function Pricing() {
  const [tiers, setTiers] = useState<PricingTier[]>([])
  useEffect(() => { getPricingTiers().then(setTiers) }, [])

  return (
    <>
      <PageMeta title="Pricing — VitalEdge" description="Flexible pricing options to fit your goals and budget." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Pricing" title="Simple, Transparent Pricing" subtitle="Choose the plan that works for you." align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tiers.map((t) => <PricingCard key={t.name} tier={t} />)}
          </div>
        </div>
      </section>
      <section className="border-t py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="Frequently Asked Questions" align="center" />
          <div className="mx-auto mt-12 max-w-3xl space-y-6">
            {[
              { q: 'Can I switch plans later?', a: 'Absolutely. You can upgrade or downgrade your plan at any time from your account settings.' },
              { q: 'Do you offer packages?', a: 'Yes, multi-session packages are available at discounted rates. Contact us for details.' },
              { q: 'Is there a free trial?', a: 'We offer a complimentary initial consultation and fitness assessment for all new clients.' },
              { q: 'Do you accept insurance?', a: 'We accept most major insurance plans for physiotherapy and sports massage services.' },
            ].map((faq, i) => (
              <Card key={i}><CardContent className="p-6"><h3 className="mb-2 font-semibold">{faq.q}</h3><p className="text-muted-foreground">{faq.a}</p></CardContent></Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
