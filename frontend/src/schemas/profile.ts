import { z } from 'zod'

export const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().refine((val) => {
    if (!val) return true
    return /^[+]?[\d\s()-]{7,}$/.test(val)
  }, 'Invalid phone number'),
})

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type ProfileFormData = z.infer<typeof profileSchema>
export type PasswordChangeData = z.infer<typeof passwordChangeSchema>
