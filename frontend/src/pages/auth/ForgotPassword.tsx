import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { forgotPasswordSchema } from '@/schemas/auth'
import type { ForgotPasswordData } from '@/schemas/auth'
import { ROUTES } from '@/constants/routes'
import { PageMeta } from '@/components/common'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Loader2, CheckCircle, ArrowLeft } from 'lucide-react'

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (_data: ForgotPasswordData) => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <>
      <PageMeta title="Reset Password — VitalEdge" description="Reset your account password." />
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto w-full max-w-md px-6"
        >
          <Card>
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
              <CardDescription>Enter your email and we'll send you a reset link</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="py-6 text-center">
                  <CheckCircle className="mx-auto mb-4 h-12 w-12 text-success" />
                  <h3 className="text-lg font-semibold">Check Your Email</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We've sent a password reset link. Check your inbox and follow the instructions.
                  </p>
                  <div className="mt-6 space-y-3">
                    <Button variant="outline" className="w-full" onClick={() => setSubmitted(false)}>
                      Didn't receive it? Try again
                    </Button>
                    <Link to={ROUTES.LOGIN}>
                      <Button variant="ghost" size="sm" className="w-full">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="email" type="email" className="pl-10" placeholder="you@example.com" {...register('email')} />
                    </div>
                    {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                  <div className="text-center text-sm">
                    <Link to={ROUTES.LOGIN} className="inline-flex items-center text-primary hover:underline">
                      <ArrowLeft className="mr-1 h-4 w-4" /> Back to login
                    </Link>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </>
  )
}
