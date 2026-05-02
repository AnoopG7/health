import { create } from 'zustand'
import { login, register, logout, getCurrentUser } from '@/services/auth'
import type { User } from '@/schemas/auth'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>
  logout: () => void
  initialize: () => void
  updateUser: (partial: Partial<User>) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      const user = await login(email, password)
      const stored = localStorage.getItem('vitaledge_auth')
      const token = stored ? JSON.parse(stored).token : null
      set({ user, token, isAuthenticated: true, isLoading: false })
    } catch {
      set({ isLoading: false })
      throw new Error('Invalid credentials')
    }
  },

  register: async (data) => {
    set({ isLoading: true })
    try {
      const user = await register(data)
      const stored = localStorage.getItem('vitaledge_auth')
      const token = stored ? JSON.parse(stored).token : null
      set({ user, token, isAuthenticated: true, isLoading: false })
    } catch {
      set({ isLoading: false })
      throw new Error('Registration failed')
    }
  },

  logout: () => {
    logout()
    set({ user: null, token: null, isAuthenticated: false })
  },

  initialize: () => {
    const user = getCurrentUser()
    if (user) {
      const stored = localStorage.getItem('vitaledge_auth')
      const token = stored ? JSON.parse(stored).token : null
      set({ user, token, isAuthenticated: true })
    }
  },

  updateUser: (partial) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...partial } : null,
    })),
}))
