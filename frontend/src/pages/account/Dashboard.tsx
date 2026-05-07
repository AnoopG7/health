import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBookingsByUser } from '@/services'
import type { Booking } from '@/schemas/booking'
import { PageMeta, SectionHeading } from '@/components/common'
import { useAuthStore } from '@/store'
import { ROUTES } from '@/constants/routes'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, CheckCircle, CreditCard, Dumbbell, User, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { statusColors } from '@/constants/status-colors'

const statCards = [
  { label: 'Total Bookings', icon: Calendar, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Upcoming', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Completed', icon: CheckCircle, color: 'text-secondary', bg: 'bg-secondary/10' },
  { label: 'Total Spent', icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-500/10' },
]

const quickActions = [
  { label: 'Book a Session', icon: Calendar, to: ROUTES.SERVICES },
  { label: 'Browse Trainers', icon: Dumbbell, to: ROUTES.TRAINERS },
  { label: 'View Programs', icon: CheckCircle, to: ROUTES.PROGRAMS },
]

export default function Dashboard() {
  const user = useAuthStore((s) => s.user)
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    if (user?.id) getBookingsByUser(user.id).then(setBookings)
  }, [user?.id])

  const stats = {
    total: bookings.length,
    upcoming: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    totalSpent: bookings.filter((b) => b.status === 'completed').reduce((s, b) => s + b.price, 0),
  }

  return (
    <>
      <PageMeta title="Dashboard — VitalEdge" description="Your account overview." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="mb-1 flex items-center gap-3 text-3xl font-bold">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-5 w-5" />
              </span>
              Welcome, {user?.firstName || 'there'}
            </h1>
            <p className="text-muted-foreground">Here's a quick overview of your account.</p>
          </div>

          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((sc, i) => (
              <motion.div
                key={sc.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className={`rounded-lg ${sc.bg} ${sc.color}`}>
                      <sc.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{sc.label}</p>
                      <p className="text-2xl font-bold">
                        {sc.label === 'Total Spent' ? `$${stats.totalSpent}` : stats[sc.label.toLowerCase().replace(' ', '') as keyof typeof stats]}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mb-12">
            <SectionHeading title="Quick Actions" align="left" />
            <div className="mt-6 flex flex-wrap gap-3">
              {quickActions.map((qa) => (
                <Button key={qa.label} asChild variant="outline">
                  <Link to={qa.to}>
                    <qa.icon className="mr-2 h-4 w-4" />
                    {qa.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <SectionHeading title="Recent Bookings" align="left" />
          <div className="mt-8 space-y-4">
            {bookings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                  <p className="font-medium">No bookings yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">Book your first session to get started.</p>
                  <Button asChild className="mt-4">
                    <Link to={ROUTES.SERVICES}>Browse Services</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              bookings.slice(0, 5).map((b) => (
                <Card key={b.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{b.serviceName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {b.trainerName} · {b.date} at {b.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={statusColors[b.status]}>{b.status}</Badge>
                        <span className="font-semibold">${b.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  )
}
