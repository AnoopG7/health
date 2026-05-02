import { ROUTES } from './routes'

export const SITE_CONFIG = {
  name: 'VitalEdge',
  tagline: 'Your Edge to Total Health & Fitness',
  description:
    'Expert physiotherapy, personal training, diet plans, mental health support and more — all from certified third-party professionals, curated just for you.',
  url: 'https://vitaledge.health',
  socials: {
    twitter: 'https://twitter.com/vitaledge',
    instagram: 'https://instagram.com/vitaledge',
    facebook: 'https://facebook.com/vitaledge',
    linkedin: 'https://linkedin.com/company/vitaledge',
    youtube: 'https://youtube.com/@vitaledge',
  },
  contact: {
    email: 'hello@vitaledge.health',
    phone: '+1 (555) 123-4567',
    address: '123 Wellness Blvd, Suite 400, San Francisco, CA 94102',
  },
  navLinks: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Services', href: ROUTES.SERVICES },
    { label: 'Trainers', href: ROUTES.TRAINERS },
    { label: 'Programs', href: ROUTES.PROGRAMS },
    { label: 'Pricing', href: ROUTES.PRICING },
    { label: 'Blog', href: ROUTES.BLOG },
    { label: 'Contact', href: ROUTES.CONTACT },
  ],
  footerLinks: {
    services: [
      { label: 'Physiotherapy', href: ROUTES.SERVICE_DETAIL('physiotherapy') },
      { label: 'Personal Training', href: ROUTES.SERVICE_DETAIL('personal-training') },
      { label: 'Weight Loss', href: ROUTES.SERVICE_DETAIL('weight-loss') },
      { label: 'Diet Plans', href: ROUTES.SERVICE_DETAIL('diet-plans') },
      { label: 'Massage Therapy', href: ROUTES.SERVICE_DETAIL('massage-therapy') },
      { label: 'Mental Health', href: ROUTES.SERVICE_DETAIL('mental-health') },
    ],
    company: [
      { label: 'About Us', href: ROUTES.ABOUT },
      { label: 'Our Team', href: ROUTES.ABOUT + '#team' },
      { label: 'Careers', href: ROUTES.ABOUT + '#careers' },
      { label: 'Partners', href: ROUTES.ABOUT + '#partners' },
    ],
    support: [
      { label: 'Contact', href: ROUTES.CONTACT },
      { label: 'FAQ', href: ROUTES.CONTACT + '#faq' },
      { label: 'Pricing', href: ROUTES.PRICING },
      { label: 'Blog', href: ROUTES.BLOG },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
} as const
