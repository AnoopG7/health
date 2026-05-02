import { loadJson } from './api'
import { bookingsArraySchema, invoicesArraySchema, type Booking, type Invoice, type TimeSlot } from '@/schemas/booking'

const BOOKINGS_PATH = '/data/bookings.json'
const INVOICES_PATH = '/data/invoices.json'

const mockTimeSlots: TimeSlot[] = [
  { id: 'ts-1', date: '2025-04-01', time: '09:00', available: true, trainerId: 'trn-001' },
  { id: 'ts-2', date: '2025-04-01', time: '10:00', available: true, trainerId: 'trn-001' },
  { id: 'ts-3', date: '2025-04-01', time: '11:00', available: false, trainerId: 'trn-001' },
  { id: 'ts-4', date: '2025-04-01', time: '14:00', available: true, trainerId: 'trn-001' },
  { id: 'ts-5', date: '2025-04-01', time: '15:00', available: true, trainerId: 'trn-002' },
  { id: 'ts-6', date: '2025-04-01', time: '16:00', available: false, trainerId: 'trn-002' },
  { id: 'ts-7', date: '2025-04-02', time: '09:00', available: true, trainerId: 'trn-001' },
  { id: 'ts-8', date: '2025-04-02', time: '10:00', available: true, trainerId: 'trn-003' },
  { id: 'ts-9', date: '2025-04-02', time: '11:00', available: true, trainerId: 'trn-003' },
  { id: 'ts-10', date: '2025-04-02', time: '14:00', available: false, trainerId: 'trn-001' },
]

let cachedBookings: Booking[] | null = null
let cachedInvoices: Invoice[] | null = null

export async function getBookings(): Promise<Booking[]> {
  if (cachedBookings) return cachedBookings
  cachedBookings = await loadJson(BOOKINGS_PATH, bookingsArraySchema)
  return cachedBookings
}

export async function getBookingsByUser(userId: string): Promise<Booking[]> {
  const bookings = await getBookings()
  return bookings.filter((b) => b.userId === userId)
}

export async function getInvoices(): Promise<Invoice[]> {
  if (cachedInvoices) return cachedInvoices
  cachedInvoices = await loadJson(INVOICES_PATH, invoicesArraySchema)
  return cachedInvoices
}

export async function getInvoicesByBooking(bookingId: string): Promise<Invoice[]> {
  const invoices = await getInvoices()
  return invoices.filter((i) => i.bookingId === bookingId)
}

export function getTimeSlots(trainerId: string, date: string): TimeSlot[] {
  return mockTimeSlots.filter((ts) => ts.trainerId === trainerId && ts.date === date)
}

export function getAvailableDates(trainerId: string): string[] {
  const dates = new Set(mockTimeSlots.filter((ts) => ts.trainerId === trainerId).map((ts) => ts.date))
  return [...dates].sort()
}

export async function createBooking(data: {
  serviceId: string
  serviceSlug: string
  serviceName: string
  trainerId: string
  trainerName: string
  userId: string
  date: string
  time: string
  duration: string
  price: number
  notes: string
  location: 'online' | 'in-person'
}): Promise<Booking> {
  const booking: Booking = {
    id: `bkg-${Date.now()}`,
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  return booking
}
