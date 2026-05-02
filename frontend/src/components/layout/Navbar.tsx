import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { SITE_CONFIG } from '@/constants/site-config'
import ThemeToggle from './ThemeToggle'
import MobileMenu from './MobileMenu'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex h-16 items-center justify-between">
        <Link to={ROUTES.HOME} className="text-xl font-bold gradient-text">
          {SITE_CONFIG.name}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {SITE_CONFIG.navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to={ROUTES.SHOWCASE}
            className="text-sm font-medium text-primary/70 transition-colors hover:text-primary"
          >
            Showcase
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to={ROUTES.BOOKING('physiotherapy')}
            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 lg:inline-block"
          >
            Book a Session
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
