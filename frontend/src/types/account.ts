import type { ThemeMode } from './shared'

export interface DashboardStats {
  totalBookings: number
  upcomingBookings: number
  completedBookings: number
  cancelledBookings: number
  totalSpent: number
  activePrograms: number
  activeDietPlans: number
}

export interface AccountSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
  twoFactorEnabled: boolean
  language: string
  timezone: string
  theme: ThemeMode
}
