import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { SITE_CONFIG } from '@/constants/site-config'
import ThemeToggle from './ThemeToggle'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const handleNavigate = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="flex flex-col gap-6 pt-8">
          <nav className="flex flex-col gap-2">
            {SITE_CONFIG.navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={handleNavigate}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            to={ROUTES.BOOKING('physiotherapy')}
            onClick={handleNavigate}
            className="rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Book a Session
          </Link>
          <div className="flex items-center gap-2 border-t pt-4">
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">Toggle theme</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
