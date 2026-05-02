import { PageMeta, SectionHeading } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <>
      <PageMeta title="Contact Us — VitalEdge" description="Get in touch with our team for bookings, enquiries, or support." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Get In Touch" title="Contact Us" subtitle="We'd love to hear from you." align="center" />
          <div className="mx-auto mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card><CardContent className="p-6 text-center"><Mail className="mx-auto mb-4 h-8 w-8 text-primary" /><h3 className="font-semibold">Email</h3><p className="text-muted-foreground">hello@vitaledge.com</p></CardContent></Card>
            <Card><CardContent className="p-6 text-center"><Phone className="mx-auto mb-4 h-8 w-8 text-primary" /><h3 className="font-semibold">Phone</h3><p className="text-muted-foreground">+1 (555) 123-4567</p></CardContent></Card>
            <Card className="md:col-span-2 lg:col-span-1"><CardContent className="p-6 text-center"><MapPin className="mx-auto mb-4 h-8 w-8 text-primary" /><h3 className="font-semibold">Address</h3><p className="text-muted-foreground">123 Fitness Ave, Suite 200</p></CardContent></Card>
          </div>
          <Card className="mx-auto mt-12 max-w-2xl">
            <CardContent className="p-8">
              <h2 className="mb-6 text-xl font-semibold">Send a Message</h2>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2"><Input placeholder="First Name" /><Input placeholder="Last Name" /></div>
                <Input type="email" placeholder="Email" /><Input placeholder="Subject" />
                <Textarea placeholder="Your message..." className="min-h-[120px]" />
                <Button className="w-full">Send Message</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
