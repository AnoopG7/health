import { Outlet } from 'react-router-dom'

export default function BookingLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <Outlet />
    </div>
  )
}
