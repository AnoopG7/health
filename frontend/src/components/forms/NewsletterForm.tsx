import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type NewsletterForm = z.infer<typeof newsletterSchema>

export default function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (_data: NewsletterForm) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    toast.success('Subscribed successfully!')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div className="flex-1">
        <Input
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          className="h-9"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>
      <Button type="submit" size="sm" disabled={isSubmitting}>
        {isSubmitting ? '...' : 'Subscribe'}
      </Button>
    </form>
  )
}
