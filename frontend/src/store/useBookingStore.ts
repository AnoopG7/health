import { create } from 'zustand'
import { toast } from 'sonner'
import type { Service, Trainer } from '@/schemas'

type BookingStep = 1 | 2 | 3 | 4 | 5

interface BookingState {
  currentStep: BookingStep
  selectedService: Service | null
  selectedTrainer: Trainer | null
  selectedDate: string | null
  selectedTime: string | null
  location: 'online' | 'in-person' | null
  personalInfo: { firstName: string; lastName: string; email: string; phone: string; notes: string }
  paymentInfo: { cardNumber: string; expiry: string; cvv: string; nameOnCard: string }
  isSubmitting: boolean
  nextStep: () => void
  prevStep: () => void
  setStep: (step: BookingStep) => void
  setService: (service: Service) => void
  setTrainer: (trainer: Trainer) => void
  setDate: (date: string | null) => void
  setTime: (time: string) => void
  setLocation: (location: 'online' | 'in-person') => void
  setPersonalInfo: (data: Partial<BookingState['personalInfo']>) => void
  setPaymentInfo: (data: Partial<BookingState['paymentInfo']>) => void
  resetBooking: () => void
  submitBooking: () => Promise<void>
}

const defaultPersonalInfo = { firstName: '', lastName: '', email: '', phone: '', notes: '' }
const defaultPaymentInfo = { cardNumber: '', expiry: '', cvv: '', nameOnCard: '' }

export const useBookingStore = create<BookingState>((set, get) => ({
  currentStep: 1,
  selectedService: null,
  selectedTrainer: null,
  selectedDate: null,
  selectedTime: null,
  location: null,
  personalInfo: { ...defaultPersonalInfo },
  paymentInfo: { ...defaultPaymentInfo },
  isSubmitting: false,

  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 5) as BookingStep })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) as BookingStep })),
  setStep: (step) => set({ currentStep: step }),
  setService: (service) => set({ selectedService: service }),
  setTrainer: (trainer) => set({ selectedTrainer: trainer }),
  setDate: (date) => set({ selectedDate: date }),
  setTime: (time) => set({ selectedTime: time }),
  setLocation: (location) => set({ location }),
  setPersonalInfo: (data) => set((state) => ({ personalInfo: { ...state.personalInfo, ...data } })),
  setPaymentInfo: (data) => set((state) => ({ paymentInfo: { ...state.paymentInfo, ...data } })),

  resetBooking: () => set({
    currentStep: 1,
    selectedService: null,
    selectedTrainer: null,
    selectedDate: null,
    selectedTime: null,
    location: null,
    personalInfo: { ...defaultPersonalInfo },
    paymentInfo: { ...defaultPaymentInfo },
    isSubmitting: false,
  }),

  submitBooking: async () => {
    set({ isSubmitting: true })
    await new Promise((r) => setTimeout(r, 1500))
    set({ isSubmitting: false })
    toast.success('Booking confirmed!', { description: 'Check your email for confirmation details.' })
    get().resetBooking()
  },
}))
