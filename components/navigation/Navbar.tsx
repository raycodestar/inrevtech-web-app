'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { MegaMenu } from './MegaMenu';
import { MobileNav } from './MobileNav';
import { megaMenus, simpleLinks } from './navConfig';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMenu = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 300);
  };

  const cancelClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleMenuClose = () => {
    setActiveMenu(null);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[60] transition-all duration-300',
          scrolled
            ? 'border-b border-border bg-background/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo />

          <div className="hidden lg:flex items-center gap-1">
            {megaMenus.map((menu) => (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => openMenu(menu.label)}
                onMouseLeave={closeMenu}
              >
                <button
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    activeMenu === menu.label
                      ? 'text-primary bg-muted/60'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  )}
                  aria-expanded={activeMenu === menu.label}
                  aria-haspopup="true"
                >
                  {menu.label}
                  <ChevronDown
                    className={cn(
                      'w-3.5 h-3.5 transition-transform duration-200',
                      activeMenu === menu.label && 'rotate-180'
                    )}
                  />
                </button>

                <div
                  onMouseEnter={cancelClose}
                  onMouseLeave={closeMenu}
                >
                  <MegaMenu
                    config={menu}
                    isOpen={activeMenu === menu.label}
                    onClose={handleMenuClose}
                  />
                </div>
              </div>
            ))}

            {simpleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden lg:flex brand-gradient border-0 text-white hover:opacity-90 shadow-md hover:shadow-lg transition-all">
              <Link href="/get-a-quote">Get a Quote</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden w-9 h-9"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </nav>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
