import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ROUTES } from '@/constants/routes'
import { PageMeta } from '@/components/common'
import LoginForm from '@/components/forms/LoginForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

const benefits = [
  'Book and manage sessions online',
  'Track your progress and goals',
  'Access personalised programmes',
  'Get direct trainer support',
]

export default function Login() {
  return (
    <>
      <PageMeta title="Login — VitalEdge" description="Sign in to your VitalEdge account." />
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-xl" />
                <div className="relative rounded-2xl border bg-card p-10 shadow-sm">
                  <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold">
                      Welcome Back to{' '}
                      <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        VitalEdge
                      </span>
                    </h1>
                    <p className="text-muted-foreground">
                      Your fitness journey continues where you left off. Sign in to access your account.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {benefits.map((b) => (
                      <div key={b} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm">{b}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 rounded-lg border bg-muted/30 p-4">
                    <p className="text-sm font-medium">New to VitalEdge?</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Create a free account and get a complimentary fitness assessment with your first session.
                    </p>
                    <Button asChild className="mt-4 w-full" size="sm">
                      <Link to={ROUTES.REGISTER}>Create an Account</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center justify-center"
            >
              <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
                  <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <LoginForm />
                  <div className="mt-6 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <Link to={ROUTES.REGISTER} className="font-medium text-primary hover:underline">
                      Sign up
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
