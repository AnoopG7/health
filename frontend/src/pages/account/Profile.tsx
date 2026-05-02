import { PageMeta } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function Profile() {
  return (
    <>
      <PageMeta title="Profile — VitalEdge" description="Manage your profile information." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-3xl font-bold">Profile</h1>
          <div className="mx-auto max-w-2xl space-y-6">
            <Card><CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Personal Information</h2>
              <div className="grid gap-4 md:grid-cols-2"><Input placeholder="First Name" defaultValue="John" /><Input placeholder="Last Name" defaultValue="Doe" /></div>
              <div className="mt-4 grid gap-4 md:grid-cols-2"><Input type="email" placeholder="Email" defaultValue="john@example.com" /><Input placeholder="Phone" defaultValue="+1 555 123 4567" /></div>
              <Button className="mt-4">Save Changes</Button>
            </CardContent></Card>
            <Separator />
            <Card><CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Change Password</h2>
              <div className="space-y-4"><Input type="password" placeholder="Current Password" /><Input type="password" placeholder="New Password" /><Input type="password" placeholder="Confirm New Password" /><Button>Update Password</Button></div>
            </CardContent></Card>
          </div>
        </div>
      </section>
    </>
  )
}
