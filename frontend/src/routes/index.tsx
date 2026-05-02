import { lazy, Suspense, type ComponentType } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { RootLayout, AuthLayout, BookingLayout } from '@/layouts'
import { ProtectedRoute } from '@/components/auth'
import PageSkeleton from '@/components/common/PageSkeleton'

// ── Lazy imports ──────────────────────────────────────────────────────────
const Home = lazy(() => import('@/pages/home/Home'))
const Services = lazy(() => import('@/pages/services/Services'))
const ServiceDetail = lazy(() => import('@/pages/services/ServiceDetail'))
const Trainers = lazy(() => import('@/pages/trainers/Trainers'))
const TrainerProfile = lazy(() => import('@/pages/trainers/TrainerProfile'))
const Programs = lazy(() => import('@/pages/programs/Programs'))
const ProgramDetail = lazy(() => import('@/pages/programs/ProgramDetail'))
const DietPlans = lazy(() => import('@/pages/diet-plans/DietPlans'))
const DietPlanDetail = lazy(() => import('@/pages/diet-plans/DietPlanDetail'))
const Blog = lazy(() => import('@/pages/blog/Blog'))
const BlogPost = lazy(() => import('@/pages/blog/BlogPost'))
const About = lazy(() => import('@/pages/misc/About'))
const Contact = lazy(() => import('@/pages/misc/Contact'))
const Pricing = lazy(() => import('@/pages/misc/Pricing'))
const NotFound = lazy(() => import('@/pages/misc/NotFound'))
const Login = lazy(() => import('@/pages/auth/Login'))
const Register = lazy(() => import('@/pages/auth/Register'))
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'))
const Dashboard = lazy(() => import('@/pages/account/Dashboard'))
const MyBookings = lazy(() => import('@/pages/account/MyBookings'))
const Profile = lazy(() => import('@/pages/account/Profile'))
const Settings = lazy(() => import('@/pages/account/Settings'))
const Showcase = lazy(() => import('@/pages/Showcase'))
const Booking = lazy(() => import('@/pages/booking/Booking'))

// ── Helpers ───────────────────────────────────────────────────────────────
function LazyRoute({ element: Component }: { element: ComponentType<unknown> }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Component />
    </Suspense>
  )
}

function ProtectedLazyRoute({ element: Component }: { element: ComponentType<unknown> }) {
  return (
    <ProtectedRoute>
      <LazyRoute element={Component} />
    </ProtectedRoute>
  )
}

function AuthLazyRoute({ element: Component }: { element: ComponentType<unknown> }) {
  return (
    <ProtectedRoute requireAuth={false}>
      <LazyRoute element={Component} />
    </ProtectedRoute>
  )
}

// ── Routes ────────────────────────────────────────────────────────────────
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes with full layout */}
      <Route element={<RootLayout />}>
        <Route path={ROUTES.HOME} element={<LazyRoute element={Home} />} />
        <Route path={ROUTES.SERVICES} element={<LazyRoute element={Services} />} />
        <Route path="/services/:slug" element={<LazyRoute element={ServiceDetail} />} />
        <Route path={ROUTES.TRAINERS} element={<LazyRoute element={Trainers} />} />
        <Route path="/trainers/:id" element={<LazyRoute element={TrainerProfile} />} />
        <Route path={ROUTES.PROGRAMS} element={<LazyRoute element={Programs} />} />
        <Route path="/programs/:slug" element={<LazyRoute element={ProgramDetail} />} />
        <Route path={ROUTES.DIET_PLANS} element={<LazyRoute element={DietPlans} />} />
        <Route path="/diet-plans/:slug" element={<LazyRoute element={DietPlanDetail} />} />
        <Route path={ROUTES.BLOG} element={<LazyRoute element={Blog} />} />
        <Route path="/blog/:slug" element={<LazyRoute element={BlogPost} />} />
        <Route path={ROUTES.ABOUT} element={<LazyRoute element={About} />} />
        <Route path={ROUTES.CONTACT} element={<LazyRoute element={Contact} />} />
        <Route path={ROUTES.PRICING} element={<LazyRoute element={Pricing} />} />
        <Route path={ROUTES.SHOWCASE} element={<LazyRoute element={Showcase} />} />
        <Route path="*" element={<LazyRoute element={NotFound} />} />
      </Route>

      {/* Auth routes with minimal layout */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<AuthLazyRoute element={Login} />} />
        <Route path={ROUTES.REGISTER} element={<AuthLazyRoute element={Register} />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<AuthLazyRoute element={ForgotPassword} />} />
      </Route>

      {/* Protected account routes with full layout */}
      <Route element={<RootLayout />}>
        <Route path={ROUTES.ACCOUNT} element={<ProtectedLazyRoute element={Dashboard} />} />
        <Route path={ROUTES.ACCOUNT_BOOKINGS} element={<ProtectedLazyRoute element={MyBookings} />} />
        <Route path={ROUTES.ACCOUNT_PROFILE} element={<ProtectedLazyRoute element={Profile} />} />
        <Route path={ROUTES.ACCOUNT_SETTINGS} element={<ProtectedLazyRoute element={Settings} />} />
      </Route>

      {/* Booking flow (standalone layout) */}
      <Route element={<BookingLayout />}>
        <Route path="/book/:serviceSlug" element={<ProtectedLazyRoute element={Booking} />} />
      </Route>
    </Routes>
  )
}
