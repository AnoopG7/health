import { Outlet, Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export default function BookingLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4">
      <div className="w-full max-w-2xl">
        <Link to={ROUTES.HOME} className="mb-6 block text-center text-xl font-bold">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Vital</span>
          Edge
        </Link>
        <Outlet />
      </div>
    </div>
  )
}
