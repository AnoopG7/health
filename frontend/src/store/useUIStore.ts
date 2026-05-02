import { create } from 'zustand'

interface UIState {
  isMobileMenuOpen: boolean
  isScrolled: boolean
  toggleMobileMenu: () => void
  setMobileMenu: (open: boolean) => void
  setScrolled: (scrolled: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isScrolled: false,

  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenu: (open) => set({ isMobileMenuOpen: open }),
  setScrolled: (scrolled) => set({ isScrolled: scrolled }),
}))
