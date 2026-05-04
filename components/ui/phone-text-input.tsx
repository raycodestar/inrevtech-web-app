'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export const PhoneTextInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex-1 rounded-r-md bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground',
      className
    )}
    {...props}
  />
));

PhoneTextInput.displayName = 'PhoneTextInput';
