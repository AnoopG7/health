import { useEffect, useState } from 'react'
import { getBookingsByUser } from '@/services'
import type { Booking } from '@/schemas/booking'
import { PageMeta, SectionHeading } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const statusColors: Record<string, string> = { pending: 'bg-yellow-500', confirmed: 'bg-primary', completed: 'bg-secondary', cancelled: 'bg-muted' }

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  useEffect(() => { getBookingsByUser('usr-demo').then(setBookings) }, [])

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
          <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
          <div className="mb-12 grid gap-6 md:grid-cols-4">
            <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Total Bookings</p><p className="text-2xl font-bold">{stats.total}</p></CardContent></Card>
            <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Upcoming</p><p className="text-2xl font-bold text-primary">{stats.upcoming}</p></CardContent></Card>
            <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Completed</p><p className="text-2xl font-bold text-secondary">{stats.completed}</p></CardContent></Card>
            <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Total Spent</p><p className="text-2xl font-bold">${stats.totalSpent}</p></CardContent></Card>
          </div>
          <SectionHeading title="Recent Bookings" align="left" />
          <div className="mt-8 space-y-4">
            {bookings.slice(0, 5).map((b) => (
              <Card key={b.id}><CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div><h3 className="font-semibold">{b.serviceName}</h3><p className="text-sm text-muted-foreground">{b.trainerName} · {b.date} at {b.time}</p></div>
                  <div className="flex items-center gap-3"><Badge className={statusColors[b.status]}>{b.status}</Badge><span className="font-semibold">${b.price}</span></div>
                </div>
              </CardContent></Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
