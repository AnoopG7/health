import { lazy, Suspense, type ComponentType } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import RootLayout from '@/layouts/RootLayout'
import PageSkeleton from '@/components/common/PageSkeleton'

// ── Lazy imports (module-level, never recreated) ──────────────────────────
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

// ── Route config ──────────────────────────────────────────────────────────
interface RouteConfig {
  path: string
  element: ComponentType<unknown>
  children?: RouteConfig[]
}

const routes: RouteConfig[] = [
  { path: ROUTES.HOME, element: Home },
  { path: ROUTES.SERVICES, element: Services },
  { path: '/services/:slug', element: ServiceDetail },
  { path: ROUTES.TRAINERS, element: Trainers },
  { path: '/trainers/:id', element: TrainerProfile },
  { path: ROUTES.PROGRAMS, element: Programs },
  { path: '/programs/:slug', element: ProgramDetail },
  { path: ROUTES.DIET_PLANS, element: DietPlans },
  { path: '/diet-plans/:slug', element: DietPlanDetail },
  { path: ROUTES.BLOG, element: Blog },
  { path: '/blog/:slug', element: BlogPost },
  { path: ROUTES.ABOUT, element: About },
  { path: ROUTES.CONTACT, element: Contact },
  { path: ROUTES.PRICING, element: Pricing },
  { path: ROUTES.LOGIN, element: Login },
  { path: ROUTES.REGISTER, element: Register },
  { path: ROUTES.FORGOT_PASSWORD, element: ForgotPassword },
  { path: ROUTES.ACCOUNT, element: Dashboard },
  { path: ROUTES.ACCOUNT_BOOKINGS, element: MyBookings },
  { path: ROUTES.ACCOUNT_PROFILE, element: Profile },
  { path: ROUTES.ACCOUNT_SETTINGS, element: Settings },
  { path: ROUTES.SHOWCASE, element: Showcase },
]

// ── Helper: Suspense-wrapped lazy route ───────────────────────────────────
function LazyRoute({ element: Component }: { element: ComponentType<unknown> }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Component />
    </Suspense>
  )
}

// ── Recursive route renderer ──────────────────────────────────────────────
function renderRoutes(routeList: RouteConfig[]): React.ReactNode[] {
  return routeList.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={<LazyRoute element={route.element} />}
    >
      {route.children ? renderRoutes(route.children) : undefined}
    </Route>
  ))
}

// ── App Routes ────────────────────────────────────────────────────────────
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {renderRoutes(routes)}
      </Route>

      {/* Booking flow (standalone, no navbar/footer) */}
      <Route path="/book/:serviceSlug" element={<LazyRoute element={Booking} />} />

      {/* Catch-all 404 */}
      <Route path="*" element={<LazyRoute element={NotFound} />} />
    </Routes>
  )
}
