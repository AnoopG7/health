import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'

export function useAuth() {
  const { user, isAuthenticated, isLoading, login, register, logout, initialize, updateUser } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    initialize()
  }, [initialize])

  const loginAndRedirect = async (email: string, password: string, redirect = '/account') => {
    await login(email, password)
    navigate(redirect)
  }

  const registerAndRedirect = async (data: { firstName: string; lastName: string; email: string; password: string }, redirect = '/account') => {
    await register(data)
    navigate(redirect)
  }

  const logoutAndRedirect = () => {
    logout()
    navigate('/')
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login: loginAndRedirect,
    register: registerAndRedirect,
    logout: logoutAndRedirect,
    updateUser,
  }
}
