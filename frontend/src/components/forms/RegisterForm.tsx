import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { registerSchema } from '@/schemas/auth'
import type { RegisterData } from '@/schemas/auth'
import { ROUTES } from '@/constants/routes'
import { useAuthStore } from '@/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Loader2, Mail, Lock, User, Phone, AlertCircle, Check, X } from 'lucide-react'

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
    { label: 'Contains uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'Contains lowercase letter', test: (p: string) => /[a-z]/.test(p) },
    { label: 'Contains number', test: (p: string) => /[0-9]/.test(p) },
    { label: 'Contains special character', test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
  ]

  const passed = checks.filter((c) => c.test(password)).length
  const strength = password.length === 0 ? 0 : (passed / checks.length) * 100
  const color = strength < 40 ? 'bg-destructive' : strength < 70 ? 'bg-yellow-500' : 'bg-green-500'
  const label = strength < 40 ? 'Weak' : strength < 70 ? 'Fair' : strength < 100 ? 'Good' : 'Strong'

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Password strength</span>
        <span className={`text-xs font-medium ${strength >= 70 ? 'text-green-500' : strength >= 40 ? 'text-yellow-500' : 'text-destructive'}`}>
          {label}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full ${color} transition-all duration-300`} style={{ width: `${strength}%` }} />
      </div>
      <ul className="space-y-1">
        {checks.map((c) => {
          const pass = c.test(password)
          return (
            <li key={c.label} className="flex items-center gap-2 text-xs">
              {pass ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <X className="h-3 w-3 text-muted-foreground" />
              )}
              <span className={pass ? 'text-green-500' : 'text-muted-foreground'}>{c.label}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const register = useAuthStore((s) => s.register)

  const {
    register: formRegister,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      acceptTerms: false,
    },
  })

  const password = watch('password', '')

  const onSubmit = async (data: RegisterData) => {
    setError(null)
    try {
      await register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      })
    } catch {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="firstName" placeholder="John" className="pl-10" {...formRegister('firstName')} />
          </div>
          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="lastName" placeholder="Doe" className="pl-10" {...formRegister('lastName')} />
          </div>
          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="email" type="email" placeholder="you@example.com" className="pl-10" {...formRegister('email')} />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone (optional)</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="pl-10" {...formRegister('phone')} />
        </div>
        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="pr-10 pl-10"
            {...formRegister('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        <PasswordStrength password={password} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            placeholder="••••••••"
            className="pr-10 pl-10"
            {...formRegister('confirmPassword')}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox id="acceptTerms" {...formRegister('acceptTerms')} />
        <Label htmlFor="acceptTerms" className="text-sm font-normal leading-tight">
          I agree to the{' '}
          <Link to={ROUTES.TERMS} className="text-primary hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link to={ROUTES.PRIVACY} className="text-primary hover:underline">Privacy Policy</Link>
        </Label>
      </div>
      {errors.acceptTerms && <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </Button>
    </motion.form>
  )
}
