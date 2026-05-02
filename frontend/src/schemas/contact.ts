import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.enum(['General', 'Booking Inquiry', 'Support', 'Partnership', 'Feedback']),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  phone: z.string().optional().refine((val) => {
    if (!val) return true
    return /^[+]?[\d\s()-]{7,}$/.test(val)
  }, 'Invalid phone number'),
})

export type ContactFormData = z.infer<typeof contactSchema>
