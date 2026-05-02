import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatCardProps {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
  className?: string
}

export default function StatCard({ icon, value, label, suffix = '', className }: StatCardProps) {
  return (
    <motion.div
      className={cn('rounded-xl border bg-card p-6 text-center card-hover', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
        {icon}
      </div>
      <div className="text-3xl font-bold">
        {value.toLocaleString()}
        {suffix}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </motion.div>
  )
}
