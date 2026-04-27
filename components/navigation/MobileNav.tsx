'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { megaMenus, simpleLinks } from './navConfig';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setExpandedMenu(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background border-l border-border shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-end px-5 h-16 border-b border-border flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 pb-32">
          {megaMenus.map((menu) => (
            <div key={menu.label} className="border-b border-border/50 last:border-0">
              <button
                className="flex items-center justify-between w-full py-3.5 text-sm font-medium text-foreground"
                onClick={() =>
                  setExpandedMenu(expandedMenu === menu.label ? null : menu.label)
                }
              >
                {menu.label}
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-muted-foreground transition-transform duration-200',
                    expandedMenu === menu.label && 'rotate-180'
                  )}
                />
              </button>

              {expandedMenu === menu.label && (
                <div className="pb-3 space-y-1">
                  {menu.groups.map((group, gi) => (
                    <div key={gi}>
                      {group.heading && (
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground px-2 py-1.5">
                          {group.heading}
                        </p>
                      )}
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full brand-gradient text-white">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {simpleLinks.map((link) => (
            <div key={link.href} className="border-b border-border/50">
              <Link
                href={link.href}
                onClick={onClose}
                className="flex items-center py-3.5 text-sm font-medium text-foreground"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex-shrink-0 border-t border-border p-4 pb-6 bg-background">
          <Button
            asChild
            className="w-full brand-gradient border-0 text-white hover:opacity-90"
          >
            <Link href="/get-a-quote" onClick={onClose}>
              Get a Quote
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
