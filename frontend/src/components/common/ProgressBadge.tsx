import { cn } from '@/lib/utils'

interface ProgressBadgeProps {
  level: 'beginner' | 'intermediate' | 'advanced'
  className?: string
}

const config = {
  beginner: { color: 'bg-success/10 text-success-foreground', dot: 'bg-success', label: 'Beginner' },
  intermediate: { color: 'bg-info/10 text-info-foreground', dot: 'bg-info', label: 'Intermediate' },
  advanced: { color: 'bg-warning/10 text-warning-foreground', dot: 'bg-warning', label: 'Advanced' },
}

export default function ProgressBadge({ level, className }: ProgressBadgeProps) {
  const { color, dot, label } = config[level]

  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', color, className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', dot)} />
      {label}
    </span>
  )
}
