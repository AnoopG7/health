import { motion } from 'framer-motion'
import { useBookingStore } from '@/store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, ArrowLeft, Clock, Globe, MapPin } from 'lucide-react'

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']

export default function StepTimeLocation() {
  const selectedTime = useBookingStore((s) => s.selectedTime)
  const location = useBookingStore((s) => s.location)
  const setTime = useBookingStore((s) => s.setTime)
  const setLocation = useBookingStore((s) => s.setLocation)
  const nextStep = useBookingStore((s) => s.nextStep)
  const prevStep = useBookingStore((s) => s.prevStep)

  const canProceed = selectedTime !== null && location !== null

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Time & Location</h2>
        <p className="mt-2 text-muted-foreground">Pick your preferred time and session location</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="font-medium">Select Time</h3>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedTime === slot
              return (
                <motion.button
                  key={slot}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setTime(slot)}
                >
                  <Clock className="h-3.5 w-3.5" />
                  {slot}
                  {isSelected && <Check className="h-3.5 w-3.5" />}
                </motion.button>
              )
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium">Session Location</h3>
          <div className="space-y-2">
            {[
              { value: 'in-person' as const, label: 'In-Person', desc: 'Visit our studio', icon: MapPin },
              { value: 'online' as const, label: 'Online', desc: 'Join via video call', icon: Globe },
            ].map((opt) => {
              const isSelected = location === opt.value
              return (
                <motion.div
                  key={opt.value}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Card
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-2 ring-primary'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setLocation(opt.value)}
                  >
                    <div className="flex items-center gap-3 p-4">
                      <div className={`rounded-lg p-2 ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <opt.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{opt.label}</h4>
                          {isSelected && <Check className="h-4 w-4 text-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{opt.desc}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
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
