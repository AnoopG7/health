import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getTrainersBySpecialty } from '@/services'
import type { Trainer } from '@/schemas'
import { useBookingStore } from '@/store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Check, ArrowRight, ArrowLeft, Star } from 'lucide-react'

export default function StepTrainerDate() {
  const selectedService = useBookingStore((s) => s.selectedService)
  const selectedTrainer = useBookingStore((s) => s.selectedTrainer)
  const selectedDate = useBookingStore((s) => s.selectedDate)
  const setTrainer = useBookingStore((s) => s.setTrainer)
  const setDate = useBookingStore((s) => s.setDate)
  const nextStep = useBookingStore((s) => s.nextStep)
  const prevStep = useBookingStore((s) => s.prevStep)

  const [trainers, setTrainers] = useState<Trainer[]>([])

  useEffect(() => {
    if (selectedService) {
      getTrainersBySpecialty(selectedService.category).then(setTrainers)
    }
  }, [selectedService])

  const canProceed = selectedTrainer !== null && selectedDate !== null

  const parseDate = (d: string | null) => d ? new Date(d + 'T00:00:00') : undefined
  const formatDate = (d: Date | undefined) => d
    ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    : null

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Trainer & Date</h2>
        <p className="mt-2 text-muted-foreground">Choose your preferred trainer and session date</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="font-medium">Select Trainer</h3>
          <div className="space-y-2">
            {trainers.map((trainer) => {
              const isSelected = selectedTrainer?.id === trainer.id
              return (
                <motion.div
                  key={trainer.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-2 ring-primary'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setTrainer(trainer)}
                  >
                    <div className="flex items-center gap-3 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg font-medium">
                        {trainer.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{trainer.name}</h4>
                          {isSelected && <Check className="h-4 w-4 text-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{trainer.title}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="flex items-center gap-0.5 text-xs">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {trainer.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">({trainer.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium">Select Date</h3>
          <Card className="p-4">
            <Calendar
              mode="single"
              selected={parseDate(selectedDate)}
              onSelect={(d) => setDate(formatDate(d))}
              disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
              className="rounded-md"
            />
          </Card>
          {selectedDate && (
            <p className="text-sm text-muted-foreground">
              Selected: {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={nextStep} disabled={!canProceed}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
