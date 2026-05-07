import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { PageMeta } from '@/components/common'
import { useAuthStore } from '@/store'
import { profileSchema, passwordChangeSchema } from '@/schemas/profile'
import type { ProfileFormData, PasswordChangeData } from '@/schemas/profile'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { User, Lock, Loader2, AlertCircle } from 'lucide-react'

export default function Profile() {
  const user = useAuthStore((s) => s.user)
  const updateUser = useAuthStore((s) => s.updateUser)

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    },
  })

  const passwordForm = useForm<PasswordChangeData>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  const [profileError, setProfileError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const onProfileSubmit = async (data: ProfileFormData) => {
    setProfileError(null)
    try {
      await updateUser({ ...data })
      toast.success('Profile updated successfully')
    } catch {
      setProfileError('Failed to update profile. Please try again.')
    }
  }

  const onPasswordSubmit = async (_data: PasswordChangeData) => {
    setPasswordError(null)
    await new Promise((r) => setTimeout(r, 1000))
    toast.success('Password updated successfully')
    passwordForm.reset()
  }

  if (!user) return null

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()

  return (
    <>
      <PageMeta title="Profile — VitalEdge" description="Manage your profile information." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-3xl font-bold">Profile</h1>
          <div className="mx-auto max-w-2xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                      {initials}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>

                  <h3 className="mb-4 text-lg font-semibold">Personal Information</h3>
                  {profileError && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{profileError}</AlertDescription>
                    </Alert>
                  )}
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" {...profileForm.register('firstName')} />
                        {profileForm.formState.errors.firstName && (
                          <p className="text-sm text-destructive">{profileForm.formState.errors.firstName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" {...profileForm.register('lastName')} />
                        {profileForm.formState.errors.lastName && (
                          <p className="text-sm text-destructive">{profileForm.formState.errors.lastName.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...profileForm.register('email')} />
                        {profileForm.formState.errors.email && (
                          <p className="text-sm text-destructive">{profileForm.formState.errors.email.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" {...profileForm.register('phone')} />
                        {profileForm.formState.errors.phone && (
                          <p className="text-sm text-destructive">{profileForm.formState.errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                    <Button type="submit" disabled={profileForm.formState.isSubmitting}>
                      {profileForm.formState.isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                      ) : (
                        <><User className="mr-2 h-4 w-4" /> Save Changes</>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <Separator />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Lock className="h-5 w-5 text-muted-foreground" /> Change Password
                  </h3>
                  {passwordError && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{passwordError}</AlertDescription>
                    </Alert>
                  )}
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" {...passwordForm.register('currentPassword')} />
                      {passwordForm.formState.errors.currentPassword && (
                        <p className="text-sm text-destructive">{passwordForm.formState.errors.currentPassword.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" {...passwordForm.register('newPassword')} />
                      {passwordForm.formState.errors.newPassword && (
                        <p className="text-sm text-destructive">{passwordForm.formState.errors.newPassword.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" {...passwordForm.register('confirmPassword')} />
                      {passwordForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive">{passwordForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>
                    <Button type="submit" disabled={passwordForm.formState.isSubmitting}>
                      {passwordForm.formState.isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</>
                      ) : (
                        <><Lock className="mr-2 h-4 w-4" /> Update Password</>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
