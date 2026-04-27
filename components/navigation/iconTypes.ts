/**
 * Valid icon names from lucide-react
 * This file serves as a type-safe reference for icon names used in navigation
 * 
 * To add a new icon, import it from lucide-react and add it to this union type
 */

import type { LucideIcon } from 'lucide-react';

// Common icons used in navigation
export type ValidIconName =
  | 'Building2'
  | 'User'
  | 'Globe'
  | 'Code'
  | 'ShoppingCart'
  | 'Sparkles'
  | 'Brain'
  | 'TrendingUp'
  | 'Shield'
  | 'BookOpen'
  | 'Briefcase'
  | 'Rss'
  | 'Map'
  | 'HelpCircle'
  | 'MessageSquare'
  | 'ArrowRight';

/**
 * Type-safe icon mapping
 * Use this to ensure only valid icons are used in navigation config
 */
export const VALID_ICONS: Record<ValidIconName, boolean> = {
  Building2: true,
  User: true,
  Globe: true,
  Code: true,
  ShoppingCart: true,
  Sparkles: true,
  Brain: true,
  TrendingUp: true,
  Shield: true,
  BookOpen: true,
  Briefcase: true,
  Rss: true,
  Map: true,
  HelpCircle: true,
  MessageSquare: true,
  ArrowRight: true,
};

/**
 * Check if an icon name is valid
 */
export function isValidIconName(name: string): name is ValidIconName {
  return name in VALID_ICONS;
}
