import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useBookingStore } from '@/store'
import { useAuthStore } from '@/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, ArrowLeft, User, Mail, Phone, MessageSquare, UserPlus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  notes: z.string().optional(),
})

type PersonalInfo = z.infer<typeof personalInfoSchema>

export default function StepPersonalInfo() {
  const user = useAuthStore((s) => s.user)
  const personalInfo = useBookingStore((s) => s.personalInfo)
  const setPersonalInfo = useBookingStore((s) => s.setPersonalInfo)
  const nextStep = useBookingStore((s) => s.nextStep)
  const prevStep = useBookingStore((s) => s.prevStep)

  const [bookingForSelf, setBookingForSelf] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
  })

  useEffect(() => {
    if (bookingForSelf && user) {
      const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        notes: '',
      }
      reset(userData)
      setPersonalInfo(userData)
    }
  }, [bookingForSelf, user])

  const onSubmit = (data: PersonalInfo) => {
    setPersonalInfo(data)
    nextStep()
  }

  const onGuestSubmit = (data: PersonalInfo) => {
    setPersonalInfo(data)
    setBookingForSelf(false)
    reset(data)
    setModalOpen(false)
  }

  const guestForm = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '', notes: '' },
  })

  const handleRevertToSelf = () => {
    setBookingForSelf(true)
  }

  const currentValues = getValues()

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Attendee Details</h2>
          <p className="mt-2 text-muted-foreground">Who is this session for?</p>
        </div>
        {user && bookingForSelf && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setModalOpen(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Book for someone else
          </Button>
        )}
      </div>

      {!bookingForSelf && (
        <div className="flex items-center justify-between rounded-lg border bg-secondary/5 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
              {currentValues.firstName?.charAt(0)}{currentValues.lastName?.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium">{currentValues.firstName} {currentValues.lastName}</p>
              <p className="text-xs text-muted-foreground">{currentValues.email}</p>
            </div>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={handleRevertToSelf}>
            Change to me
          </Button>
        </div>
      )}

      {bookingForSelf && user && (
        <div className="flex items-center gap-3 rounded-lg border bg-primary/5 px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={() => setModalOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Change
          </Button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="firstName" className="pl-10" readOnly={bookingForSelf} {...register('firstName')} />
          </div>
          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="lastName" className="pl-10" readOnly={bookingForSelf} {...register('lastName')} />
          </div>
          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="email" type="email" className="pl-10" readOnly={bookingForSelf} {...register('email')} />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="phone" type="tel" className="pl-10" readOnly={bookingForSelf} {...register('phone')} />
        </div>
        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes (optional)</Label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Textarea id="notes" className="pl-10" rows={3} placeholder="Any injuries, preferences, or goals..." {...register('notes')} />
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button type="submit">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book for Someone Else</DialogTitle>
          </DialogHeader>
          <form onSubmit={guestForm.handleSubmit(onGuestSubmit)} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guestFirstName">First Name</Label>
                <Input id="guestFirstName" {...guestForm.register('firstName')} />
                {guestForm.formState.errors.firstName && (
                  <p className="text-sm text-destructive">{guestForm.formState.errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="guestLastName">Last Name</Label>
                <Input id="guestLastName" {...guestForm.register('lastName')} />
                {guestForm.formState.errors.lastName && (
                  <p className="text-sm text-destructive">{guestForm.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestEmail">Email</Label>
              <Input id="guestEmail" type="email" {...guestForm.register('email')} />
              {guestForm.formState.errors.email && (
                <p className="text-sm text-destructive">{guestForm.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestPhone">Phone</Label>
              <Input id="guestPhone" type="tel" {...guestForm.register('phone')} />
              {guestForm.formState.errors.phone && (
                <p className="text-sm text-destructive">{guestForm.formState.errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestNotes">Notes (optional)</Label>
              <Textarea id="guestNotes" rows={2} placeholder="Any special requirements..." {...guestForm.register('notes')} />
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Confirm Details</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.form>
  )
}
