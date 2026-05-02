# VitalEdge Health Platform — Ultra-Detailed Implementation Plan

## Project Metadata

| Field | Value |
|---|---|
| **Brand Name** | VitalEdge |
| **Domain Scope** | Frontend only (backend endpoints stubbed, ready for integration) |
| **Color Palette** | Primary: Blue (`oklch(0.55 0.22 220)`), Secondary: Green (`oklch(0.65 0.18 162)`) |
| **Auth** | Full user accounts, login, bookings, profile pages, protected routes |
| **Blog** | JSON-backed static content (company-managed) |
| **Payments** | Full payment step in booking flow (stub UI, backend-ready) |
| **Imagery** | Icon + gradient placeholders (AI-generated avatars/banners as placeholders) |
| **Data** | 100% JSON-driven, zero hardcoded strings in JSX |

---

## Current Setup Audit

### ✅ What's Good
- Vite + React 19 + TypeScript wired correctly
- Tailwind v4 via `@tailwindcss/vite` plugin — correct approach (no `tailwind.config.js` needed)
- shadcn/ui Nova style initialized, `components.json` configured
- 21 UI primitives already installed
- `globals.css` has a dark-first oklch theme system
- Path alias `@/` correctly resolved in both vite and tsconfig
- All required libraries installed: `zod`, `zustand`, `react-hook-form`, `@hookform/resolvers`, `framer-motion`, `embla-carousel-react`, `react-router-dom`, `next-themes`, `sonner`, `lucide-react`
- `Geist Variable` font available via `@fontsource-variable/geist`

### ⚠️ Issues to Fix in Phase 1
| Issue | File | Fix |
|---|---|---|
| `index.html` missing `<div id="root">`, title, meta description, favicon link | `index.html` | Add root div, SEO meta, font imports |
| `globals.css` — gradient-text uses purple/violet, not blue-green | `globals.css` | Recalibrate brand colors to blue-green palette |
| `globals.css` — `gradient-bg` uses dark background only, not theme-aware | `globals.css` | Make light/dark aware |
| `globals.css` — missing green secondary color tokens | `globals.css` | Add `--brand-green` OKLCH tokens |
| `App.tsx` — no router, no theme provider, no toaster wired | `App.tsx` | Wrap with all providers |
| `main.tsx` — no font import for Geist | `main.tsx` | Import Geist from fontsource |
| Missing directories: `hooks/`, `store/`, `schemas/`, `services/`, `data/`, `types/`, `constants/`, `layouts/` | `src/` | Create all dirs |
| Missing shadcn components: calendar, slider, progress, switch, breadcrumb, table, popover | `src/components/ui/` | Install in Phase 1 |
| Missing auth pages and components | N/A | Scaffold auth routes, forms, protected route wrapper |

---

## Color Palette (Blue-Green)

```
Primary (Blue):   oklch(0.55 0.22 220) — vivid azure/cobalt blue
Secondary (Green): oklch(0.65 0.18 162) — vibrant health green
```

Gradients flow blue → teal → green, conveying health, vitality, and trust.
Semantic tokens: `--success` (green), `--info` (blue), `--warning` (amber), `--danger` (red).

---

## Complete Directory Structure

```
frontend/src/
├── components/
│   ├── ui/                        # shadcn primitives (21 existing + 7 new = 28)
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ScrollToTop.tsx
│   ├── common/
│   │   ├── SectionHeading.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── TrainerCard.tsx
│   │   ├── ProgramCard.tsx
│   │   ├── DietPlanCard.tsx
│   │   ├── BlogCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── PricingCard.tsx
│   │   ├── StatCard.tsx
│   │   ├── FilterBar.tsx
│   │   ├── StarRating.tsx
│   │   ├── ProgressBadge.tsx
│   │   ├── PageMeta.tsx            # SEO title/description per page
│   │   ├── ErrorBoundary.tsx       # Route-level error boundary
│   │   ├── SkeletonLoader.tsx      # Lazy-load placeholder
│   │   └── PlaceholderImage.tsx    # Icon + gradient placeholder for images
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesOverview.tsx
│   │   ├── FeaturedTrainers.tsx
│   │   ├── StatsSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── CtaSection.tsx
│   │   └── FeaturedPrograms.tsx
│   ├── services/
│   │   ├── ServiceHero.tsx
│   │   ├── ServiceGrid.tsx
│   │   └── ServiceDetailContent.tsx
│   ├── trainers/
│   │   ├── TrainerGrid.tsx
│   │   ├── TrainerFilters.tsx
│   │   └── TrainerProfileContent.tsx
│   ├── booking/
│   │   ├── BookingStepIndicator.tsx
│   │   ├── StepServiceSelect.tsx
│   │   ├── StepSchedule.tsx
│   │   ├── StepPersonalInfo.tsx
│   │   ├── StepPayment.tsx         # Payment stub
│   │   └── StepConfirmation.tsx
│   ├── forms/
│   │   ├── ContactForm.tsx
│   │   ├── NewsletterForm.tsx
│   │   └── BookingForm.tsx
│   └── auth/
│       ├── LoginForm.tsx
│       ├── RegisterForm.tsx
│       └── ProtectedRoute.tsx
├── layouts/
│   ├── RootLayout.tsx              # Navbar + Outlet + Footer
│   ├── AuthLayout.tsx              # Minimal centered auth layout
│   └── BookingLayout.tsx           # Logo + step indicator + Outlet
├── pages/
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── ServiceDetail.tsx
│   ├── Trainers.tsx
│   ├── TrainerProfile.tsx
│   ├── Programs.tsx
│   ├── ProgramDetail.tsx
│   ├── DietPlans.tsx
│   ├── DietPlanDetail.tsx
│   ├── Blog.tsx
│   ├── BlogPost.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Pricing.tsx
│   ├── Booking.tsx
│   ├── NotFound.tsx
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── ForgotPassword.tsx
│   └── account/
│       ├── Dashboard.tsx           # User's main account page
│       ├── MyBookings.tsx          # Past/upcoming bookings
│       ├── Profile.tsx             # Edit profile
│       └── Settings.tsx            # Account settings, password change
├── schemas/
│   ├── contact.schema.ts
│   ├── booking.schema.ts
│   ├── newsletter.schema.ts
│   ├── auth.schema.ts              # Login/register validation
│   └── profile.schema.ts           # Profile update validation
├── store/
│   ├── useAuthStore.ts             # Auth state: user, token, login/logout
│   ├── useBookingStore.ts          # Multi-step booking state
│   ├── useFiltersStore.ts          # Filter state for listings
│   └── useUIStore.ts               # Mobile menu, modals, toasts
├── services/
│   ├── services.service.ts
│   ├── trainers.service.ts
│   ├── programs.service.ts
│   ├── diet-plans.service.ts
│   ├── blog.service.ts
│   ├── pricing.service.ts
│   ├── auth.service.ts             # Stub: login, register, verify token
│   └── bookings.service.ts         # Stub: create, get user bookings
├── data/
│   ├── services.json
│   ├── trainers.json
│   ├── programs.json
│   ├── diet-plans.json
│   ├── blog.json
│   ├── testimonials.json
│   ├── stats.json
│   ├── pricing.json
│   ├── faq.json
│   ├── site-config.json
│   └── users.json                  # Stub user data for auth flow demo
├── types/
│   ├── service.types.ts
│   ├── trainer.types.ts
│   ├── program.types.ts
│   ├── diet-plan.types.ts
│   ├── blog.types.ts
│   ├── auth.types.ts
│   ├── booking.types.ts
│   └── shared.types.ts
├── hooks/
│   ├── useServices.ts
│   ├── useTrainers.ts
│   ├── usePrograms.ts
│   ├── useDebounce.ts
│   └── useAuth.ts                  # Auth convenience hook
├── constants/
│   ├── routes.ts                   # All route path constants
│   └── site-config.ts              # Site name, tagline, social links
├── lib/
│   └── utils.ts                    # cn helper (already exists)
├── styles/
│   └── globals.css                 # Theme system (needs color fix)
├── App.tsx                         # Router + providers
└── main.tsx                        # Font imports + render root
```

---

## Complete Route Map

| Route | Page | Auth Required | Layout | Description |
|---|---|---|---|---|
| `/` | Home | No | RootLayout | Hero, services, trainers, stats, testimonials, CTA |
| `/services` | Services | No | RootLayout | All service categories with filters |
| `/services/:slug` | ServiceDetail | No | RootLayout | Deep dive: what it is, benefits, trainers, pricing |
| `/trainers` | Trainers | No | RootLayout | Browse/filter all 3rd-party professionals |
| `/trainers/:id` | TrainerProfile | No | RootLayout | Bio, specializations, credentials, reviews, booking CTA |
| `/programs` | Programs | No | RootLayout | Curated multi-session programs |
| `/programs/:slug` | ProgramDetail | No | RootLayout | Schedule, curriculum, trainer, pricing, enroll CTA |
| `/diet-plans` | DietPlans | No | RootLayout | Browse diet plans by goal |
| `/diet-plans/:slug` | DietPlanDetail | No | RootLayout | Full plan breakdown, macros, meals, dietitian info |
| `/blog` | Blog | No | RootLayout | Health articles, tips, guides |
| `/blog/:slug` | BlogPost | No | RootLayout | Individual article with related posts |
| `/about` | About | No | RootLayout | Company story, mission, team, partners |
| `/contact` | Contact | No | RootLayout | Contact form (RHF + Zod), FAQs, map placeholder |
| `/pricing` | Pricing | No | RootLayout | All service pricing tiers + comparison table |
| `/book/:serviceSlug` | Booking | Yes (redirect if not logged in) | BookingLayout | Multi-step: Service → Schedule → Info → Payment → Confirm |
| `/login` | Login | No (redirect if logged in) | AuthLayout | Email/password login form |
| `/register` | Register | No (redirect if logged in) | AuthLayout | Full registration form |
| `/forgot-password` | ForgotPassword | No (redirect if logged in) | AuthLayout | Email-based password reset request |
| `/account` | Dashboard | Yes | RootLayout | User's main hub: upcoming bookings, quick actions |
| `/account/bookings` | MyBookings | Yes | RootLayout | Past and upcoming bookings list |
| `/account/profile` | Profile | Yes | RootLayout | Edit name, email, phone, avatar |
| `/account/settings` | Settings | Yes | RootLayout | Password change, notification preferences |
| `/404` | NotFound | No | RootLayout | Branded 404 with nav links |

---

## Phase Breakdown

---

### Phase 1 — Setup & Foundation Fixes

**Goal:** Fix the skeleton, wire all providers, install missing shadcn components, establish folder scaffold, set brand color system, and create auth layout skeleton.

#### Tasks

##### 1.1 Fix `index.html`
- Add `<div id="root"></div>` in body
- Add `<title>VitalEdge — Your Edge to Total Health & Fitness</title>`
- Add `<meta name="description" content="...">`
- Add viewport meta (already present)
- Add favicon placeholder link
- Add Google Fonts preload for Inter (or rely on Geist)
- Set `class="dark"` on `<html>` for dark default

##### 1.2 Fix `globals.css`
- Recalibrate `--primary` to blue: `oklch(0.55 0.22 220)` in both light/dark
- Add `--brand-green` token: `oklch(0.65 0.18 162)` in both light/dark
- Update `gradient-text` utility: blue → teal → green gradient
- Update `gradient-bg` utility: theme-aware (different stops for light/dark)
- Add semantic tokens: `--success`, `--info`, `--warning`, `--danger` with light/dark variants
- Add `--brand-green-foreground` token
- Ensure all shadcn-compatible tokens reference the new colors
- Add `.glass-light` variant for light mode glassmorphism
- Add `.text-gradient-brand` class using the brand gradient

##### 1.3 Fix `main.tsx`
- Import `@fontsource-variable/geist` with CSS import
- Apply `document.documentElement.classList.add('dark')` for default dark theme (before hydration)
- No other changes needed

##### 1.4 Fix `App.tsx`
- Wrap with `BrowserRouter` (React Router v7)
- Wrap with `ThemeProvider` from `next-themes` (attribute: 'class', defaultTheme: 'dark', enableColorScheme: true)
- Wrap with `TooltipProvider`
- Add `Toaster` from `sonner` at the root level
- Define route configuration using `createBrowserRouter` or `<Routes>` approach
- Include all route definitions with lazy loading where applicable

##### 1.5 Install Missing Shadcn Components
Run the following installations:
```
npx shadcn@latest add calendar
npx shadcn@latest add slider
npx shadcn@latest add progress
npx shadcn@latest add switch
npx shadcn@latest add breadcrumb
npx shadcn@latest add table
npx shadcn@latest add popover
npx shadcn@latest add textarea
npx shadcn@latest add alert
npx shadcn@latest add collapsible
```

##### 1.6 Create All Directories
```
src/hooks/
src/store/
src/schemas/
src/services/
src/data/
src/types/
src/constants/
src/layouts/
src/components/layout/
src/components/common/
src/components/home/
src/components/services/
src/components/trainers/
src/components/booking/
src/components/forms/
src/components/auth/
src/pages/auth/
src/pages/account/
```

##### 1.7 Create `constants/routes.ts`
Centralize all route paths as string constants:
```ts
export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  SERVICE_DETAIL: (slug: string) => `/services/${slug}`,
  TRAINERS: '/trainers',
  TRAINER_PROFILE: (id: string) => `/trainers/${id}`,
  PROGRAMS: '/programs',
  PROGRAM_DETAIL: (slug: string) => `/programs/${slug}`,
  DIET_PLANS: '/diet-plans',
  DIET_PLAN_DETAIL: (slug: string) => `/diet-plans/${slug}`,
  BLOG: '/blog',
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  ABOUT: '/about',
  CONTACT: '/contact',
  PRICING: '/pricing',
  BOOKING: (slug: string) => `/book/${slug}`,
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  ACCOUNT: '/account',
  ACCOUNT_BOOKINGS: '/account/bookings',
  ACCOUNT_PROFILE: '/account/profile',
  ACCOUNT_SETTINGS: '/account/settings',
  NOT_FOUND: '/404',
} as const
```

##### 1.8 Create `constants/site-config.ts`
```ts
export const SITE_CONFIG = {
  name: 'VitalEdge',
  tagline: 'Your Edge to Total Health & Fitness',
  description: '...',
  url: 'https://vitaledge.health',
  socials: { twitter, instagram, facebook, linkedin, youtube },
  contact: { email, phone, address },
  navLinks: [...],
  footerLinks: { services, company, support, legal },
} as const
```

##### 1.9 Create `lib/utils.ts` (verify exists)
- Verify `cn()` helper exists with `clsx` + `tailwind-merge`

##### 1.10 Validate Build
- `npx tsc --noEmit` must pass with zero errors
- `npm run build` must succeed
- Dev server starts without console errors

#### Files Modified
- `index.html` (MODIFY)
- `src/styles/globals.css` (MODIFY)
- `src/main.tsx` (MODIFY)
- `src/App.tsx` (MODIFY)

#### Files Created
- `src/constants/routes.ts` (NEW)
- `src/constants/site-config.ts` (NEW)
- All shadcn component files (NEW)
- All directories (CREATE)

#### Verification
- `npm run dev` starts without errors
- Dark mode is default; toggle works
- `npm run build` succeeds
- No TypeScript errors

---

### Phase 2 — TypeScript Types & JSON Data

**Goal:** Define all data shapes as TypeScript interfaces, then create rich, realistic JSON data files that back the entire site.

#### 2.1 TypeScript Types

##### `src/types/shared.types.ts`
```ts
interface Rating { score: number; count: number }
interface Review { id, author, avatar, date, rating, comment, helpful }
interface SocialLink { platform, url, icon }
interface PricingTier { name, price, period, features[], popular, cta }
interface Tag { label, color }
interface MediaAsset { url, alt, type }
interface SEOMeta { title, description, ogImage, keywords }
```

##### `src/types/service.types.ts`
```ts
interface ServiceFeature { icon, title, description }
interface ServiceCategory { id, slug, name, description, icon, services[] }
interface Service {
  id, slug, name, category, description, longDescription,
  features: ServiceFeature[], pricingFrom, duration,
  trainers[], image, icon, popular, tags[], seo: SEOMeta
}
```

##### `src/types/trainer.types.ts`
```ts
interface TrainerCertification { name, issuer, year }
interface TrainerAvailability { day, slots[] }
interface Trainer {
  id, name, title, avatar, bio, specialties[], services[],
  certifications: TrainerCertification[], rating: Rating,
  reviews[], experience, priceFrom, location, availability[],
  socials: SocialLink[], featured, image, seo: SEOMeta
}
```

##### `src/types/program.types.ts`
```ts
interface ProgramModule { title, description, duration, sessions[] }
interface ProgramSchedule { day, time, trainer, location }
interface Program {
  id, slug, name, description, longDescription, duration,
  level, price, modules: ProgramModule[], schedule: ProgramSchedule[],
  trainer, image, enrolled, maxEnrolled, tags[], seo: SEOMeta
}
```

##### `src/types/diet-plan.types.ts`
```ts
interface MacroProfile { calories, protein, carbs, fat, fiber }
interface Meal { name, time, description, macros: MacroProfile }
interface WeeklyMenu { day, meals: Meal[] }
interface DietPlan {
  id, slug, name, goal, description, longDescription,
  duration, dailyCalories, macros: MacroProfile,
  weeklyMenu: WeeklyMenu[], dietitian, price, image,
  tags[], restrictions[], seo: SEOMeta
}
```

##### `src/types/blog.types.ts`
```ts
interface BlogCategory { id, slug, name, count }
interface BlogAuthor { name, avatar, bio }
interface BlogPost {
  id, slug, title, excerpt, content, category: BlogCategory,
  author: BlogAuthor, date, readTime, image, tags[], featured, seo: SEOMeta
}
```

##### `src/types/auth.types.ts`
```ts
interface User {
  id, name, email, avatar, phone, joinedDate,
  bookings[], preferences
}
interface AuthToken { access, refresh, expiresAt }
```

##### `src/types/booking.types.ts`
```ts
interface Booking {
  id, service, trainer, date, time, status,
  customer, payment: { amount, method, status }, createdAt
}
type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'
type BookingStep = 1 | 2 | 3 | 4 | 5
```

#### 2.2 JSON Data Files (All Realistic, Rich Data)

##### `data/services.json` — 12 services
1. Physiotherapy
2. Gym Training
3. Personal Training
4. Weight Loss Program
5. Diet Planning
6. Sports Massage
7. Deep Tissue Massage
8. Mental Health / CBT
9. Yoga
10. Pilates
11. Rehabilitation
12. Corporate Wellness

Each with: id, slug, category, description, longDescription (3-4 sentences), features (4-5 each), pricingFrom, duration, trainerIds[], icon, popular (boolean), tags[], seo

##### `data/trainers.json` — 10 trainers
Realistic names, titles, bios (2-3 sentences), 3-5 specialties each, linked services, 2-3 certifications, ratings (4.0-5.0 range with review counts), 3-5 reviews each (realistic text), experience (years), priceFrom, location (city), availability (days + time slots), social links, featured (boolean)

##### `data/programs.json` — 6 programs
1. 12-Week Weight Loss Transformation
2. Strength & Conditioning Foundation
3. Post-Injury Rehabilitation Protocol
4. Marathon Training Program
5. Mind & Body Wellness Journey
6. Senior Fitness & Mobility

Each with: modules (3-5), schedules, trainer, enrolled/maxEnrolled, tags

##### `data/diet-plans.json` — 5 plans
1. Keto Fat Burn
2. Vegan Muscle Builder
3. Balanced Weight Loss
4. Athletic Performance Fuel
5. Gut Health Reset

Each with: full macro profiles, weekly menu samples (3 days shown), dietitian info, restrictions list

##### `data/blog.json` — 8 posts
Realistic health article titles, excerpts, categories, authors, read times, dates, tags

##### `data/testimonials.json` — 10 testimonials
Realistic names, roles, quotes (2-3 sentences), ratings, linked services, avatar placeholders

##### `data/stats.json`
```json
{
  "clientsServed": 2847,
  "activeTrainers": 52,
  "servicesOffered": 12,
  "successRate": 97.8,
  "averageRating": 4.9,
  "citiesCovered": 8
}
```

##### `data/pricing.json`
Tiered pricing per service: Basic, Standard, Premium tiers with feature lists, prices, billing periods

##### `data/faq.json` — 12 FAQs
Categorized: General, Booking, Payments, Trainers, Services, Account

##### `data/site-config.json`
Full site metadata, nav structure, footer links, social media URLs, contact info

##### `data/users.json` (stub for auth demo)
2-3 sample users with hashed-password placeholders, booking history

#### Verification
- All types compile without errors
- All JSON files are valid JSON
- Service functions can read all JSON without type errors
- `tsc --noEmit` passes

---

### Phase 3 — Schemas, Services, Store & Hooks

**Goal:** Build the complete data layer — Zod validation schemas, service functions for JSON data access, Zustand stores for global state, and custom hooks.

#### 3.1 Zod Schemas

##### `src/schemas/contact.schema.ts`
```ts
// name: min 2 chars, required
// email: valid email format, required
// subject: enum ['General', 'Booking Inquiry', 'Support', 'Partnership', 'Feedback']
// message: min 20 chars, required
// phone: optional, regex for valid phone format
```

##### `src/schemas/booking.schema.ts`
```ts
// step 1 — service selection
//   serviceId: required, trainerId: optional (can select later)
// step 2 — schedule
//   date: valid date string, time: required, location: enum
// step 3 — personal info
//   firstName, lastName: min 2, email: valid, phone: valid regex
//   notes: optional, max 500 chars
// step 4 — payment
//   cardNumber: Luhn-valid, expiry: MM/YY, cvv: 3-4 digits
//   nameOnCard: required
// composed bookingSchema = step1.merge(step2).merge(step3).merge(step4)
```

##### `src/schemas/newsletter.schema.ts`
```ts
// email: valid email, required
```

##### `src/schemas/filters.schema.ts`
```ts
// category: optional string
// priceRange: [min, max] tuple
// rating: min number
// sortBy: enum ['name', 'price', 'rating', 'popular']
// searchQuery: optional string
```

##### `src/schemas/auth.schema.ts`
```ts
// loginSchema: email (valid), password (min 8)
// registerSchema: firstName, lastName, email, password (min 8 + complexity), confirmPassword (must match)
// forgotPasswordSchema: email (valid)
```

##### `src/schemas/profile.schema.ts`
```ts
// name (min 2), phone (optional, valid), bio (optional, max 300)
```

#### 3.2 Service Functions (Pure Functions — Read JSON, Return Typed Data)

##### `src/services/services.service.ts`
```ts
getAllServices(): Service[]
getServiceBySlug(slug: string): Service | undefined
getServicesByCategory(category: string): Service[]
getFeaturedServices(limit?: number): Service[]
```

##### `src/services/trainers.service.ts`
```ts
getAllTrainers(): Trainer[]
getTrainerById(id: string): Trainer | undefined
getTrainersByService(serviceSlug: string): Trainer[]
getFeaturedTrainers(limit?: number): Trainer[]
filterTrainers(filters: FiltersType): Trainer[]
```

##### `src/services/programs.service.ts`
```ts
getAllPrograms(): Program[]
getProgramBySlug(slug: string): Program | undefined
getFeaturedPrograms(limit?: number): Program[]
getProgramsByLevel(level: string): Program[]
```

##### `src/services/diet-plans.service.ts`
```ts
getAllDietPlans(): DietPlan[]
getDietPlanBySlug(slug: string): DietPlan | undefined
getDietPlansByGoal(goal: string): DietPlan[]
```

##### `src/services/blog.service.ts`
```ts
getAllPosts(): BlogPost[]
getPostBySlug(slug: string): BlogPost | undefined
getPostsByCategory(category: string): BlogPost[]
getRecentPosts(n: number): BlogPost[]
getFeaturedPosts(n: number): BlogPost[]
```

##### `src/services/pricing.service.ts`
```ts
getAllPricing(): PricingTier[]
getPricingByService(serviceSlug: string): PricingTier[]
```

##### `src/services/auth.service.ts` (Stub — Backend-Ready)
```ts
login(email, password): Promise<User> — reads users.json, returns mock user
register(data): Promise<User> — validates, returns mock created user
verifyToken(): Promise<boolean> — checks localStorage for token
logout(): void — clears localStorage
getCurrentUser(): User | null — reads from localStorage
```

##### `src/services/bookings.service.ts` (Stub — Backend-Ready)
```ts
createBooking(data): Promise<Booking>
getUserBookings(userId: string): Booking[]
getBookingById(id: string): Booking | undefined
```

#### 3.3 Zustand Stores

##### `src/store/useAuthStore.ts`
```ts
State:
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
Actions:
  login(email, password) → sets user + token in localStorage
  register(data) → sets user + token
  logout() → clears user + token
  initialize() → reads from localStorage on mount
  updateUser(partial) → updates user fields
```

##### `src/store/useBookingStore.ts`
```ts
State:
  currentStep: BookingStep (1-5)
  selectedService: Service | null
  selectedTrainer: Trainer | null
  selectedDate: string | null
  selectedTime: string | null
  personalInfo: { firstName, lastName, email, phone, notes }
  paymentInfo: { cardNumber, expiry, cvv, nameOnCard }
  isSubmitting: boolean
Actions:
  nextStep()
  prevStep()
  setStep(n)
  setService(service)
  setTrainer(trainer)
  setDate(date)
  setTime(time)
  setPersonalInfo(data)
  setPaymentInfo(data)
  resetBooking()
  submitBooking() → stub: creates booking, shows toast, resets
```

##### `src/store/useFiltersStore.ts`
```ts
State:
  category: string | null
  priceRange: [number, number]
  minRating: number
  sortBy: 'name' | 'price' | 'rating' | 'popular'
  searchQuery: string
Actions:
  setCategory(cat)
  setPriceRange(min, max)
  setMinRating(n)
  setSortBy(sort)
  setSearchQuery(query)
  resetFilters()
```

##### `src/store/useUIStore.ts`
```ts
State:
  isMobileMenuOpen: boolean
  isScrolled: boolean
  activeToast: ToastType | null
Actions:
  toggleMobileMenu()
  setMobileMenu(open)
  setScrolled(isScrolled)
```

#### 3.4 Custom Hooks

##### `src/hooks/useServices.ts`
```ts
Returns: { services, getServiceBySlug, getServicesByCategory, isLoading, error }
Uses: services.service.ts + optional filtersStore integration
```

##### `src/hooks/useTrainers.ts`
```ts
Returns: { trainers, getTrainerById, filterTrainers, isLoading, error }
Uses: trainers.service.ts + filtersStore
```

##### `src/hooks/usePrograms.ts`
```ts
Returns: { programs, getProgramBySlug, isLoading, error }
```

##### `src/hooks/useDebounce.ts`
```ts
Generic debounce: `const debounced = useDebounce(value, delay)`
```

##### `src/hooks/useAuth.ts`
```ts
Convenience wrapper around useAuthStore
Returns: { user, isAuthenticated, isLoading, login, register, logout }
Handles: redirect logic, token refresh checks
```

#### Verification
- All schemas validate correctly (test with known-good and known-bad data)
- All service functions return typed data
- Zustand stores persist correctly
- `tsc --noEmit` passes

---

### Phase 4 — Layout & Navigation Components

**Goal:** Build the persistent shell — Navbar, Footer, Theme Toggle, Mobile Menu, Layouts.

#### 4.1 Navbar (`src/components/layout/Navbar.tsx`)
- **Structure:** Sticky top, `z-50`, glass-morphic on scroll (detect via `useUIStore.isScrolled`)
- **Logo:** Text-based "VitalEdge" with `gradient-text` class, links to `/`
- **Desktop Nav:** Home, Services (with dropdown via NavigationMenu listing all categories), Trainers, Programs, Pricing, Blog, Contact
- **Right Side:**
  - ThemeToggle (sun/moon animated)
  - If authenticated: Avatar dropdown (Dashboard, My Bookings, Profile, Settings, Logout)
  - If not authenticated: "Sign In" button + "Book a Session" CTA
- **Mobile:** Hamburger icon → triggers `useUIStore.toggleMobileMenu()`
- **No inline styles** — all via Tailwind classes + CSS utilities
- Framer Motion: subtle slide-down on mount, glass transition on scroll

#### 4.2 Footer (`src/components/layout/Footer.tsx`)
- **4-column grid:**
  1. About: VitalEdge blurb (2 sentences), social icons row (Twitter, Instagram, Facebook, LinkedIn, YouTube)
  2. Services: 6 most popular service links
  3. Quick Links: About, Contact, Pricing, Blog, FAQ
  4. Contact: Email, phone, address (all from site-config)
- **Newsletter form:** Email input + Subscribe button (RHF + Zod `newsletter.schema`), Sonner toast on success
- **Bottom bar:** `© {year} VitalEdge. All rights reserved. | Privacy Policy | Terms of Service`
- **Dark-aware:** Uses CSS variables for all colors

#### 4.3 ThemeToggle (`src/components/layout/ThemeToggle.tsx`)
- Sun icon (shows in dark mode) ↔ Moon icon (shows in light mode)
- Framer Motion `animate` with rotation + scale on toggle
- Uses `useTheme()` from `next-themes`
- `aria-label="Toggle theme"`

#### 4.4 MobileMenu (`src/components/layout/MobileMenu.tsx`)
- Full-height Sheet from left
- All nav links (same as desktop)
- Service categories as sub-links
- Theme toggle at bottom
- Auth buttons or avatar dropdown
- Auto-closes on route change (`useLocation` + `useEffect`)
- Framer Motion: slide-in animation

#### 4.5 ScrollToTop (`src/components/layout/ScrollToTop.tsx`)
- Floating button, bottom-right
- Appears after 300px scroll (listens to `window.scrollY`)
- Fades in with Framer Motion
- On click: `window.scrollTo({ top: 0, behavior: 'smooth' })`

#### 4.6 RootLayout (`src/layouts/RootLayout.tsx`)
```tsx
<Navbar />
<ScrollToTop />
<Outlet />
<Footer />
```

#### 4.7 AuthLayout (`src/layouts/AuthLayout.tsx`)
- Centered card layout
- Background: subtle gradient
- Logo at top
- `<Outlet />` for auth pages
- Link to alternate auth page (Login → Register, Register → Login)

#### 4.8 BookingLayout (`src/layouts/BookingLayout.tsx`)
- Minimal header: Logo + step indicator
- No navbar, no footer
- Centered form container
- `<Outlet />` for booking steps

#### Verification
- Navbar scrolls → glass effect triggers
- Mobile menu opens/closes
- Theme toggle persists across reloads
- Footer newsletter form validates and shows toast
- All layouts render correctly on 375px, 768px, 1024px, 1440px

---

### Phase 5 — Common / Reusable Components

**Goal:** Build the design-system-level components used across multiple pages. All components receive data via props, never fetch data directly.

#### 5.1 `SectionHeading` (`src/components/common/SectionHeading.tsx`)
```tsx
Props: { label?: string, title: string, subtitle?: string, align?: 'left' | 'center' }
```
- Label: small uppercase badge, brand color
- Title: `gradient-text` or `text-foreground`, animated underline (CSS `::after`)
- Subtitle: `text-muted-foreground`
- Centered or left-aligned

#### 5.2 `ServiceCard` (`src/components/common/ServiceCard.tsx`)
```tsx
Props: { service: Service }
```
- Card with hover lift (`card-hover` class)
- Icon (Lucide) at top, brand-colored circle background
- Service name, category badge, short description
- "From $X" price indicator
- Arrow icon + "Learn More" link to detail page
- Framer Motion: stagger children, fade-up on scroll

#### 5.3 `TrainerCard` (`src/components/common/TrainerCard.tsx`)
```tsx
Props: { trainer: Trainer }
```
- PlaceholderImage for avatar (gradient + initials)
- Name, title
- StarRating component
- Specialty tags (3-4 pill badges)
- "From $X/session" price
- "View Profile" button

#### 5.4 `ProgramCard` (`src/components/common/ProgramCard.tsx`)
```tsx
Props: { program: Program }
```
- PlaceholderImage banner (gradient + program icon)
- Program name, duration badge, level badge
- Price
- Short description
- "View Details" CTA

#### 5.5 `DietPlanCard` (`src/components/common/DietPlanCard.tsx`)
```tsx
Props: { dietPlan: DietPlan }
```
- Goal tag (color-coded: weight-loss=green, muscle=blue, etc.)
- Plan name, duration
- Daily calorie range
- Key macros bar (protein/carbs/fat as mini progress bars)
- "View Plan" CTA

#### 5.6 `BlogCard` (`src/components/common/BlogCard.tsx`)
```tsx
Props: { post: BlogPost }
```
- PlaceholderImage thumbnail
- Category badge
- Title (line-clamp-2)
- Excerpt (line-clamp-3)
- Author avatar + name, read time, date

#### 5.7 `TestimonialCard` (`src/components/common/TestimonialCard.tsx`)
```tsx
Props: { testimonial: Testimonial }
```
- Quote marks decoration
- Quote text
- Avatar, name, role, linked service
- StarRating

#### 5.8 `PricingCard` (`src/components/common/PricingCard.tsx`)
```tsx
Props: { tier: PricingTier, popular?: boolean }
```
- Plan name, price, billing period
- Feature list with check/cross icons
- "Popular" badge (if applicable) — highlighted border
- CTA button
- Popular card: scaled up slightly, brand-colored border

#### 5.9 `StatCard` (`src/components/common/StatCard.tsx`)
```tsx
Props: { icon, value, label }
```
- Animated number counter (Framer Motion `useSpring`)
- Lucide icon, brand-colored
- Label below

#### 5.10 `FilterBar` (`src/components/common/FilterBar.tsx`)
```tsx
Props: { categories, onFilterChange, onSortChange, onSearchChange }
```
- Category pills (toggle active)
- Search input (debounced)
- Sort dropdown (Select component)
- Price range (Select or Slider)
- Reset filters button

#### 5.11 `StarRating` (`src/components/common/StarRating.tsx`)
```tsx
Props: { rating: number, size?: 'sm' | 'md' | 'lg' }
```
- Renders filled/empty/half stars using Lucide Star icons
- Brand-colored filled stars, muted empty stars
- Read-only display

#### 5.12 `ProgressBadge` (`src/components/common/ProgressBadge.tsx`)
```tsx
Props: { level: 'beginner' | 'intermediate' | 'advanced' }
```
- Beginner: green
- Intermediate: blue
- Advanced: purple/amber
- Pill badge with dot indicator

#### 5.13 `PageMeta` (`src/components/common/PageMeta.tsx`)
```tsx
Props: { title: string, description: string }
```
- Uses `useEffect` to set `document.title` and `<meta name="description">`
- Called at top of every page component

#### 5.14 `ErrorBoundary` (`src/components/common/ErrorBoundary.tsx`)
```tsx
React Error Boundary class component
Fallback: branded error page with "Something went wrong" message + retry button
```

#### 5.15 `SkeletonLoader` (`src/components/common/SkeletonLoader.tsx`)
```tsx
Props: { type: 'card' | 'text' | 'image' | 'list', count?: number }
```
- Uses shadcn Skeleton component
- Different layouts per type

#### 5.16 `PlaceholderImage` (`src/components/common/PlaceholderImage.tsx`)
```tsx
Props: { type: 'avatar' | 'banner' | 'thumbnail', text?: string, className?: string }
```
- Gradient background (brand blue-green)
- Centered Lucide icon or text initials
- Used everywhere images will eventually go

#### Verification
- All components render with mock data
- No inline styles in any component
- Responsive at all breakpoints
- Framer Motion animations work smoothly
- Dark/light theme renders correctly

---

### Phase 6 — Home-Specific Components & Home Page

**Goal:** Build the home page section components and assemble the Home page.

#### 6.1 `HeroSection` (`src/components/home/HeroSection.tsx`)
- Full viewport height (`min-h-screen`)
- Background: `gradient-bg` utility with floating decorative elements
- Centered content:
  - Label badge: "Welcome to VitalEdge"
  - H1: "Your Edge to Total Health & Fitness" (gradient-text, animated)
  - Subheadline: 2 sentences about the platform
  - Two CTAs: "Book a Session" (primary) + "Browse Services" (outline)
  - Floating badges (decorative): Steps icon, Heart icon, Brain icon — positioned absolutely with Framer Motion float animation
- Trusted by section below: "Trusted by 2,800+ clients across 8 cities"
- Scroll indicator at bottom (animated bouncing arrow)

#### 6.2 `ServicesOverview` (`src/components/home/ServicesOverview.tsx`)
- SectionHeading: "Everything You Need" + subtitle
- Grid of 6 featured service cards (getFeaturedServices(6))
- "View All Services" button linking to `/services`
- Responsive: 1 col mobile, 2 col tablet, 3 col desktop

#### 6.3 `StatsSection` (`src/components/home/StatsSection.tsx`)
- Background: subtle card background
- 6 StatCards in responsive grid
- Animated counters using Framer Motion `useSpring`
- Reads from `stats.json`

#### 6.4 `HowItWorks` (`src/components/home/HowItWorks.tsx`)
- SectionHeading: "How It Works"
- 3-step horizontal process:
  1. "Choose Your Service" — icon + description
  2. "Pick Your Trainer" — icon + description
  3. "Book & Transform" — icon + description
- Connected by animated dashed line (desktop)
- Mobile: vertical stack with numbered circles

#### 6.5 `FeaturedPrograms` (`src/components/home/FeaturedPrograms.tsx`)
- SectionHeading: "Featured Programs"
- Embla carousel of 4-6 program cards
- Navigation arrows + dot indicators
- "Explore All Programs" button

#### 6.6 `FeaturedTrainers` (`src/components/home/FeaturedTrainers.tsx`)
- SectionHeading: "Meet Our Experts"
- Grid of 4 featured trainer cards
- "View All Trainers" button

#### 6.7 `TestimonialsSection` (`src/components/home/TestimonialsSection.tsx`)
- SectionHeading: "What Our Clients Say"
- Embla carousel of 5-6 testimonial cards
- Auto-scroll, pause on hover
- Responsive: 1 card mobile, 2 tablet, 3 desktop

#### 6.8 `CtaSection` (`src/components/home/CtaSection.tsx`)
- Full-width gradient background
- Centered text: "Ready to Transform Your Health?"
- Subtext: 1 sentence
- CTA button: "Get Started Today"
- Small trust indicators below (ratings, client count)

#### 6.9 `Home.tsx` (`src/pages/Home.tsx`)
Assembles all sections:
```tsx
<PageMeta title="..." description="..." />
<HeroSection />
<ServicesOverview />
<StatsSection />
<HowItWorks />
<FeaturedPrograms />
<FeaturedTrainers />
<TestimonialsSection />
<CtaSection />
```

#### Verification
- Home page loads with all sections
- All data comes from JSON via service hooks
- Animations trigger on scroll (viewport-based)
- Responsive at all breakpoints
- Dark/light mode renders correctly
- `PageMeta` sets correct title/description

---

### Phase 7 — Listing & Detail Pages

**Goal:** Build all listing pages (Services, Trainers, Programs, Diet Plans, Blog, Pricing) and their detail pages.

#### 7.1 Services Pages

##### `Services.tsx` (`src/pages/Services.tsx`)
- PageMeta
- SectionHeading: "Our Services"
- FilterBar (category pills, search, sort)
- ServiceGrid (responsive grid of ServiceCard)
- Empty state if no results
- Data: `useServices()` hook

##### `ServiceDetail.tsx` (`src/pages/ServiceDetail.tsx`)
- PageMeta (dynamic from service SEO)
- ServiceHero: service name, description, icon, price-from
- ServiceDetailContent:
  - Long description
  - Features list (icons + text)
  - Trainers offering this service (TrainerCard row)
  - Pricing tiers (PricingCard)
  - CTA: "Book This Service" → `/book/:slug`

#### 7.2 Trainers Pages

##### `Trainers.tsx` (`src/pages/Trainers.tsx`)
- PageMeta
- SectionHeading: "Our Trainers"
- TrainerFilters (specialty, rating, price, availability)
- TrainerGrid (responsive grid)
- Filter results count
- Data: `useTrainers()` hook + filtersStore

##### `TrainerProfile.tsx` (`src/pages/TrainerProfile.tsx`)
- PageMeta (dynamic)
- TrainerProfileContent:
  - Avatar, name, title, rating
  - Bio
  - Certifications list
  - Specialties (tags)
  - Services offered
  - Reviews section
  - "Book with {name}" CTA

#### 7.3 Programs Pages

##### `Programs.tsx` (`src/pages/Programs.tsx`)
- PageMeta
- SectionHeading: "Training Programs"
- Filter pills: level (beginner/intermediate/advanced), goal
- ProgramCard grid

##### `ProgramDetail.tsx` (`src/pages/ProgramDetail.tsx`)
- PageMeta (dynamic)
- Program banner (PlaceholderImage)
- Program name, duration, level badge, price
- Curriculum: modules list with sessions
- Schedule table
- Trainer info
- Enrollment CTA

#### 7.4 Diet Plan Pages

##### `DietPlans.tsx` (`src/pages/DietPlans.tsx`)
- PageMeta
- SectionHeading: "Diet Plans"
- Filter by goal (weight loss, muscle gain, etc.)
- DietPlanCard grid

##### `DietPlanDetail.tsx` (`src/pages/DietPlanDetail.tsx`)
- PageMeta (dynamic)
- Diet plan banner
- Goal, duration, daily calories
- Macro breakdown (visual bars)
- Weekly menu sample
- Dietitian info
- Pricing + "Get This Plan" CTA

#### 7.5 Blog Pages

##### `Blog.tsx` (`src/pages/Blog.tsx`)
- PageMeta
- SectionHeading: "Health Resources"
- Category filter pills
- BlogCard grid
- Recent posts sidebar (desktop)

##### `BlogPost.tsx` (`src/pages/BlogPost.tsx`)
- PageMeta (dynamic)
- Article header: category, title, author, date, read time
- Article content (prose styling)
- Author bio card
- Related posts section

#### 7.6 Pricing Page

##### `Pricing.tsx` (`src/pages/Pricing.tsx`)
- PageMeta
- SectionHeading: "Transparent Pricing"
- Subtitle: "No hidden fees. Choose the plan that fits your goals."
- Pricing cards by service category (tabs or accordion)
- Comparison table (shadcn Table component)
- FAQ accordion below
- CTA section

#### Verification
- All listing pages have working filters
- All detail pages display rich content from JSON
- No 404s on valid slugs/IDs
- `PageMeta` sets correct title/description for each page
- Responsive at all breakpoints

---

### Phase 8 — Authentication Pages & Components

**Goal:** Build the complete auth flow — login, register, forgot password, protected routes, and user account pages.

#### 8.1 Auth Components

##### `LoginForm.tsx` (`src/components/auth/LoginForm.tsx`)
- RHF form with `loginSchema` (Zod)
- Fields: email, password, "Remember me" checkbox
- "Sign In" button (loading state)
- "Forgot password?" link
- "Don't have an account? Sign Up" link
- On submit: calls `authService.login()`, sets auth store, redirects to `/account`
- Error display for invalid credentials
- Sonner toast on success

##### `RegisterForm.tsx` (`src/components/auth/RegisterForm.tsx`)
- RHF form with `registerSchema` (Zod)
- Fields: firstName, lastName, email, password, confirmPassword
- Password strength indicator (Progress bar)
- "Create Account" button (loading state)
- "Already have an account? Sign In" link
- On submit: calls `authService.register()`, redirects to `/account`

##### `ProtectedRoute.tsx` (`src/components/auth/ProtectedRoute.tsx`)
- Wrapper component
- Checks `useAuthStore.isAuthenticated`
- If not authenticated: redirects to `/login?redirect=<current-path>`
- If loading: shows SkeletonLoader
- If authenticated: renders `<Outlet />` or children

#### 8.2 Auth Pages

##### `Login.tsx` (`src/pages/auth/Login.tsx`)
- AuthLayout
- LoginForm component
- PageMeta: "Sign In — VitalEdge"

##### `Register.tsx` (`src/pages/auth/Register.tsx`)
- AuthLayout
- RegisterForm component
- PageMeta: "Create Account — VitalEdge"

##### `ForgotPassword.tsx` (`src/pages/auth/ForgotPassword.tsx`)
- AuthLayout
- Simple email form
- On submit: Sonner toast "Password reset link sent" (stub)
- Back to login link

#### 8.3 Account Pages

##### `Dashboard.tsx` (`src/pages/account/Dashboard.tsx`)
- ProtectedRoute required
- Welcome header: "Welcome back, {name}"
- Quick stats: Upcoming bookings, Total sessions, Next appointment
- Upcoming bookings list (3 most recent)
- Quick action cards: "Book a Session", "View Programs", "Browse Trainers"
- PageMeta: "My Dashboard — VitalEdge"

##### `MyBookings.tsx` (`src/pages/account/MyBookings.tsx`)
- ProtectedRoute required
- Tabs: Upcoming | Past | Cancelled
- Table of bookings (shadcn Table)
- Each row: service, trainer, date, time, status, action (view/cancel)
- Empty state if no bookings
- PageMeta: "My Bookings — VitalEdge"

##### `Profile.tsx` (`src/pages/account/Profile.tsx`)
- ProtectedRoute required
- RHF form with `profileSchema`
- Avatar upload area (placeholder for now)
- Fields: firstName, lastName, email (read-only), phone
- Save button (loading state)
- Sonner toast on success
- PageMeta: "Edit Profile — VitalEdge"

##### `Settings.tsx` (`src/pages/account/Settings.tsx`)
- ProtectedRoute required
- Sections:
  - Change Password (RHF form)
  - Notification Preferences (Switch toggles: email notifications, booking reminders, promotional emails)
  - Danger Zone: "Delete Account" button (Dialog confirmation)
- PageMeta: "Account Settings — VitalEdge"

#### 8.4 Auth Store Integration
- `useAuthStore` reads from `localStorage` on app init
- Protected routes check store before rendering
- Navbar shows user avatar dropdown when authenticated
- Logout clears store + localStorage + redirects to `/`

#### Verification
- Login with valid credentials → redirects to `/account`
- Login with invalid → shows error
- Register creates account → redirects to `/account`
- Protected routes redirect to `/login` when not authenticated
- Account pages load with user data
- Logout works correctly
- Password change form validates
- Notification switches persist

---

### Phase 9 — Booking Flow

**Goal:** Implement the multi-step booking form — the site's primary conversion mechanism.

#### 9.1 BookingStepIndicator (`src/components/booking/BookingStepIndicator.tsx`)
- Shows 5 steps: Service → Schedule → Info → Payment → Confirmation
- Each step: number + label
- Active step: brand-colored circle, bold label
- Completed step: checkmark icon, muted label
- Upcoming step: gray circle, muted label
- Connected by horizontal line (desktop) / vertical (mobile)
- Framer Motion: progress bar fills as steps complete

#### 9.2 StepServiceSelect (`src/components/booking/StepServiceSelect.tsx`)
- RHF form with `stepServiceSchema`
- Service category tabs
- Service cards (selectable — click to select)
- Selected service highlighted with brand border
- Trainer selection (optional at this step)
- "Continue" button (disabled until service selected)
- Framer Motion: cards stagger in

#### 9.3 StepSchedule (`src/components/booking/StepScheduleSelect.tsx`)
- RHF form with `stepScheduleSchema`
- Trainer dropdown (filtered by selected service)
- Date picker (shadcn Calendar component)
- Time slots grid (available times for selected date/trainer)
- Location selector (In-person / Online)
- "Back" + "Continue" buttons
- Validation: must select trainer, date, and time

#### 9.4 StepPersonalInfo (`src/components/booking/StepPersonalInfo.tsx`)
- RHF form with `stepPersonalInfoSchema`
- Pre-filled from auth store if logged in (name, email, phone)
- Fields: firstName, lastName, email, phone, specialNotes (Textarea)
- "Back" + "Continue" buttons

#### 9.5 StepPayment (`src/components/booking/StepPayment.tsx`)
- RHF form with `stepPaymentSchema`
- Order summary card (left side on desktop)
  - Service, trainer, date, time
  - Price breakdown: base price + any fees
  - Total
- Payment form (right side):
  - Card number input (formatted: **** **** **** ****)
  - Expiry (MM/YY)
  - CVV
  - Name on card
  - "Pay & Confirm" button (loading state)
- "Back" button
- Disclaimer: "This is a demo. No real charges will be made."
- On submit: calls `bookingsService.createBooking()`, shows Sonner success toast, advances to confirmation

#### 9.6 StepConfirmation (`src/components/booking/StepConfirmation.tsx`)
- Success animation (Framer Motion checkmark)
- "Booking Confirmed!" heading
- Booking summary:
  - Booking ID (generated)
  - Service, trainer, date, time
  - Payment status: "Paid"
- "View in My Bookings" button → `/account/bookings`
- "Book Another Session" button → `/` (resets store)
- Email confirmation notice (stub)

#### 9.7 Booking.tsx (`src/pages/Booking.tsx`)
- ProtectedRoute required
- BookingLayout wrapper
- Uses `AnimatePresence` for step transitions (slide left/right)
- Reads current step from `useBookingStore`
- Renders appropriate step component
- Back button calls `prevStep()`, Continue calls `nextStep()`
- PageMeta: "Book a Session — VitalEdge"

#### 9.8 BookingForm (`src/components/forms/BookingForm.tsx`)
- Alternative single-page booking form (for quick booking CTA)
- Condensed version: service select + date + email
- For use in modals or inline embeds

#### Verification
- All 5 steps work sequentially
- Form validation blocks progress on invalid input
- Zustand store persists across steps (refresh doesn't lose data)
- Payment step shows correct total
- Confirmation shows full summary
- Booking appears in user's My Bookings page
- Step transitions animate smoothly
- Responsive at all breakpoints

---

### Phase 10 — About & Contact Pages

**Goal:** Build the About and Contact pages.

#### 10.1 About Page (`src/pages/About.tsx`)
- PageMeta: "About VitalEdge — Our Mission"
- Hero section: company story, mission statement
- Values section: 4-6 value cards (icon, title, description)
  - Expertise, Accessibility, Results, Community, Innovation
- Team section: key team members (placeholder images)
- Partners section: logos/names of partner organizations
- Stats recap: same as home but different layout
- CTA section: "Join Our Community"
- No inline styles — all CSS/Tailwind

#### 10.2 Contact Page (`src/pages/Contact.tsx`)
- PageMeta: "Contact Us — VitalEdge"
- Two-column layout (desktop):
  - Left: Contact form (RHF + Zod `contactSchema`)
    - Name, email, subject (Select), message (Textarea), phone (optional)
    - Submit button (loading state)
    - Sonner toast on success
  - Right: Contact info card
    - Email, phone, address
    - Business hours
    - Social links
- FAQ accordion below (12 FAQs from `faq.json`)
- Map placeholder (gradient + "Map coming soon" text)

#### 10.3 ContactForm (`src/components/forms/ContactForm.tsx`)
- RHF + Zod validation
- All fields with proper error messages
- Submit button with loading state
- Success/error toasts

#### 10.4 NewsletterForm (`src/components/forms/NewsletterForm.tsx`)
- RHF + Zod `newsletterSchema`
- Email input + Subscribe button
- Used in Footer
- Sonner toast on success

#### Verification
- Contact form validates and submits (stub)
- FAQ accordion opens/closes
- All contact info renders from JSON
- Responsive layout

---

### Phase 11 — NotFound Page

**Goal:** Build a branded 404 page.

#### 11.1 NotFound.tsx (`src/pages/NotFound.tsx`)
- PageMeta: "Page Not Found — VitalEdge"
- Large "404" text (gradient-text, animated)
- "Oops! This page took a wrong turn."
- Subtext: "The page you're looking for doesn't exist or has been moved."
- Navigation links: Home, Services, Contact
- Search input (optional)
- Decorative: floating health icons (Framer Motion)

#### 11.2 Route Configuration
- Catch-all route `*` → NotFound
- Ensure all valid routes are defined before catch-all

#### Verification
- Any invalid URL shows 404 page
- 404 page has navigation to valid pages
- No broken links

---

### Phase 12 — Polish & Final Touches

**Goal:** Micro-animations, SEO, responsive fixes, performance, accessibility.

#### 12.1 Framer Motion Animations
- All sections: `viewport={{ once: true, margin: '-100px' }}` for scroll-triggered animations
- `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
- Stagger children where applicable (service grids, trainer grids)
- Page transitions: `AnimatePresence` with slide animations
- Button hover effects: scale + shadow
- Card hover effects: lift + shadow (already in `card-hover` class)

#### 12.2 Lazy Loading
- All page components lazy-loaded via `React.lazy` + `Suspense`
- SkeletonLoader as fallback
- Route-level code splitting

#### 12.3 SEO
- Every page has `<PageMeta>` component
- `document.title` set dynamically
- `<meta name="description">` set dynamically
- Open Graph meta tags (optional enhancement)
- Semantic HTML: `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`, `<header>`

#### 12.4 Responsive Sweep
- Test at 375px (mobile), 768px (tablet), 1024px (laptop), 1440px (desktop)
- All grids use responsive breakpoints
- Typography scales correctly
- Touch targets minimum 44px
- No horizontal overflow on mobile

#### 12.5 Error Boundaries
- Wrap route groups in `<ErrorBoundary>`
- Branded error fallback with retry button
- No raw error stacks shown to users

#### 12.6 Accessibility
- All interactive elements have `aria-label`
- Keyboard navigation works (tab order, focus visible)
- Focus rings visible (brand-colored)
- Color contrast meets WCAG AA
- Screen reader text for icons
- Form labels properly associated

#### 12.7 Performance
- Debounced search inputs
- `will-change` on animated elements
- No unnecessary re-renders (React.memo where needed)
- Zustand selectors to prevent store-wide re-renders
- Image placeholders are lightweight (CSS-only, no actual images)

#### 12.8 Final Verification Checklist
- [ ] `npm run build` succeeds with zero errors
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` passes (no warnings)
- [ ] No inline styles (`grep -r 'style=' src/**/*.tsx` returns nothing)
- [ ] No hardcoded strings in JSX (all from JSON)
- [ ] All routes navigable without 404
- [ ] Dark ↔ Light toggle works on every page
- [ ] Booking flow completes all 5 steps
- [ ] Auth flow: login → dashboard → logout works
- [ ] All forms validate correctly with Zod
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] Lighthouse: Performance > 85, Accessibility > 90, Best Practices > 95
- [ ] Framer Motion animations smooth on scroll
- [ ] Sonner toasts appear correctly
- [ ] Zustand stores persist across navigation

---

## Execution Order Summary

| Phase | Name | Estimated Files | Dependencies |
|---|---|---|---|
| 1 | Setup & Foundation Fixes | ~10 files | None |
| 2 | TypeScript Types & JSON Data | ~18 files | Phase 1 dirs |
| 3 | Schemas, Services, Store & Hooks | ~20 files | Phase 2 types + data |
| 4 | Layout & Navigation Components | ~8 files | Phase 1 setup + 3 store |
| 5 | Common / Reusable Components | ~16 files | Phase 2 types + 4 layout |
| 6 | Home Page & Components | ~10 files | Phase 3-5 complete |
| 7 | Listing & Detail Pages | ~14 files | Phase 3-5 complete |
| 8 | Authentication Pages & Components | ~12 files | Phase 3 store + 4 layout |
| 9 | Booking Flow | ~8 files | Phase 3 store + 4 layout + 7 pages |
| 10 | About & Contact Pages | ~5 files | Phase 3-5 complete |
| 11 | NotFound Page | ~2 files | Phase 4 layout |
| 12 | Polish & Final Touches | 0 new files, all files modified | All phases complete |

---

## Key Coding Standards

1. **No inline styles** — All styling via Tailwind classes or CSS utilities in `globals.css`
2. **No hardcoded strings** — All content from JSON files via service functions
3. **No direct data fetching in components** — Components receive data via props; hooks call services
4. **Zod for all form validation** — RHF + `@hookform/resolvers/zod`
5. **Zustand for all global state** — Auth, booking, filters, UI
6. **Framer Motion for all animations** — No CSS keyframes except in `globals.css` utilities
7. **shadcn for all UI primitives** — No custom dropdowns, dialogs, etc.
8. **TypeScript strict mode** — No `any`, all types defined
9. **Component composition** — Small, focused components; pages assemble them
10. **Route protection** — Auth-required routes wrapped in `ProtectedRoute`
11. **Error boundaries** — All route groups wrapped
12. **Accessibility** — ARIA labels, keyboard nav, focus rings, color contrast
13. **Responsive-first** — Mobile breakpoints, touch targets, no horizontal overflow
14. **SEO-ready** — PageMeta on every page, semantic HTML, meta tags
