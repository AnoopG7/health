import { create } from 'zustand'

interface FiltersState {
  category: string | null
  priceRange: [number, number]
  minRating: number
  sortBy: 'name' | 'price' | 'rating' | 'popular'
  searchQuery: string
  setCategory: (category: string | null) => void
  setPriceRange: (min: number, max: number) => void
  setMinRating: (rating: number) => void
  setSortBy: (sortBy: FiltersState['sortBy']) => void
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

export const useFiltersStore = create<FiltersState>((set) => ({
  category: null,
  priceRange: [0, 200],
  minRating: 0,
  sortBy: 'name',
  searchQuery: '',

  setCategory: (category) => set({ category }),
  setPriceRange: (min, max) => set({ priceRange: [min, max] }),
  setMinRating: (minRating) => set({ minRating }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  resetFilters: () => set({
    category: null,
    priceRange: [0, 200],
    minRating: 0,
    sortBy: 'name',
    searchQuery: '',
  }),
}))
