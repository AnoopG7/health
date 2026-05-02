import { Navbar, Footer, ScrollToTop } from '@/components/layout'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <ScrollToTop />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
