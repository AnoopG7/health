import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, User, LogOut, Settings, Calendar, UserCircle, ArrowRight } from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/store'
import { getServices } from '@/services'
import type { Service } from '@/schemas'
import ThemeToggle from './ThemeToggle'
import MobileMenu from './MobileMenu'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const navItems = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Services', href: ROUTES.SERVICES },
  { label: 'Trainers', href: ROUTES.TRAINERS },
  { label: 'Programs', href: ROUTES.PROGRAMS },
  { label: 'Pricing', href: ROUTES.PRICING },
  { label: 'Blog', href: ROUTES.BLOG },
  { label: 'Contact', href: ROUTES.CONTACT },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    getServices().then(setServices)
  }, [])

  const initials = user ? `${user.firstName[0]}${user.lastName[0]}` : 'VE'

  const groupedServices = services.reduce<Record<string, Service[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {})

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b bg-background/80 shadow-sm backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to={ROUTES.HOME}
          className="text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Vital
          </span>
          Edge
        </Link>

        {!isMobile && (
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href
              if (item.label === 'Services') {
                return (
                  <Popover key={item.href}>
                    <PopoverTrigger asChild>
                      <button
                        className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          location.pathname.startsWith('/services')
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {item.label}
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-72 p-2">
                      <div className="space-y-3">
                        {Object.entries(groupedServices).map(([category, items]) => (
                          <div key={category}>
                            <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{category}</p>
                            {items.map((s) => (
                              <Link
                                key={s.id}
                                to={`/services/${s.slug}`}
                                className="flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                              >
                                <span className="font-medium">{s.name}</span>
                                <span className="text-xs text-muted-foreground">From ${s.priceFrom}</span>
                              </Link>
                            ))}
                          </div>
                        ))}
                        <div className="border-t pt-2">
                          <Link
                            to={ROUTES.SERVICES}
                            className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-accent"
                          >
                            View All Services
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )
              }
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                  )}
                </Link>
              )
            })}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={ROUTES.ACCOUNT} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={ROUTES.ACCOUNT_BOOKINGS} className="cursor-pointer">
                    <Calendar className="mr-2 h-4 w-4" /> My Bookings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={ROUTES.ACCOUNT_PROFILE} className="cursor-pointer">
                    <UserCircle className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={ROUTES.ACCOUNT_SETTINGS} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" size="sm" className="hidden lg:inline-flex">
              <Link to={ROUTES.LOGIN}>Sign In</Link>
            </Button>
          )}

          <Button asChild size="sm" className="hidden lg:inline-flex">
            <Link to={ROUTES.BOOKING('strength-training')}>Book a Session</Link>
          </Button>

          <MobileMenu />
        </div>
      </div>
    </motion.header>
  )
}
