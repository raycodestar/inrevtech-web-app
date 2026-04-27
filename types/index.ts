export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface NavGroup {
  heading: string;
  items: NavItem[];
}

export interface MegaMenuConfig {
  label: string;
  groups: NavGroup[];
  featured?: {
    title: string;
    description: string;
    href: string;
    image?: string;
  };
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
  caseStudies?: string[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  tags: string[];
  results?: {
    label: string;
    value: string;
  }[];
  year: number;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
  rating: number;
  featured: boolean;
}

export interface InsightPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  publishedAt: string;
  readingTime: number;
  featured: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
  source?: string;
}

export interface QuoteFormData extends InquiryFormData {
  projectType: string;
  features: string[];
  hasExistingBrand: boolean;
  hasContent: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}
