import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ROUTES } from '@/constants/routes'
import { PageMeta } from '@/components/common'
import RegisterForm from '@/components/forms/RegisterForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Star, Users, Award } from 'lucide-react'

const stats = [
  { icon: Users, label: 'Active Members', value: '500+' },
  { icon: Star, label: 'Average Rating', value: '4.9/5' },
  { icon: Award, label: 'Certified Trainers', value: '15+' },
]

export default function Register() {
  return (
    <>
      <PageMeta title="Register — VitalEdge" description="Create your VitalEdge account." />
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="order-2 hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 blur-xl" />
                <div className="relative rounded-2xl border bg-card p-10 shadow-sm">
                  <h1 className="mb-2 text-3xl font-bold">
                    Join{' '}
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      VitalEdge
                    </span>
                  </h1>
                  <p className="mb-8 text-muted-foreground">
                    Create your account and unlock access to world-class training, expert guidance, and a supportive community.
                  </p>

                  <div className="space-y-4">
                    {stats.map((s) => (
                      <div key={s.label} className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
                        <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                          <s.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-lg font-bold">{s.value}</p>
                          <p className="text-xs text-muted-foreground">{s.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 space-y-3">
                    {['Free fitness assessment on signup', 'Access to member-only programmes', 'Direct messaging with trainers'].map((b) => (
                      <div key={b} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center justify-center order-1"
            >
              <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                  <CardDescription>Start your fitness journey today</CardDescription>
                </CardHeader>
                <CardContent>
                  <RegisterForm />
                  <div className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link to={ROUTES.LOGIN} className="font-medium text-primary hover:underline">
                      Sign in
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
