import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { ROUTES } from '@/constants/routes'
import { PageSkeleton } from '@/components/common'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export default function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, initialize } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (isLoading) {
    return <PageSkeleton />
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={`${ROUTES.LOGIN}?redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to={ROUTES.ACCOUNT} replace />
  }

  return <>{children}</>
}
