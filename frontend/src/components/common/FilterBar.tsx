import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface FilterBarProps {
  categories: { label: string; value: string }[]
  activeCategory?: string
  onCategoryChange?: (value: string) => void
  onSearchChange?: (value: string) => void
  onSortChange?: (value: string) => void
  onReset?: () => void
  searchPlaceholder?: string
  className?: string
}

export default function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onReset,
  searchPlaceholder = 'Search...',
  className,
}: FilterBarProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select onValueChange={onSortChange} defaultValue="name">
          <SelectTrigger className="w-full sm:w-48">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="price-low">Price (Low to High)</SelectItem>
            <SelectItem value="price-high">Price (High to Low)</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
        {onReset && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            Reset
          </Button>
        )}
      </div>
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={!activeCategory ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => onCategoryChange?.('')}
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat.value}
              variant={activeCategory === cat.value ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => onCategoryChange?.(cat.value)}
            >
              {cat.label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
