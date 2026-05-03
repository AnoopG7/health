import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useBookingStore } from '@/store'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, CreditCard, CheckCircle, Loader2, Calendar, Clock, MapPin, User } from 'lucide-react'

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Valid card number is required'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry (MM/YY)'),
  cvv: z.string().min(3, 'Invalid CVV'),
  nameOnCard: z.string().min(1, 'Name on card is required'),
})

type PaymentInfo = z.infer<typeof paymentSchema>

export default function StepPayment() {
  const navigate = useNavigate()
  const isSubmitting = useBookingStore((s) => s.isSubmitting)
  const submitBooking = useBookingStore((s) => s.submitBooking)
  const prevStep = useBookingStore((s) => s.prevStep)
  const booking = useBookingStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentInfo>({
    resolver: zodResolver(paymentSchema),
    defaultValues: booking.paymentInfo,
  })

  const onSubmit = async (data: PaymentInfo) => {
    booking.setPaymentInfo(data)
    await submitBooking()
    navigate(ROUTES.ACCOUNT_BOOKINGS)
  }

  const summaryItems = [
    { icon: Calendar, label: 'Date', value: booking.selectedDate ? new Date(booking.selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : '-' },
    { icon: Clock, label: 'Time', value: booking.selectedTime ?? '-' },
    { icon: MapPin, label: 'Location', value: booking.location === 'online' ? 'Online Session' : 'In-Person' },
    { icon: User, label: 'Trainer', value: booking.selectedTrainer?.name ?? '-' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Payment</h2>
          <p className="mt-2 text-muted-foreground">Securely complete your booking</p>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="mb-3 font-medium">Booking Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service</span>
              <span className="font-medium">{booking.selectedService?.name}</span>
            </div>
            {summaryItems.map((item) => (
              <div key={item.label} className="flex justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <item.icon className="h-3.5 w-3.5" /> {item.label}
                </span>
                <span>{item.value}</span>
              </div>
            ))}
            <div className="mt-2 border-t pt-2">
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span className="text-primary">${booking.selectedService?.priceFrom}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="cardNumber" className="pl-10" placeholder="1234 5678 9012 3456" {...register('cardNumber')} />
            </div>
            {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry</Label>
              <Input id="expiry" placeholder="MM/YY" {...register('expiry')} />
              {errors.expiry && <p className="text-sm text-destructive">{errors.expiry.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" {...register('cvv')} />
              {errors.cvv && <p className="text-sm text-destructive">{errors.cvv.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nameOnCard">Name on Card</Label>
            <Input id="nameOnCard" placeholder="John Doe" {...register('nameOnCard')} />
            {errors.nameOnCard && <p className="text-sm text-destructive">{errors.nameOnCard.message}</p>}
          </div>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirm & Pay — ${booking.selectedService?.priceFrom}
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
