import { PageMeta } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export default function ForgotPassword() {
  return (
    <>
      <PageMeta title="Reset Password — VitalEdge" description="Reset your account password." />
      <section className="flex min-h-[80vh] items-center justify-center py-20">
        <Card className="mx-auto w-full max-w-md">
          <CardContent className="p-8">
            <h1 className="mb-2 text-2xl font-bold">Reset Password</h1>
            <p className="mb-6 text-muted-foreground">Enter your email and we'll send you a reset link.</p>
            <div className="space-y-4">
              <Input type="email" placeholder="Email" />
              <Button className="w-full">Send Reset Link</Button>
              <p className="text-center text-sm"><Link to={ROUTES.LOGIN} className="text-primary hover:underline">Back to login</Link></p>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
