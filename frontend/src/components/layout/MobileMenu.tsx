import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/store'
import ThemeToggle from './ThemeToggle'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Menu, ChevronDown, ChevronRight, User, LogOut, Settings, Calendar, ArrowRight } from 'lucide-react'

const navItems = [
  { label: 'Home', href: ROUTES.HOME, icon: 'home' },
  { label: 'Services', href: ROUTES.SERVICES, icon: 'grid' },
  { label: 'Trainers', href: ROUTES.TRAINERS, icon: 'users' },
  { label: 'Programs', href: ROUTES.PROGRAMS, icon: 'target' },
  { label: 'Pricing', href: ROUTES.PRICING, icon: 'credit-card' },
  { label: 'Blog', href: ROUTES.BLOG, icon: 'book' },
  { label: 'Contact', href: ROUTES.CONTACT, icon: 'mail' },
]

const serviceCategories = [
  { label: 'Strength Training', href: '/services/strength-training' },
  { label: 'Physiotherapy', href: '/services/physiotherapy' },
  { label: 'HIIT & Cardio', href: '/services/hiit-cardio' },
  { label: 'Yoga & Mobility', href: '/services/yoga-mobility' },
  { label: 'Sports Massage', href: '/services/sports-massage' },
  { label: 'Nutrition Coaching', href: '/services/nutrition-coaching' },
  { label: 'Mental Wellness', href: '/services/mental-wellness' },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuthStore()

  const handleNavigate = () => setOpen(false)

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto p-0">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 px-6 pt-8 pb-6">
          <SheetHeader className="mb-2">
            <SheetTitle className="text-2xl">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Vital
              </span>
              Edge
            </SheetTitle>
          </SheetHeader>
          <p className="text-xs text-muted-foreground">Your Edge to Total Health & Fitness</p>
        </div>

        <Separator />

        <nav className="flex flex-col gap-0.5 px-3 py-3">
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.href
            if (item.label === 'Services') {
              return (
                <motion.div key={item.href} variants={linkVariants} initial="hidden" animate="visible" custom={i}>
                  <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                    <CollapsibleTrigger asChild>
                      <button
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        }`}
                      >
                        {item.label}
                        {servicesOpen ? (
                          <ChevronDown className="h-4 w-4 transition-transform" />
                        ) : (
                          <ChevronRight className="h-4 w-4 transition-transform" />
                        )}
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-3 mt-1 flex flex-col gap-0.5 border-l-2 border-primary/20 pl-4">
                      {serviceCategories.map((cat) => (
                        <Link
                          key={cat.href}
                          to={cat.href}
                          onClick={handleNavigate}
                          className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </motion.div>
              )
            }
            return (
              <motion.div key={item.href} variants={linkVariants} initial="hidden" animate="visible" custom={i}>
                <Link
                  to={item.href}
                  onClick={handleNavigate}
                  className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {item.label}
                  {isActive && <ArrowRight className="h-3.5 w-3.5" />}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        <Separator className="mx-3" />

        <div className="px-4 py-4">
          <Button asChild className="w-full" onClick={handleNavigate}>
            <Link to={ROUTES.BOOKING('strength-training')}>
              Book a Session
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {isAuthenticated && user ? (
          <div className="mx-3 space-y-1">
            <Link
              to={ROUTES.ACCOUNT}
              onClick={handleNavigate}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <User className="h-4 w-4" /> Dashboard
            </Link>
            <Link
              to={ROUTES.ACCOUNT_BOOKINGS}
              onClick={handleNavigate}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Calendar className="h-4 w-4" /> My Bookings
            </Link>
            <Link
              to={ROUTES.ACCOUNT_SETTINGS}
              onClick={handleNavigate}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Settings className="h-4 w-4" /> Settings
            </Link>
            <button
              onClick={() => { logout(); handleNavigate() }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        ) : (
          <div className="mx-4 flex flex-col gap-2">
            <Button asChild variant="outline" className="w-full" onClick={handleNavigate}>
              <Link to={ROUTES.LOGIN}>Sign In</Link>
            </Button>
            <Button asChild className="w-full" onClick={handleNavigate}>
              <Link to={ROUTES.REGISTER}>Create Account</Link>
            </Button>
          </div>
        )}

        <div className="mt-4 border-t px-4 py-4">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">Toggle theme</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
