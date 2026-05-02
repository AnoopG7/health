import type { UserRole, Gender } from './shared'

export interface LoginCredentials {
  email: string
  password: string
  rememberMe: boolean
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  acceptTerms: boolean
}

export interface ForgotPasswordData {
  email: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export interface UserProfile extends User {
  dateOfBirth: string
  gender: Gender
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  emergencyContact: string
  emergencyPhone: string
  bio: string
  goals: string[]
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
