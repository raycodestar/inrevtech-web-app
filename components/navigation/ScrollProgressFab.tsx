'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp, ChevronDown, List } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface TocHeading {
  id: string;
  level: string;
  text: string;
}

interface ScrollProgressFabProps {
  mode: 'blog' | 'service';
  headings?: TocHeading[];
  activeHeading?: string;
  onHeadingSelect?: (id: string) => void;
}

export function ScrollProgressFab({
  mode,
  headings = [],
  activeHeading,
  onHeadingSelect,
}: ScrollProgressFabProps) {
  const pathname = usePathname();
  const progressPathRef = useRef<SVGPathElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [pathLength, setPathLength] = useState(1);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [revealScrollY, setRevealScrollY] = useState(0);

  const isBlogRoute = pathname.startsWith('/insights/');
  const shouldRender = mode === 'blog' ? headings.length > 0 : !isBlogRoute;
  const isVisible = scrollY >= revealScrollY;
  const isAtEnd = progress > 0.9;
  const isUtilityMode = mode === 'service' || isDesktopViewport;
  const shouldCompactBlogHint = isVisible && scrollY > revealScrollY + 80;
  const isCompact = isUtilityMode || isAtEnd || shouldCompactBlogHint;
  const shouldShowArrow = isUtilityMode || isAtEnd;

  useEffect(() => {
    const path = progressPathRef.current;

    if (!path) {
      return;
    }

    setPathLength(path.getTotalLength());
  }, []);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');

    const syncDesktopViewport = () => {
      setIsDesktopViewport(desktopMediaQuery.matches);
    };

    syncDesktopViewport();
    desktopMediaQuery.addEventListener('change', syncDesktopViewport);

    return () => {
      desktopMediaQuery.removeEventListener('change', syncDesktopViewport);
    };
  }, []);

  useEffect(() => {
    if (!shouldRender) {
      return;
    }

    let animationFrameId: number | null = null;

    const getHeroSection = () => {
      if (mode === 'blog') {
        return progressPathRef.current
          ?.closest('.min-h-screen')
          ?.querySelector<HTMLElement>('section');
      }

      return document.querySelector<HTMLElement>('main section');
    };

    const updateProgress = () => {
      const currentScrollY = window.scrollY;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const heroSection = getHeroSection();

      setScrollY(currentScrollY);
      setRevealScrollY(
        heroSection
          ? Math.max(heroSection.offsetTop + heroSection.offsetHeight - 72, 0)
          : Math.round(window.innerHeight * 0.6)
      );

      setProgress(
        scrollableHeight > 0
          ? Math.min(Math.max(currentScrollY / scrollableHeight, 0), 1)
          : 0
      );
    };

    const scheduleProgressUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = null;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener('scroll', scheduleProgressUpdate, { passive: true });
    window.addEventListener('resize', scheduleProgressUpdate);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener('scroll', scheduleProgressUpdate);
      window.removeEventListener('resize', scheduleProgressUpdate);
    };
  }, [shouldRender]);

  if (!shouldRender) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFabClick = () => {
    if (isUtilityMode || isAtEnd) {
      scrollToTop();
      return;
    }

    setIsSheetOpen(true);
  };

  const handleHeadingClick = (id: string) => {
    onHeadingSelect?.(id);
    setIsSheetOpen(false);
  };

  const progressOffset = pathLength * (1 - progress);

  return (
    <>
      <button
        type="button"
        onClick={handleFabClick}
        aria-label={mode === 'blog' && !shouldShowArrow ? 'Open table of contents' : 'Back to top'}
        className={cn(
          'group fixed bottom-[84px] right-4 z-40 flex h-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-950/90 text-white shadow-2xl shadow-sky-950/30 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-slate-900/95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background lg:bottom-8 lg:right-8',
          isCompact ? 'w-10' : 'w-24 px-2',
          isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        )}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 56 56"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <path
            d="M17 2.5H39C47.008 2.5 53.5 8.992 53.5 17V39C53.5 47.008 47.008 53.5 39 53.5H17C8.992 53.5 2.5 47.008 2.5 39V17C2.5 8.992 8.992 2.5 17 2.5Z"
            className="stroke-white/10"
            strokeWidth="2"
            fill="none"
          />
          <path
            ref={progressPathRef}
            d="M17 2.5H39C47.008 2.5 53.5 8.992 53.5 17V39C53.5 47.008 47.008 53.5 39 53.5H17C8.992 53.5 2.5 47.008 2.5 39V17C2.5 8.992 8.992 2.5 17 2.5Z"
            stroke="url(#scroll-progress-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: progressOffset,
            }}
          />
          <defs>
            <linearGradient id="scroll-progress-gradient" x1="7" y1="49" x2="49" y2="7">
              <stop stopColor="#0ea5e9" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>

        <span className="relative flex items-center justify-center">
          <List
            className={cn(
              'h-3.5 w-3.5 transition-all duration-300',
              shouldShowArrow
                ? '-rotate-90 scale-75 opacity-0'
                : 'rotate-0 scale-100 opacity-100'
            )}
          />
          <ArrowUp
            className={cn(
              'absolute h-3.5 w-3.5 transition-all duration-300',
              shouldShowArrow
                ? 'rotate-0 scale-100 opacity-100'
                : 'rotate-90 scale-75 opacity-0'
            )}
          />
        </span>

        {mode === 'blog' && !isUtilityMode && (
          <span
            className={cn(
              'relative ml-2 whitespace-nowrap text-sm font-semibold transition-all duration-300',
              isCompact ? 'w-0 translate-x-2 opacity-0' : 'w-auto translate-x-0 opacity-100'
            )}
          >
            Contents
          </span>
        )}
      </button>

      {mode === 'blog' && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent
            side="bottom"
            className="flex h-[78vh] max-h-[720px] rounded-t-3xl border-border bg-background/95 p-0 backdrop-blur-xl"
          >
            <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-col">
              <SheetHeader className="border-b border-border px-5 py-5 text-left sm:px-6">
                <div className="mb-1 h-1.5 w-12 self-center rounded-full bg-muted sm:hidden" />
                <SheetTitle className="heading-display text-xl">Table of Contents</SheetTitle>
                <SheetDescription>
                  Jump to any section in this article.
                </SheetDescription>
              </SheetHeader>

              <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4 [scrollbar-width:thin] sm:px-5">
                <div className="space-y-1">
                  {headings.map((heading) => (
                    <button
                      key={heading.id}
                      type="button"
                      onClick={() => handleHeadingClick(heading.id)}
                      aria-current={activeHeading === heading.id ? 'location' : undefined}
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition-colors hover:bg-muted hover:text-primary',
                        heading.level === 'h3' && 'pl-7 text-[13px]',
                        activeHeading === heading.id
                          ? 'bg-primary/10 font-semibold text-primary'
                          : 'text-muted-foreground'
                      )}
                    >
                      <span>{heading.text}</span>
                      {activeHeading === heading.id && (
                        <ChevronDown className="h-4 w-4 -rotate-90" />
                      )}
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
