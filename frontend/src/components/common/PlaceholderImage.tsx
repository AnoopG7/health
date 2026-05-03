import { cn } from '@/lib/utils'

interface PlaceholderImageProps {
  type?: 'avatar' | 'banner' | 'thumbnail' | 'square' | 'hero'
  text?: string
  className?: string
}

export default function PlaceholderImage({
  type = 'thumbnail',
  text,
  className,
}: PlaceholderImageProps) {
  const sizeClasses = {
    avatar: 'h-24 w-24 rounded-full',
    banner: 'h-48 w-full rounded-lg md:h-64',
    thumbnail: 'h-40 w-full rounded-lg',
    square: 'aspect-square w-full rounded-lg',
    hero: 'h-64 w-full rounded-lg md:h-80',
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center bg-gradient-to-br from-primary/20 to-brand-green/20',
        sizeClasses[type],
        className,
      )}
    >
      <span className="text-lg font-medium text-muted-foreground">
        {text || type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    </div>
  )
}
