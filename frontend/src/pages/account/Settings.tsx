import { PageMeta } from '@/components/common'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true)
  const [smsNotif, setSmsNotif] = useState(false)
  const [marketing, setMarketing] = useState(false)

  return (
    <>
      <PageMeta title="Settings — VitalEdge" description="Manage your account preferences." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-3xl font-bold">Settings</h1>
          <div className="mx-auto max-w-2xl space-y-6">
            <Card><CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between"><div><p className="font-medium">Email Notifications</p><p className="text-sm text-muted-foreground">Receive booking confirmations and reminders via email</p></div><Switch checked={emailNotif} onCheckedChange={setEmailNotif} /></div>
                <Separator /><div className="flex items-center justify-between"><div><p className="font-medium">SMS Notifications</p><p className="text-sm text-muted-foreground">Get text alerts for upcoming sessions</p></div><Switch checked={smsNotif} onCheckedChange={setSmsNotif} /></div>
                <Separator /><div className="flex items-center justify-between"><div><p className="font-medium">Marketing Emails</p><p className="text-sm text-muted-foreground">News, tips, and special offers</p></div><Switch checked={marketing} onCheckedChange={setMarketing} /></div>
              </div>
            </CardContent></Card>
            <Card><CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Preferences</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div><label className="mb-2 block text-sm font-medium">Language</label><Select defaultValue="en"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="es">Spanish</SelectItem></SelectContent></Select></div>
                <div><label className="mb-2 block text-sm font-medium">Timezone</label><Select defaultValue="utc"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="utc">UTC</SelectItem><SelectItem value="est">EST</SelectItem><SelectItem value="pst">PST</SelectItem></SelectContent></Select></div>
              </div>
              <Button className="mt-4">Save Preferences</Button>
            </CardContent></Card>
          </div>
        </div>
      </section>
    </>
  )
}
