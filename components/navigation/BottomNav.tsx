'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Chrome as Home, Layers, Briefcase, BookOpen, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const bottomNavItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Services', href: '/services', icon: Layers },
  { label: 'Work', href: '/work', icon: Briefcase },
  { label: 'Insights', href: '/insights', icon: BookOpen },
  { label: 'Contact', href: '/contact', icon: MessageSquare },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-border bg-background/95 backdrop-blur-md safe-area-bottom">
      <div className="flex items-stretch h-16">
        {bottomNavItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-0.5 pt-2 pb-1 transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                className={cn(
                  'w-5 h-5 transition-all duration-200',
                  isActive && 'scale-110'
                )}
                strokeWidth={isActive ? 2.5 : 1.75}
              />
              <span
                className={cn(
                  'text-[10px] font-medium leading-none transition-all',
                  isActive && 'font-semibold'
                )}
              >
                {label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full brand-gradient" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
