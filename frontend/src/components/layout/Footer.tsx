import { Link } from 'react-router-dom'
import { SITE_CONFIG } from '@/constants/site-config'
import { Globe } from 'lucide-react'
import NewsletterForm from '@/components/forms/NewsletterForm'

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold gradient-text">
              {SITE_CONFIG.name}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {SITE_CONFIG.description}
            </p>
            <div className="flex gap-3">
              {[
                { label: 'Twitter', href: SITE_CONFIG.socials.twitter },
                { label: 'Instagram', href: SITE_CONFIG.socials.instagram },
                { label: 'Facebook', href: SITE_CONFIG.socials.facebook },
                { label: 'LinkedIn', href: SITE_CONFIG.socials.linkedin },
                { label: 'YouTube', href: SITE_CONFIG.socials.youtube },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Globe className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Services</h4>
            <ul className="space-y-2">
              {SITE_CONFIG.footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {SITE_CONFIG.footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Stay Updated</h4>
            <p className="mb-3 text-sm text-muted-foreground">
              Get health tips and exclusive offers in your inbox.
            </p>
            <NewsletterForm />
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>{SITE_CONFIG.contact.email}</p>
              <p>{SITE_CONFIG.contact.phone}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
            <div className="flex gap-4">
              {SITE_CONFIG.footerLinks.legal.map((link) => (
                <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
