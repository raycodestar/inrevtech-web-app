'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  ArrowRight,
  Code,
  Smartphone,
  Database,
  GitBranch,
  Workflow,
  Zap,
  Shield,
  Users,
  ChevronDown,
  CheckCircle2,
  Star,
  Clock,
  Globe,
  Server,
  Cloud,
  Lock,
  Scale,
  Cpu,
  Layers,
  Terminal,
  FileCode,
  Network,
  Puzzle,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GradientText } from '@/components/ui/GradientText';
import { cn } from '@/lib/utils';

const solutions = [
  {
    icon: Globe,
    title: 'Custom Web Apps',
    description: 'Scalable web applications built with modern frameworks, designed for performance and business growth.',
    link: '/services/web-design-development',
  },
  {
    icon: Smartphone,
    title: 'Mobile Solutions',
    description: 'Cross-platform mobile applications that deliver native performance with unified codebases.',
    link: '/services',
  },
  {
    icon: Server,
    title: 'Enterprise Systems',
    description: 'Robust, scalable enterprise software that handles complex workflows and high-volume operations.',
    link: '/services',
  },
  {
    icon: Database,
    title: 'Database Architecture',
    description: 'Optimized database design and architecture for data-intensive applications and analytics.',
    link: '/services',
  },
  {
    icon: Puzzle,
    title: 'API Integrations',
    description: 'Seamless third-party integrations and custom API development for connected business systems.',
    link: '/services',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Intelligent automation solutions that streamline operations and reduce manual overhead.',
    link: '/services',
  },
];

const edgePoints = [
  {
    icon: Zap,
    title: 'Performance First',
    description: 'We engineer for speed from day one. Optimized code, efficient algorithms, and measured performance metrics.',
  },
  {
    icon: Scale,
    title: 'Scalable Architecture',
    description: 'Systems designed to grow. Horizontal scaling, load balancing, and infrastructure that handles growth without rewrites.',
  },
  {
    icon: Users,
    title: 'Direct Technical Partnership',
    description: 'Work directly with senior engineers. No account managers, no communication layers — just technical collaboration.',
  },
  {
    icon: Layers,
    title: 'Modern Stack, Not Legacy',
    description: 'We build with current technologies, not outdated frameworks. Future-proof code that stays maintainable.',
  },
  {
    icon: Shield,
    title: 'Security and Maintainability',
    description: 'Security built in, not bolted on. Clean code, comprehensive testing, and documented architecture.',
  },
  {
    icon: Workflow,
    title: 'Built Around Business Workflows',
    description: 'Software that reflects how your business actually operates, not generic templates.',
  },
];

const lifecycle = [
  { step: '01', title: 'Discovery', description: 'Deep analysis of requirements, technical constraints, and business objectives.' },
  { step: '02', title: 'Prototyping', description: 'Rapid prototyping to validate assumptions and align on technical direction.' },
  { step: '03', title: 'Agile Development', description: 'Iterative development with regular deliverables and continuous feedback loops.' },
  { step: '04', title: 'QA & Launch', description: 'Comprehensive testing, security audits, and staged deployment to production.' },
  { step: '05', title: 'Maintenance & Growth', description: 'Ongoing support, performance monitoring, and iterative improvements.' },
];

const techStack = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'Go', 'GraphQL'] },
  { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Prisma'] },
  { category: 'Cloud / DevOps', items: ['AWS', 'Vercel', 'GitHub Actions', 'Docker', 'Cloudinary'] },
];

const pricing = [
  {
    name: 'Starter Software Solution',
    description: 'For businesses needing core software functionality and automation.',
    features: [
      'Custom web application',
      'Core feature development',
      'Database design and setup',
      'Basic API integrations',
      'Authentication system',
      'Admin dashboard',
      '3 months support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth Software Solution',
    description: 'For scaling businesses needing advanced features and integrations.',
    features: [
      'Full-stack application',
      'Advanced feature development',
      'Complex database architecture',
      'Multiple API integrations',
      'Role-based access control',
      'Analytics and reporting',
      'Performance optimization',
      '6 months support',
    ],
    cta: 'Build for Growth',
    popular: true,
  },
  {
    name: 'Enterprise Software Platform',
    description: 'For organizations requiring complex, mission-critical systems.',
    features: [
      'Enterprise-grade platform',
      'Custom architecture design',
      'Multi-tenant capabilities',
      'Advanced security setup',
      'Scalable infrastructure',
      'Custom integrations',
      'SLA and priority support',
      '12 months support',
    ],
    cta: 'Request Consultation',
    popular: false,
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, TechFlow Solutions',
    content: 'InRevTech delivered a complex inventory management system in 4 months. The architecture is solid, the code is clean, and the team understood our business requirements immediately.',
  },
  {
    name: 'Michael Okonkwo',
    role: 'Founder, EduConnect Africa',
    content: 'We needed a custom learning management platform. InRevTech built something that handles thousands of concurrent users without issues. Technical partnership at its best.',
  },
  {
    name: 'Priya Sharma',
    role: 'Operations Director, LogiTech',
    content: 'The workflow automation system they built reduced our processing time by 70%. Clean implementation, excellent documentation, and they actually delivered on time.',
  },
];

const faqs = [
  {
    q: 'How long does a custom software project take?',
    a: 'Timeline depends on complexity. A focused web application typically takes 8–16 weeks. Enterprise platforms may take 4–6 months. We provide detailed estimates during discovery.',
  },
  {
    q: 'Do you provide ongoing maintenance?',
    a: 'Yes. We offer maintenance plans that include security updates, bug fixes, performance monitoring, and feature iterations. Plans are tailored to your needs.',
  },
  {
    q: 'How do you handle data security and hosting?',
    a: 'Security is built into our process. We use encrypted databases, secure authentication, regular security audits, and deploy on compliant infrastructure. We can work with your hosting or recommend solutions.',
  },
  {
    q: 'Who owns the source code?',
    a: 'You own 100% of the source code. We deliver clean, documented code with full access. No vendor lock-in, no proprietary frameworks.',
  },
  {
    q: 'Can you integrate third-party tools and APIs?',
    a: 'Absolutely. We specialize in API integrations — payment gateways, CRMs, ERPs, marketing tools, and custom APIs. We build connected systems.',
  },
  {
    q: 'Can you improve an existing system?',
    a: 'Yes. We audit existing codebases, identify technical debt, and plan refactoring or migration strategies. We can improve performance, add features, or modernize the stack.',
  },
  {
    q: 'How do you handle performance, security, and scaling?',
    a: 'These are non-negotiable. We optimize for Core Web Vitals, implement security best practices, and design for horizontal scaling. Performance and security are measured, not assumed.',
  },
];

export default function SoftwareDevelopmentPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative py-24 sm:py-32 mesh-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Software Development</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold heading-display text-foreground mb-6">
              Custom Software That{' '}
              <GradientText>Drives Business</GradientText>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
              We build scalable, high-performance software solutions designed for your specific business challenges. 
              From web applications to enterprise systems, we deliver technical excellence with clear business outcomes.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Button asChild size="lg" className="brand-gradient border-0 text-white hover:opacity-90 h-12 px-8">
                <Link href="/get-a-quote">
                  Get a Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="#technical-stack">
                  View Our Stack
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Senior engineering team</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Modern technology stack</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Scalable architecture</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section
        className="py-12 border-y border-border bg-card/50 overflow-hidden"
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() => controls.start({ x: '-50%' })}
      >
        <div className="relative">
          <motion.div
            animate={controls}
            initial={{ x: 0 }}
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex items-center gap-16 whitespace-nowrap"
          >
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-16">
                {[
                  { name: 'React', icon: Cpu },
                  { name: 'Next.js', icon: Layers },
                  { name: 'Node.js', icon: Terminal },
                  { name: 'TypeScript', icon: FileCode },
                  { name: 'AWS', icon: Cloud },
                  { name: 'PostgreSQL', icon: Database },
                  { name: 'Docker', icon: Server },
                  { name: 'GitHub', icon: GitBranch },
                  { name: 'Vercel', icon: Globe },
                  { name: 'Supabase', icon: Shield },
                ].map((tech, i) => (
                  <div
                    key={`${setIndex}-${i}`}
                    className="flex items-center gap-3 text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer"
                  >
                    <tech.icon className="w-6 h-6" />
                    <span className="text-sm font-semibold">{tech.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Solutions Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Solutions"
            title="Software Development Services"
            description="Comprehensive software solutions tailored to your business requirements and technical objectives."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, i) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <solution.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{solution.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{solution.description}</p>
                <Link 
                  href={solution.link}
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. InRevTech Edge */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why InRevTech"
            title="The InRevTech Edge"
            description="Technical excellence combined with business understanding. Here's why serious businesses choose us."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {edgePoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <point.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Development Lifecycle */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Process"
            title="Development Lifecycle"
            description="A structured, transparent approach that reduces risk and delivers predictable outcomes."
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {lifecycle.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-4xl font-bold heading-display brand-gradient-text mb-4">{step.step}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                {i < lifecycle.length - 1 && (
                  <div className="hidden lg:block absolute top-4 right-0 w-8 h-px bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Technical Stack */}
      <section id="technical-stack" className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Technology"
            title="Technical Stack"
            description="We use modern, proven technologies that deliver performance, maintainability, and scalability."
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="text-sm font-semibold text-primary mb-4">{stack.category}</h3>
                <div className="space-y-2">
                  {stack.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Featured Case Study */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Case Study"
            title="Featured Project"
            description="A look at how we solve complex software challenges."
            className="mb-12"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-border bg-card p-8 sm:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">Enterprise</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">4 months</span>
                </div>
                <h3 className="text-2xl font-bold heading-display text-foreground mb-4">
                  TechFlow Inventory Management System
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Problem</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      TechFlow was managing inventory across 12 locations using spreadsheets and legacy software. 
                      Real-time visibility was impossible, stockouts occurred frequently, and reconciliation took days.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Solution</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Built a centralized inventory management system with real-time sync, automated reorder points, 
                      barcode scanning, and comprehensive reporting dashboards.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Result</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Stockouts reduced by 85%, reconciliation time from 3 days to 2 hours, and real-time visibility 
                      across all locations. System handles 50,000+ SKUs without performance issues.
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <Button asChild className="brand-gradient border-0 text-white hover:opacity-90">
                    <Link href="/work">
                      View More Work
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="bg-card/50 rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-foreground mb-4">Technology Stack</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind'] },
                    { label: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL'] },
                    { label: 'Infrastructure', items: ['AWS', 'Vercel', 'Redis'] },
                  ].map((group) => (
                    <div key={group.label}>
                      <div className="text-xs text-muted-foreground mb-2">{group.label}</div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span key={item} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. Selected Projects */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Portfolio"
            title="Selected Projects"
            description="A curated selection of our software development work."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'EduConnect Learning Platform',
                summary: 'Custom LMS with video streaming, progress tracking, and live classrooms for 10,000+ students.',
                tags: ['EdTech', 'Web App', 'Real-time'],
              },
              {
                title: 'LogiTech Workflow Automation',
                summary: 'Automated logistics platform reducing manual processing by 70% with custom routing algorithms.',
                tags: ['Automation', 'Logistics', 'API'],
              },
              {
                title: 'FinServe Banking Portal',
                summary: 'Secure banking portal with multi-factor authentication, transaction processing, and compliance reporting.',
                tags: ['FinTech', 'Security', 'Enterprise'],
              },
              {
                title: 'HealthPlus Telemedicine',
                summary: 'HIPAA-compliant telemedicine platform with video consultations, scheduling, and EHR integration.',
                tags: ['Healthcare', 'Video', 'Integration'],
              },
            ].map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0 h-auto">
                  <Link href="/work">
                    View Project
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Pricing / Engagement Options */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Engagement Options"
            title="Software Development Packages"
            description="Flexible engagement models designed to match your business stage and requirements."
            className="mb-16"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {pricing.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  'relative rounded-3xl border bg-card p-8 transition-all duration-300',
                  pkg.popular
                    ? 'border-primary/50 shadow-2xl shadow-primary/10 scale-105 z-10'
                    : 'border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5'
                )}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full brand-gradient text-white text-xs font-semibold shadow-lg">
                      <Star className="w-3.5 h-3.5" />
                      Most Popular
                      <Star className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pkg.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-foreground leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={cn(
                    'w-full h-12',
                    pkg.popular
                      ? 'brand-gradient border-0 text-white hover:opacity-90 shadow-lg'
                      : 'bg-card border-2 border-primary/20 text-foreground hover:bg-primary/5 hover:text-primary'
                  )}
                >
                  <Link href="/get-a-quote">
                    {pkg.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Testimonials */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Testimonials"
            title="What Clients Say"
            description="Feedback from businesses we've worked with."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{testimonial.content}</p>
                <div>
                  <div className="text-sm font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Strategic FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Common Questions"
            className="mb-12"
          />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-primary/5 transition-colors"
                >
                  <h3 className="text-sm font-semibold text-foreground pr-4">{faq.q}</h3>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-primary" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient opacity-[0.06]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.12)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold heading-display text-foreground mb-6">
              Build the Right{' '}
              <span className="brand-gradient-text">Software Solution</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Let&apos;s discuss your software requirements. We&apos;ll provide technical guidance, 
              honest estimates, and a clear path forward.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="brand-gradient border-0 text-white hover:opacity-90 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all h-12 px-8"
              >
                <Link href="/get-a-quote">
                  Get a Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/contact">
                  Book Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
