import { Outlet } from 'react-router-dom'
import { Navbar, Footer, ScrollToTop } from '@/components/layout'

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <ScrollToTop />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
