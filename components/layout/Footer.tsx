import Link from 'next/link';
import { Linkedin, Twitter, Github, ArrowUpRight, Zap } from 'lucide-react';
import { siteConfig, CONTACT_EMAIL } from '@/lib/constants';

const footerLinks = {
  Company: [
    { label: 'About InRevTech', href: '/about' },
    { label: 'Founder / CEO', href: '/about/founder' },
    { label: 'Our Work', href: '/work' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
  Services: [
    { label: 'Web Development', href: '/services/web-design-development' },
    { label: 'Software Development', href: '/services/software-development' },
    { label: 'AI Solutions', href: '/services/ai-powered-solutions' },
    { label: 'Ecommerce', href: '/services/ecommerce-development' },
    { label: 'SEO Services', href: '/services/seo-services' },
    { label: 'Branding', href: '/services/branding' },
  ],
  Resources: [
    { label: 'Blog', href: '/insights' },
    { label: 'Guides', href: '/insights#guides' },
    { label: 'Case Studies', href: '/work#case-studies' },
    { label: 'Get a Quote', href: '/get-a-quote' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5 group w-fit">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg brand-gradient shadow-sm">
                <Zap className="w-4 h-4 text-white fill-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                InRev<span className="brand-gradient-text">Tech</span>
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              Premium technology solutions for companies that want to imagine boldly, create brilliantly, and make a real impact.
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              {CONTACT_EMAIL}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-3 mt-6">
              {siteConfig.links.linkedin && (
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {siteConfig.links.twitter && (
                <a
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {siteConfig.links.github && (
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{heading}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} InRevTech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
