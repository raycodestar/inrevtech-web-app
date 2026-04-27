import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <div className={cn('flex items-center gap-2 mb-4', align === 'center' && 'justify-center')}>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="w-5 h-px brand-gradient" />
            {eyebrow}
            <span className="w-5 h-px brand-gradient" />
          </span>
        </div>
      )}
      <h2
        className={cn(
          'text-3xl sm:text-4xl lg:text-5xl font-bold heading-display text-foreground',
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  );
}
