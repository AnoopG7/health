import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PageMeta } from '@/components/common'
import { useBookingStore } from '@/store'
import { ROUTES } from '@/constants/routes'
import {
  StepService,
  StepTrainerDate,
  StepTimeLocation,
  StepPersonalInfo,
  StepPayment,
} from '@/components/booking'
import { Check } from 'lucide-react'

const steps = [
  { label: 'Service' },
  { label: 'Trainer & Date' },
  { label: 'Time & Location' },
  { label: 'Details' },
  { label: 'Payment' },
]

const stepComponents: Record<number, React.ReactNode> = {
  1: <StepService />,
  2: <StepTrainerDate />,
  3: <StepTimeLocation />,
  4: <StepPersonalInfo />,
  5: <StepPayment />,
}

export default function Booking() {
  const currentStep = useBookingStore((s) => s.currentStep)
  const resetBooking = useBookingStore((s) => s.resetBooking)

  useEffect(() => {
    resetBooking()
  }, [])

  return (
    <>
      <PageMeta title="Book a Session — VitalEdge" description="Book your next fitness session." />
      <section className="min-h-screen py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Link to={ROUTES.SERVICES} className="mb-8 inline-block text-sm text-primary hover:underline">
              &larr; Back to Services
            </Link>

            <div className="mb-10">
              <div className="flex items-center justify-between">
                {steps.map((step, i) => {
                  const stepNum = i + 1
                  const isActive = currentStep === stepNum
                  const isComplete = currentStep > stepNum
                  return (
                    <div key={step.label} className="flex flex-1 items-center">
                      <div className="flex flex-col items-center">
                        <motion.div
                          animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${
                            isComplete
                              ? 'border-primary bg-primary text-primary-foreground'
                              : isActive
                                ? 'border-primary text-primary'
                                : 'border-muted-foreground/30 text-muted-foreground'
                          }`}
                        >
                          {isComplete ? <Check className="h-4 w-4" /> : stepNum}
                        </motion.div>
                        <span className={`mt-2 text-xs font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                          {step.label}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`flex-1 border-t-2 ${currentStep > stepNum ? 'border-primary' : 'border-muted-foreground/30'}`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {stepComponents[currentStep]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
