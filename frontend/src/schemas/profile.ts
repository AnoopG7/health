import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional().refine((val) => {
    if (!val) return true
    return /^[+]?[\d\s()-]{7,}$/.test(val)
  }, 'Invalid phone number'),
  bio: z.string().max(300, 'Bio must be under 300 characters').optional(),
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
