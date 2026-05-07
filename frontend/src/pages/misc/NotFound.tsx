import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ROUTES } from '@/constants/routes'

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-8xl font-bold text-transparent">
          404
        </h1>
        <p className="mb-2 text-xl font-medium">Page not found</p>
        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to={ROUTES.HOME} className="text-primary underline hover:no-underline">
            Go Home
          </Link>
          <span className="text-muted-foreground">·</span>
          <Link to={ROUTES.SERVICES} className="text-primary underline hover:no-underline">
            Browse Services
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
