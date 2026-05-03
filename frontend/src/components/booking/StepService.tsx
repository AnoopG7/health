import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getServices } from '@/services'
import type { Service } from '@/schemas'
import { useBookingStore } from '@/store'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Clock, DollarSign } from 'lucide-react'

export default function StepService() {
  const [services, setServices] = useState<Service[]>([])
  const selectedService = useBookingStore((s) => s.selectedService)
  const setService = useBookingStore((s) => s.setService)
  const nextStep = useBookingStore((s) => s.nextStep)

  useEffect(() => {
    getServices().then(setServices)
  }, [])

  const canProceed = selectedService !== null

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Choose a Service</h2>
        <p className="mt-2 text-muted-foreground">Select the service you&apos;d like to book</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => {
          const isSelected = selectedService?.id === service.id
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5 ring-2 ring-primary'
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setService(service)}
              >
                <div className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    {isSelected && (
                      <div className="rounded-full bg-primary p-1">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <Badge variant="secondary">{service.category}</Badge>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {service.duration}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-primary">
                      <DollarSign className="h-3.5 w-3.5" /> {service.priceFrom}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-end">
        <Button onClick={nextStep} disabled={!canProceed}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
