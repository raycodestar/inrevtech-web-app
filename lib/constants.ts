import type { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'InRevTech',
  description:
    'InRevTech is a premium technology company specializing in web design, software development, AI-powered solutions, and digital transformation.',
  url: 'https://inrevtech.com',
  ogImage: 'https://inrevtech.com/og.png',
  links: {
    twitter: 'https://twitter.com/inrevtech',
    linkedin: 'https://linkedin.com/company/inrevtech',
    github: 'https://github.com/inrevtech',
  },
};

export const CONTACT_EMAIL = 'contact@inrevtech.com';
export const CONTACT_PHONE = '+1 (555) 000-0000';
export const CONTACT_ADDRESS = 'Remote-first · Serving clients globally';

export const SERVICES = [
  'Web Design & Development',
  'Website Maintenance',
  'Software Development',
  'AI-Powered Solutions',
  'Ecommerce Development',
  'SEO Services',
  'Branding',
] as const;

export type ServiceType = (typeof SERVICES)[number];

export const BUDGET_RANGES = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000+',
  'Not sure yet',
] as const;

export const TIMELINES = [
  'ASAP',
  '1 – 2 months',
  '3 – 6 months',
  '6+ months',
  'Flexible',
] as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
] as const;

export const BOTTOM_NAV = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'Services', href: '/services', icon: 'Layers' },
  { label: 'Work', href: '/work', icon: 'Briefcase' },
  { label: 'Insights', href: '/insights', icon: 'BookOpen' },
  { label: 'Contact', href: '/contact', icon: 'MessageSquare' },
] as const;
