import { z } from 'zod'
import { bookingStatusSchema, bookingLocationSchema, invoiceStatusSchema } from './shared'

export const timeSlotSchema = z.object({
  id: z.string().min(1),
  date: z.string(),
  time: z.string(),
  available: z.boolean(),
  trainerId: z.string().min(1),
})

export const bookingSchema = z.object({
  id: z.string().min(1),
  serviceId: z.string().min(1),
  serviceSlug: z.string().min(1),
  serviceName: z.string().min(1),
  trainerId: z.string().min(1),
  trainerName: z.string().min(1),
  userId: z.string().min(1),
  date: z.string(),
  time: z.string(),
  duration: z.string().min(1),
  status: bookingStatusSchema,
  price: z.number().positive(),
  notes: z.string(),
  location: bookingLocationSchema,
  createdAt: z.string(),
})

export const bookingFormDataSchema = z.object({
  serviceSlug: z.string().min(1),
  trainerId: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  notes: z.string().optional(),
  location: bookingLocationSchema,
})

export const invoiceSchema = z.object({
  id: z.string().min(1),
  status: invoiceStatusSchema,
  method: z.string().min(1),
  amount: z.string().min(1),
  bookingId: z.string().min(1),
  date: z.string(),
  dueDate: z.string(),
})

export type TimeSlot = z.infer<typeof timeSlotSchema>
export type Booking = z.infer<typeof bookingSchema>
export type BookingFormData = z.infer<typeof bookingFormDataSchema>
export type Invoice = z.infer<typeof invoiceSchema>
export const bookingsArraySchema = z.array(bookingSchema)
export const invoicesArraySchema = z.array(invoiceSchema)
