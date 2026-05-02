import { useEffect, useState } from 'react'
import { getBookingsByUser } from '@/services'
import type { Booking } from '@/schemas/booking'
import { PageMeta } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const statusColors: Record<string, string> = { pending: 'bg-yellow-500', confirmed: 'bg-primary', completed: 'bg-secondary', cancelled: 'bg-muted' }

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  useEffect(() => { getBookingsByUser('usr-demo').then(setBookings) }, [])

  return (
    <>
      <PageMeta title="My Bookings — VitalEdge" description="View and manage your bookings." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-3xl font-bold">My Bookings</h1>
          {bookings.length === 0 ? (
            <Card><CardContent className="py-12 text-center"><p className="text-muted-foreground">No bookings yet.</p></CardContent></Card>
          ) : (
            <Card><CardContent className="p-0"><Table>
              <TableHeader><TableRow><TableHead>Service</TableHead><TableHead>Trainer</TableHead><TableHead>Date</TableHead><TableHead>Time</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Price</TableHead></TableRow></TableHeader>
              <TableBody>
                {bookings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">{b.serviceName}</TableCell>
                    <TableCell>{b.trainerName}</TableCell>
                    <TableCell>{b.date}</TableCell>
                    <TableCell>{b.time}</TableCell>
                    <TableCell><Badge className={statusColors[b.status]}>{b.status}</Badge></TableCell>
                    <TableCell className="text-right">${b.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table></CardContent></Card>
          )}
        </div>
      </section>
    </>
  )
}
