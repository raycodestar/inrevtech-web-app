import type { ValidIconName } from './iconTypes';

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: ValidIconName;
  badge?: string;
}

export interface NavGroup {
  heading?: string;
  items: NavLink[];
}

export interface MegaMenuConfig {
  label: string;
  href: string;
  groups: NavGroup[];
  featured?: {
    label: string;
    title: string;
    description: string;
    href: string;
    cta: string;
  };
}

export interface SimpleNavLink {
  label: string;
  href: string;
}

export const megaMenus: MegaMenuConfig[] = [
  {
    label: 'About',
    href: '/about',
    groups: [
      {
        items: [
          {
            label: 'About InRevTech',
            href: '/about',
            description: 'Our story, mission, values, and vision for the future.',
            icon: 'Building2',
          },
          {
            label: 'Founder / CEO',
            href: '/about/founder',
            description: 'Meet Raymond Zion — the mind behind InRevTech.',
            icon: 'User',
          },
        ],
      },
    ],
    featured: {
      label: 'Our Mission',
      title: 'Imagine. Create. Impact.',
      description: 'We exist to help ambitious companies build technology that changes industries.',
      href: '/about',
      cta: 'Learn our story',
    },
  },
  {
    label: 'Services',
    href: '/services',
    groups: [
      {
        heading: 'Build & Design',
        items: [
          {
            label: 'Web Design & Development',
            href: '/services/web-design-development',
            description: 'Premium websites built to convert and scale.',
            icon: 'Globe',
          },
          {
            label: 'Software Development',
            href: '/services/software-development',
            description: 'Custom software engineered for your challenges.',
            icon: 'Code',
          },
          {
            label: 'Ecommerce Development',
            href: '/services/ecommerce-development',
            description: 'High-converting online stores at scale.',
            icon: 'ShoppingCart',
          },
          {
            label: 'Branding',
            href: '/services/branding',
            description: 'Strategic identity that builds trust.',
            icon: 'Sparkles',
          },
        ],
      },
      {
        heading: 'Grow & Optimize',
        items: [
          {
            label: 'AI-Powered Solutions',
            href: '/services/ai-powered-solutions',
            description: 'Intelligent automation and AI integration.',
            icon: 'Brain',
            badge: 'New',
          },
          {
            label: 'SEO Services',
            href: '/services/seo-services',
            description: 'Data-driven SEO for sustainable growth.',
            icon: 'TrendingUp',
          },
          {
            label: 'Website Maintenance',
            href: '/services/website-maintenance',
            description: 'Proactive care that keeps you running.',
            icon: 'Shield',
          },
        ],
      },
      {
        heading: 'Not sure where to start?',
        items: [
          {
            label: 'Get a Free Consultation',
            href: '/get-a-quote',
            description: "Tell us about your project and we'll recommend the right approach.",
            icon: 'MessageSquare',
          },
          {
            label: 'Explore All Services',
            href: '/services',
            description: 'Browse our full range of technology services.',
            icon: 'ArrowRight',
          },
        ],
      },
    ],
  },
  {
    label: 'Work',
    href: '/work',
    groups: [
      {
        items: [
          {
            label: 'Case Studies',
            href: '/work#case-studies',
            description: 'Deep-dives into our most impactful projects.',
            icon: 'BookOpen',
          },
          {
            label: 'Projects',
            href: '/work',
            description: 'Browse our full portfolio of work.',
            icon: 'Briefcase',
          },
        ],
      },
    ],
    featured: {
      label: 'Featured Work',
      title: 'NexaFlow SaaS Platform',
      description: '+340% user growth. Built in 4 months. See how we did it.',
      href: '/work/nexaflow-saas-platform',
      cta: 'View case study',
    },
  },
  {
    label: 'Insights',
    href: '/insights',
    groups: [
      {
        items: [
          {
            label: 'Blog',
            href: '/insights',
            description: 'Expert takes on tech, design, and digital strategy.',
            icon: 'Rss',
          },
          {
            label: 'Guides',
            href: '/insights#guides',
            description: 'In-depth guides and frameworks for builders.',
            icon: 'Map',
          },
        ],
      },
    ],
    featured: {
      label: 'Latest Article',
      title: 'AI Integration for SaaS in 2025',
      description: 'A practical framework for embedding AI without sacrificing performance.',
      href: '/insights/ai-integration-saas-products-2025',
      cta: 'Read the guide',
    },
  },
];

export const simpleLinks: SimpleNavLink[] = [
  { label: 'Contact', href: '/contact' },
];
