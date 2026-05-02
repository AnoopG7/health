import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-12 space-y-3', align === 'center' && 'text-center', className)}>
      {label && (
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          {label}
        </span>
      )}
      <h2 className="relative inline-block">
        {title}
        <span className="absolute -bottom-1 left-0 h-1 w-12 rounded-full bg-primary" />
      </h2>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
}
