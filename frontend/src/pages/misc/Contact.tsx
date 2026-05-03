import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { contactSchema, type ContactFormData } from '@/schemas/contact'
import { PageMeta, SectionHeading } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/constants/site-config'

const businessHours = [
  { day: 'Mon — Fri', hours: '06:00 — 21:00' },
  { day: 'Saturday', hours: '08:00 — 18:00' },
  { day: 'Sunday', hours: '08:00 — 16:00' },
]

const contactInfo = [
  { icon: Mail, label: 'Email', value: SITE_CONFIG.contact.email, href: `mailto:${SITE_CONFIG.contact.email}` },
  { icon: Phone, label: 'Phone', value: SITE_CONFIG.contact.phone, href: `tel:${SITE_CONFIG.contact.phone}` },
  { icon: MapPin, label: 'Address', value: SITE_CONFIG.contact.address, href: '#' },
]

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: 'General', message: '', phone: '' },
  })

  const subject = watch('subject')

  const onSubmit = async (_data: ContactFormData) => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    reset()
  }

  return (
    <>
      <PageMeta title="Contact Us — VitalEdge" description="Get in touch with our team for bookings, enquiries, or support." />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading label="Get In Touch" title="Contact Us" subtitle="We'd love to hear from you. Reach out and we'll get back to you within 24 hours." align="center" />

          <div className="mx-auto mt-12 grid gap-8 md:grid-cols-3">
            {contactInfo.map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-1 font-semibold">{item.label}</h3>
                    <a href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {item.value}
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mx-auto mt-16 grid gap-8 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Clock className="h-5 w-5 text-primary" /> Business Hours
                  </h3>
                  <div className="space-y-3">
                    {businessHours.map((bh) => (
                      <div key={bh.day} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{bh.day}</span>
                        <span className="text-sm text-muted-foreground">{bh.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-lg border bg-muted/30 p-4">
                    <p className="text-sm font-medium">Quick Response</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      We typically respond within 2-4 hours during business hours.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card>
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="py-12 text-center">
                      <CheckCircle className="mx-auto mb-4 h-12 w-12 text-success" />
                      <h3 className="text-xl font-semibold">Message Sent!</h3>
                      <p className="mt-2 text-muted-foreground">
                        Thanks for reaching out. We'll get back to you within 24 hours.
                      </p>
                      <Button className="mt-6" variant="outline" onClick={() => setSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <h2 className="text-xl font-semibold">Send a Message</h2>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="John Doe" {...register('name')} />
                          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
                          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Select value={subject} onValueChange={(v) => setValue('subject', v as ContactFormData['subject'])}>
                            <SelectTrigger id="subject">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="General">General Inquiry</SelectItem>
                              <SelectItem value="Booking Inquiry">Booking Inquiry</SelectItem>
                              <SelectItem value="Support">Support</SelectItem>
                              <SelectItem value="Partnership">Partnership</SelectItem>
                              <SelectItem value="Feedback">Feedback</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone (optional)</Label>
                          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" {...register('phone')} />
                          {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" rows={5} placeholder="How can we help you?" {...register('message')} />
                        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
