import type { BookingStatus, BookingLocation, InvoiceStatus } from './shared'

export interface TimeSlot {
  id: string
  date: string
  time: string
  available: boolean
  trainerId: string
}

export interface Booking {
  id: string
  serviceId: string
  serviceSlug: string
  serviceName: string
  trainerId: string
  trainerName: string
  userId: string
  date: string
  time: string
  duration: string
  status: BookingStatus
  price: number
  notes: string
  location: BookingLocation
  createdAt: string
}

export interface BookingFormData {
  serviceSlug: string
  trainerId: string
  date: string
  time: string
  notes: string
  location: BookingLocation
}

export interface Invoice {
  id: string
  status: InvoiceStatus
  method: string
  amount: string
  bookingId: string
  date: string
  dueDate: string
}
