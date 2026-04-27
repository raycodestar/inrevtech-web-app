'use client';

import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MegaMenuConfig } from './navConfig';
import { isValidIconName } from './iconTypes';

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  // Validate icon name before attempting to render
  if (!isValidIconName(name)) {
    console.warn(`Invalid icon name: "${name}". Using fallback icon.`);
    return <HelpCircle className={className} />;
  }

  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  if (!IconComponent) {
    // Additional fallback in case lucide-react changes
    return <HelpCircle className={className} />;
  }
  return <IconComponent className={className} />;
}

interface MegaMenuProps {
  config: MegaMenuConfig;
  isOpen: boolean;
  onClose?: () => void;
}

export function MegaMenu({ config, isOpen, onClose }: MegaMenuProps) {
  return (
    <div
      className={cn(
        'absolute top-full left-1/2 -translate-x-1/2 pt-2 w-max min-w-[600px] max-w-[780px] z-[100]',
        'transition-all duration-200',
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      )}
    >
      <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden">
        <div className="flex">
          {!config.featured && config.groups.length === 3 ? (
            // 3-column layout for Services menu
            <div className="flex-1 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {config.groups.map((group, i) => (
                  <div key={i}>
                    {group.heading && (
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-2">
                        {group.heading}
                      </p>
                    )}
                    <div className="grid grid-cols-1 gap-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted/60"
                        >
                          {item.icon && (
                            <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <DynamicIcon
                                name={item.icon}
                                className="w-4 h-4 text-primary"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full brand-gradient text-white">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Original layout with featured sidebar
            <>
              <div className="flex-1 p-6">
                <div className="grid grid-cols-1 gap-6">
                  {config.groups.map((group, i) => (
                    <div key={i}>
                      {group.heading && (
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-2">
                          {group.heading}
                        </p>
                      )}
                      <div className="grid grid-cols-1 gap-1">
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted/60"
                          >
                            {item.icon && (
                              <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <DynamicIcon
                                  name={item.icon}
                                  className="w-4 h-4 text-primary"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full brand-gradient text-white">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {config.featured && (
                <div className="w-64 border-l border-border bg-muted/30 p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                      {config.featured.label}
                    </p>
                    <h4 className="text-sm font-semibold text-foreground mb-2 leading-tight">
                      {config.featured.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {config.featured.description}
                    </p>
                  </div>
                  <Link
                    href={config.featured.href}
                    onClick={onClose}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                  >
                    {config.featured.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
