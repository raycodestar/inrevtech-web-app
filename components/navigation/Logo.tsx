import Link from 'next/link';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  compact?: boolean;
}

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2 group select-none', className)}
      aria-label="InRevTech — Home"
    >
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg brand-gradient shadow-md group-hover:shadow-lg transition-shadow duration-200">
        <Zap className="w-4 h-4 text-white fill-white" strokeWidth={2.5} />
      </div>
      {!compact && (
        <span className="font-bold text-xl tracking-tight text-foreground font-display">
          InRev<span className="brand-gradient-text">Tech</span>
        </span>
      )}
    </Link>
  );
}
