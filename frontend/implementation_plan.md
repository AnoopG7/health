# VitalEdge Health Platform — Frontend Implementation Plan

## Overview

**VitalEdge** (working name — you can rename) is a production-ready, multi-service health & fitness platform frontend. It acts as the public-facing website for a company that aggregates and provides health services through third-party professionals, covering physiotherapy, gym training, personal training, weight loss, diet plans, massages, physical therapy, mental health, and broader human fitness.

The stack is: **Vite + React 19 + TypeScript + Tailwind v4 + shadcn/ui (Nova) + Zustand + React Hook Form + Zod + React Router v7 + Framer Motion + Sonner**. All data is driven from JSON files — no hardcoded content anywhere.

---

## Current Setup Audit

> [!IMPORTANT]
> The setup is **largely correct** — do NOT delete and start over. Minor fixes are needed before building.

### ✅ What's Good
- Vite + React 19 + TypeScript wired correctly.
- Tailwind v4 via `@tailwindcss/vite` plugin — correct approach (no `tailwind.config.js` needed).
- shadcn/ui Nova style initialized, `components.json` configured.
- 21 UI primitives already installed (button, card, dialog, carousel, etc.).
- `globals.css` has a great dark-first oklch theme system.
- Path alias `@/` correctly resolved in both vite and tsconfig.
- All required libraries installed: `zod`, `zustand`, `react-hook-form`, `@hookform/resolvers`, `framer-motion`, `embla-carousel-react`, `react-router-dom`, `next-themes`, `sonner`, `lucide-react`.
- `Geist Variable` font already available via `@fontsource-variable/geist`.

### ⚠️ Issues to Fix in Phase 1
| Issue | File | Fix |
|---|---|---|
| `index.html` missing `<div id="root">`, title, meta description, favicon link | `index.html` | Add root div, SEO meta, Google Fonts (Inter) |
| `globals.css` — gradient-text uses purple/violet, not blue-green | `globals.css` | Recalibrate brand colors to blue-green palette |
| `globals.css` — `gradient-bg` uses dark background only, not theme-aware | `globals.css` | Make light/dark aware |
| `globals.css` — missing green secondary color tokens | `globals.css` | Add `--brand-green` OKLCH tokens |
| `components.json` — `style: "radix-nova"` is correct, but `baseColor: "neutral"` should stay | Already OK | No change needed |
| `App.tsx` — no router, no theme provider, no toaster wired | `App.tsx` | Wrap with all providers |
| `main.tsx` — no font import for Inter (only Geist is installed via package) | `main.tsx` | Import Geist from fontsource, use system Inter fallback or install via fontsource |
| Missing: `src/hooks/`, `src/store/`, `src/schemas/`, `src/services/`, `src/data/`, `src/types/`, `src/constants/`, `src/layouts/` directories | `src/` | Create all dirs |
| `embla-carousel-react` — needs `--legacy-peer-deps` check | Already in node_modules | Should be fine at v8 |

---

## Color Palette Decision

The primary palette is **Blue-Green** (teal-adjacent). We will use:
- **Primary (Blue):** `oklch(0.55 0.22 220)` — a vivid azure/cobalt blue
- **Secondary (Green):** `oklch(0.65 0.18 162)` — a vibrant health green
- Gradients go blue → teal → green, conveying health, vitality, and trust

These replace the current violet-purple gradient in `globals.css`.

---

## Proposed Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, services overview, featured trainers, stats, testimonials, CTA |
| `/services` | Services | All service categories listed with filters |
| `/services/:slug` | Service Detail | Deep dive: what it is, benefits, trainers offering it, pricing tiers |
| `/trainers` | Trainers Directory | Browse/filter all 3rd-party professionals |
| `/trainers/:id` | Trainer Profile | Bio, specializations, credentials, reviews, booking CTA |
| `/programs` | Programs | Curated multi-session programs (weight loss, strength, etc.) |
| `/programs/:slug` | Program Detail | Schedule, curriculum, trainer, pricing, enroll CTA |
| `/diet-plans` | Diet Plans | Browse diet plans by goal (muscle gain, weight loss, etc.) |
| `/diet-plans/:slug` | Diet Plan Detail | Full plan breakdown, macros, meals, dietitian info |
| `/blog` | Blog/Resources | Health articles, tips, guides |
| `/blog/:slug` | Blog Post | Individual article |
| `/about` | About | Company story, mission, team, partners |
| `/contact` | Contact | Contact form (RHF + Zod), FAQs |
| `/pricing` | Pricing | All service pricing tiers and comparison table |
| `/book/:serviceSlug` | Booking | Multi-step booking form (RHF + Zod + Zustand) |
| `/404` | Not Found | Custom 404 |

---

## Proposed Directory Structure

```
frontend/src/
├── components/
│   ├── ui/                        # shadcn primitives (already here)
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   └── ThemeToggle.tsx
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
│   │   └── ScrollToTop.tsx
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
│   │   └── StepConfirmation.tsx
│   └── forms/
│       ├── ContactForm.tsx
│       ├── NewsletterForm.tsx
│       └── BookingForm.tsx
├── layouts/
│   ├── RootLayout.tsx             # Navbar + Outlet + Footer
│   └── BookingLayout.tsx          # Minimal layout for booking flow
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
│   └── NotFound.tsx
├── schemas/                       # Zod schemas
│   ├── contact.schema.ts
│   ├── booking.schema.ts
│   ├── newsletter.schema.ts
│   └── trainer.schema.ts
├── store/                         # Zustand stores
│   ├── useBookingStore.ts
│   ├── useFiltersStore.ts
│   └── useUIStore.ts
├── services/                      # Data access layer (reads JSON)
│   ├── services.service.ts
│   ├── trainers.service.ts
│   ├── programs.service.ts
│   ├── diet-plans.service.ts
│   ├── blog.service.ts
│   └── pricing.service.ts
├── data/                          # JSON data files
│   ├── services.json
│   ├── trainers.json
│   ├── programs.json
│   ├── diet-plans.json
│   ├── blog.json
│   ├── testimonials.json
│   ├── stats.json
│   ├── pricing.json
│   ├── faq.json
│   └── site-config.json
├── types/                         # TypeScript types
│   ├── service.types.ts
│   ├── trainer.types.ts
│   ├── program.types.ts
│   ├── diet-plan.types.ts
│   ├── blog.types.ts
│   └── shared.types.ts
├── hooks/                         # Custom React hooks
│   ├── useServices.ts
│   ├── useTrainers.ts
│   ├── usePrograms.ts
│   └── useDebounce.ts
├── constants/
│   ├── routes.ts
│   └── services-meta.ts
├── lib/
│   └── utils.ts                   # Already exists (cn helper)
├── styles/
│   └── globals.css                # Already exists (needs minor color fix)
├── App.tsx
└── main.tsx
```

---

## Phase Breakdown

---

### Phase 1 — Setup & Foundation Fixes
**Goal:** Fix the skeleton, wire all providers, establish the correct folder scaffold, and set the brand color system.

#### Tasks
1. **Fix `index.html`** — Add `<div id="root">`, correct title, meta description, viewport, favicon placeholder. Add Inter font via Google Fonts CDN.
2. **Fix `globals.css`** — Recalibrate primary blue and add `--brand-green` secondary tokens. Update `gradient-text` and `gradient-bg` to blue-green. Add `--success`, `--info`, `--warning` semantic tokens.
3. **Fix `main.tsx`** — Import Geist Variable from `@fontsource-variable/geist`.
4. **Fix `App.tsx`** — Wire `BrowserRouter` (or React Router v7's `createBrowserRouter`), `ThemeProvider` from `next-themes`, `Toaster` from `sonner`, and the `RootLayout`.
5. **Create all directories** — `hooks/`, `store/`, `schemas/`, `services/`, `data/`, `types/`, `constants/`, `layouts/`.
6. **Create `constants/routes.ts`** — Centralize all route strings as constants.
7. **Create `constants/site-config.ts`** — Site name, tagline, social links, nav links.
8. **Validate build** — Ensure `npm run build` passes with zero TS errors.

#### Files Modified/Created
- `index.html` (MODIFY)
- `src/styles/globals.css` (MODIFY)
- `src/main.tsx` (MODIFY)
- `src/App.tsx` (MODIFY)
- `src/constants/routes.ts` (NEW)
- `src/constants/site-config.ts` (NEW)
- All empty directories (CREATE)

---

### Phase 2 — TypeScript Types & JSON Data
**Goal:** Define all data shapes as TypeScript interfaces, then create the JSON data files that back the entire site.

> [!NOTE]
> All JSON must be rich and realistic — proper names, descriptions, prices, credentials, ratings, etc. This is what makes the site look "real."

#### Tasks
1. **`src/types/shared.types.ts`** — Common types: `Rating`, `Review`, `SocialLink`, `PricingTier`, `Tag`, `MediaAsset`, `SEOMeta`.
2. **`src/types/service.types.ts`** — `Service`, `ServiceCategory`, `ServiceFeature`.
3. **`src/types/trainer.types.ts`** — `Trainer`, `TrainerCertification`, `TrainerAvailability`.
4. **`src/types/program.types.ts`** — `Program`, `ProgramModule`, `ProgramSchedule`.
5. **`src/types/diet-plan.types.ts`** — `DietPlan`, `Meal`, `MacroProfile`, `WeeklyMenu`.
6. **`src/types/blog.types.ts`** — `BlogPost`, `BlogCategory`, `BlogAuthor`.

**JSON Data files (all with 8-15+ items each):**
7. **`data/services.json`** — ~12 services: physiotherapy, gym training, personal training, weight loss, diet plans, sports massage, deep tissue massage, CBT/mental health, yoga, pilates, rehabilitation, corporate wellness.
8. **`data/trainers.json`** — ~10 trainers with full profiles, certs, ratings, specialties.
9. **`data/programs.json`** — ~6 curated programs with modules.
10. **`data/diet-plans.json`** — ~5 diet plans (keto, vegan muscle, balanced weight loss, etc.).
11. **`data/blog.json`** — ~8 realistic health blog posts.
12. **`data/testimonials.json`** — ~10 client testimonials.
13. **`data/stats.json`** — Platform stats: clients served, trainers, success rate, etc.
14. **`data/pricing.json`** — Tiered pricing per service category.
15. **`data/faq.json`** — ~12 FAQs.
16. **`data/site-config.json`** — Metadata, nav links, footer links, social media.

---

### Phase 3 — Schemas, Services & Store
**Goal:** Build the data layer — Zod schemas for form validation, service functions to read/filter/sort JSON data, and Zustand stores for global state.

#### Zod Schemas (`src/schemas/`)
1. **`contact.schema.ts`** — name (min 2), email, subject (enum), message (min 20), phone (optional, regex).
2. **`booking.schema.ts`** — Multi-step: `stepServiceSchema`, `stepScheduleSchema`, `stepPersonalSchema`, and a composed `bookingSchema`.
3. **`newsletter.schema.ts`** — email only.
4. **`filters.schema.ts`** — For services/trainer filter forms: category, priceRange, rating, availability.

#### Service Functions (`src/services/`)
These are pure functions — no side effects, just read JSON and return typed data:
1. **`services.service.ts`** — `getAllServices()`, `getServiceBySlug()`, `getServicesByCategory()`, `getFeaturedServices()`.
2. **`trainers.service.ts`** — `getAllTrainers()`, `getTrainerById()`, `getTrainersByService()`, `getFeaturedTrainers()`, `filterTrainers(filters)`.
3. **`programs.service.ts`** — `getAllPrograms()`, `getProgramBySlug()`, `getFeaturedPrograms()`.
4. **`diet-plans.service.ts`** — `getAllDietPlans()`, `getDietPlanBySlug()`.
5. **`blog.service.ts`** — `getAllPosts()`, `getPostBySlug()`, `getPostsByCategory()`, `getRecentPosts(n)`.
6. **`pricing.service.ts`** — `getPricingByService()`, `getAllPricing()`.

#### Zustand Stores (`src/store/`)
1. **`useBookingStore.ts`** — Multi-step booking state: `currentStep`, `selectedService`, `selectedTrainer`, `selectedDate`, `selectedTime`, `personalInfo`. Actions: `nextStep`, `prevStep`, `setService`, `setTrainer`, `resetBooking`.
2. **`useFiltersStore.ts`** — `category`, `priceRange`, `rating`, `searchQuery`, `sortBy`. Actions: `setFilter`, `resetFilters`.
3. **`useUIStore.ts`** — `isMobileMenuOpen`, `isBookingModalOpen`, `activeToast`. Actions: `toggleMobileMenu`, `openBookingModal`, `closeBookingModal`.

#### Custom Hooks (`src/hooks/`)
1. **`useServices.ts`** — Calls services.service, returns filtered/sorted services.
2. **`useTrainers.ts`** — Calls trainers.service with filter store integration.
3. **`usePrograms.ts`** — Calls programs.service.
4. **`useDebounce.ts`** — Generic debounce for search inputs.

---

### Phase 4 — Layout & Navigation Components
**Goal:** Build the persistent shell — Navbar, Footer, Theme Toggle, Mobile Menu.

#### Navbar
- Sticky, glass-morphic on scroll.
- Logo (SVG or text logo with brand gradient).
- Nav links: Home, Services (with dropdown listing service categories), Trainers, Programs, Pricing, Blog, Contact.
- CTA button: "Book a Session" → `/book`.
- Theme toggle (sun/moon icon animated).
- Mobile hamburger with Sheet drawer.

#### Footer
- 4-column: About blurb + socials | Services links | Quick links | Contact info.
- Newsletter subscription form (RHF + Zod `newsletter.schema`).
- Sonner toast on subscribe.
- Bottom bar: copyright, legal links.

#### ThemeToggle
- Animated sun ↔ moon icon swap using Framer Motion.
- Persisted via `next-themes` (`localStorage`).

#### MobileMenu
- Full-height slide-in Sheet from left.
- All nav links + CTA.
- Theme toggle at bottom.
- Auto-closes on route change.

#### RootLayout
- Wraps `<Navbar>` + `<Outlet>` + `<Footer>` + `<ScrollToTop>`.

#### BookingLayout
- Minimal: just Logo + step indicator + `<Outlet>`.

---

### Phase 5 — Common / Reusable Components
**Goal:** Build the design-system-level components used across multiple pages.

1. **`SectionHeading`** — `label` (small tag), `title`, `subtitle`. Animated underline on title. Accepts `align` prop.
2. **`ServiceCard`** — Icon, name, short description, category badge, price-from, `Link` to detail. Hover lift. Framer Motion entry animation.
3. **`TrainerCard`** — Avatar, name, title, rating stars, specialty tags, "View Profile" CTA.
4. **`ProgramCard`** — Program image/gradient, name, duration badge, level badge, price, short desc.
5. **`DietPlanCard`** — Goal tag, plan name, duration, calorie range, key macros bar, CTA.
6. **`BlogCard`** — Thumbnail, category, title, excerpt, author avatar + name, read time, date.
7. **`TestimonialCard`** — Quote, avatar, name, role/service, star rating.
8. **`PricingCard`** — Plan name, price, billing period, features list with checkmarks, popular badge, CTA.
9. **`StatCard`** — Animated number counter (Framer Motion), label, icon.
10. **`FilterBar`** — Category pills, search input, sort dropdown, price range select.
11. **`StarRating`** — Visual star rating display (read-only).
12. **`ProgressBadge`** — Level indicator (Beginner / Intermediate / Advanced) with color coding.
13. **`ScrollToTop`** — Floating button that appears after scroll, smooth scroll to top.

---

### Phase 6 — Pages (Core)
**Goal:** Build all pages in order of importance. Each page reads data via service hooks and renders with components.

#### Order of page creation:
1. **Home** — Most complex, most impactful. Full marketing page.
2. **Services** — Grid of all services with filter bar.
3. **ServiceDetail** — Hero, description, benefits, trainers offering it, pricing, CTA.
4. **Trainers** — Grid with filters (specialty, rating, price).
5. **TrainerProfile** — Full bio, certs, services offered, reviews, booking CTA.
6. **Pricing** — Pricing cards by service category + comparison table.
7. **Programs** — Grid of programs with level/goal filters.
8. **ProgramDetail** — Curriculum, schedule, trainer, enroll CTA.
9. **DietPlans** — Diet plan cards.
10. **DietPlanDetail** — Full plan breakdown.
11. **Blog** — Card grid with category filter.
12. **BlogPost** — Article view with related posts sidebar.
13. **About** — Company mission, values, team, partners.
14. **Contact** — RHF + Zod contact form, FAQ accordion, map placeholder, Sonner toast.
15. **NotFound** — Branded 404 with navigation links.

#### Home Page sections (in order):
- **HeroSection** — Full-screen gradient bg, animated tagline, sub-headline, two CTAs (Book Session + Browse Services). Floating health metric badges (steps, heart rate, etc.) as decorative elements.
- **ServicesOverview** — "Everything You Need" section. Horizontal scroll or grid of 6 featured service cards.
- **StatsSection** — Animated counters: 2000+ clients, 50+ trainers, 15+ services, 98% satisfaction.
- **HowItWorks** — 3-step process: Choose Service → Pick Trainer → Book & Transform.
- **FeaturedPrograms** — Carousel of featured programs.
- **FeaturedTrainers** — 3-4 trainer cards.
- **TestimonialsSection** — Embla carousel of testimonials.
- **CtaSection** — Bottom gradient CTA strip.

---

### Phase 7 — Booking Flow
**Goal:** Implement the multi-step booking form using RHF, Zod, and Zustand.

This is the site's primary conversion mechanism. It must be polished and smooth.

#### Steps:
1. **Step 1 — Select Service** — Service category pills + service cards. RHF with `stepServiceSchema`.
2. **Step 2 — Select Trainer & Schedule** — Filtered trainers for chosen service. Date picker (shadcn calendar or simple grid). Time slots. `stepScheduleSchema`.
3. **Step 3 — Personal Info** — Name, email, phone, special notes. `stepPersonalSchema`.
4. **Step 4 — Confirmation** — Summary of all selections. Fake "Submit Booking" button → Sonner success toast + reset store.

**Zustand booking store** persists state across steps. **Framer Motion** `AnimatePresence` for step transitions (slide left/right).

---

### Phase 8 — Polish & Final Touches
**Goal:** Micro-animations, SEO metadata, responsive fixes, performance.

1. **Framer Motion** `viewport` animations on all section entries (fade-up, stagger children).
2. **Lazy loading** all page components via `React.lazy` + `Suspense` with a skeleton loader.
3. **SEO** — Each page exports a `<title>` and `<meta name="description">` via a `PageMeta` component (wrapper around a simple head-tag update hook).
4. **Responsive** — Full mobile-to-desktop sweep. All grids use responsive breakpoints.
5. **Error boundaries** — Wrap routes in error boundaries with a branded error page.
6. **Accessibility** — All interactive elements have `aria-label`, keyboard navigation works, focus rings visible.
7. **Performance** — Image optimization hints, `will-change` on animated elements, debounced search.

---

## Open Questions

> [!IMPORTANT]
> Please answer these before we start Phase 1 — they affect what we build.

1. **Company/Brand Name** — What is the company called? I used "VitalEdge" as a placeholder. Do you have a name? This affects the logo, site title, and all JSON data.

2. **Authentication** — Will there be user accounts / login? (e.g., "My Bookings", saved trainers, profile page). If yes, I'll include auth-related Zustand store and protected route scaffolding (even without the backend). If no, booking is a pure form submission.

3. **Blog** — Will this be a real blog with CMS-like content, or is a static JSON-backed blog page sufficient for now?

4. **Payment** — Is the booking flow just a "request/inquiry" form, or should I design it as if payment processing happens (showing a payment step even as a stub)?

5. **Shadcn Missing Components** — A few shadcn primitives are not yet installed that we'll need: `calendar`, `slider`, `progress`, `switch`, `breadcrumb`, `table`, `popover`. Should I add them in Phase 1, or install as needed per phase?

6. **Imagery** — Should I generate placeholder images using AI for trainer avatars, service banners, blog thumbnails? Or do you want to plug in real images later (I'll use icon + gradient placeholders instead)?

---

## Verification Plan

### Per Phase
- TypeScript: `tsc --noEmit` must pass with zero errors.
- Visual: Browser screenshot after each phase.
- No inline styles: grep for `style=` across all `.tsx` files.
- No hardcoded strings in JSX: all data comes from JSON via service functions.

### Final
- `npm run build` succeeds.
- Lighthouse score: Performance > 85, Accessibility > 90, Best Practices > 95.
- All routes navigable without 404.
- Dark ↔ Light theme toggle works on every page.
- Booking flow completes all 4 steps without errors.
- All forms show Zod validation errors correctly.
- Responsive at 375px, 768px, 1024px, 1440px.
