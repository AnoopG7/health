import { PageMeta } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export default function Login() {
  return (
    <>
      <PageMeta title="Login — VitalEdge" description="Sign in to your VitalEdge account." />
      <section className="flex min-h-[80vh] items-center justify-center py-20">
        <Card className="mx-auto w-full max-w-md">
          <CardContent className="p-8">
            <h1 className="mb-2 text-2xl font-bold">Welcome Back</h1>
            <p className="mb-6 text-muted-foreground">Sign in to your account to continue.</p>
            <div className="space-y-4">
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <Button className="w-full">Sign In</Button>
              <div className="text-center text-sm"><Link to={ROUTES.FORGOT_PASSWORD} className="text-primary hover:underline">Forgot password?</Link></div>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">Don't have an account? <Link to={ROUTES.REGISTER} className="text-primary hover:underline">Sign up</Link></p>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
