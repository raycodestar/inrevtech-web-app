'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  ArrowRight,
  Palette,
  Target,
  Layers,
  Sparkles,
  Shield,
  TrendingUp,
  Zap,
  Users,
  ChevronDown,
  CheckCircle2,
  Star,
  FileText,
  Image,
  Share2,
  RefreshCw,
  Award,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  Store,
  User,
  Building,
  Building2,
  Globe,
  Layout,
  Megaphone,
  PenTool,
  Fingerprint,
  Lightbulb,
  Eye,
  MessageSquare,
  FileCheck,
  Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GradientText } from '@/components/ui/GradientText';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: Fingerprint,
    title: 'Logo & Visual Identity',
    description: 'Distinctive logos and complete visual identity systems that make your brand memorable.',
    link: '/services',
  },
  {
    icon: Target,
    title: 'Brand Strategy',
    description: 'Strategic positioning, messaging frameworks, and brand architecture for clear direction.',
    link: '/services',
  },
  {
    icon: FileText,
    title: 'Brand Guidelines',
    description: 'Comprehensive brand books and guidelines ensuring consistency across all touchpoints.',
    link: '/services',
  },
  {
    icon: Share2,
    title: 'Social Media Branding',
    description: 'Social media visual systems and templates that build cohesive online presence.',
    link: '/services',
  },
  {
    icon: Megaphone,
    title: 'Marketing Collateral',
    description: 'Brochures, presentations, and marketing materials that communicate your value.',
    link: '/services',
  },
  {
    icon: RefreshCw,
    title: 'Rebranding & Refresh',
    description: 'Strategic brand refreshes and complete rebrands for evolving businesses.',
    link: '/services',
  },
];

const edgePoints = [
  {
    icon: Lightbulb,
    title: 'Strategy Before Design',
    description: 'We start with business goals, audience insights, and strategic positioning before any design work.',
  },
  {
    icon: Globe,
    title: 'Built for Modern Digital Presence',
    description: 'Brands designed for today\'s digital landscape — websites, social media, and beyond.',
  },
  {
    icon: Layers,
    title: 'Consistency Across Platforms',
    description: 'Cohesive brand systems that work seamlessly across all channels and touchpoints.',
  },
  {
    icon: Award,
    title: 'Premium Professional Presentation',
    description: 'High-quality design that positions your business as credible and established.',
  },
  {
    icon: TrendingUp,
    title: 'Branding That Supports Growth',
    description: 'Scalable brand systems that grow with your business and support expansion.',
  },
  {
    icon: Users,
    title: 'Direct Creative Partnership',
    description: 'Work directly with senior designers. No account managers, just creative collaboration.',
  },
];

const process = [
  { step: '01', title: 'Discovery & Brand Audit', description: 'Deep analysis of current brand, market position, competitors, and business objectives.' },
  { step: '02', title: 'Positioning & Direction', description: 'Define brand strategy, positioning, messaging, and creative direction.' },
  { step: '03', title: 'Identity Design', description: 'Create logo, visual identity, and brand system elements.' },
  { step: '04', title: 'Brand System Development', description: 'Build comprehensive guidelines, templates, and asset libraries.' },
  { step: '05', title: 'Rollout Assets', description: 'Prepare and deliver all brand assets for immediate use across channels.' },
  { step: '06', title: 'Support & Refinement', description: 'Ongoing support, implementation guidance, and brand refinement as needed.' },
];

const outcomes = [
  {
    icon: Eye,
    title: 'Stronger First Impressions',
    description: 'Professional design that captures attention and communicates credibility instantly.',
  },
  {
    icon: Shield,
    title: 'Better Brand Consistency',
    description: 'Unified visual language across all touchpoints builds recognition and trust.',
  },
  {
    icon: TrendingUp,
    title: 'More Professional Positioning',
    description: 'Elevated brand presentation that positions you ahead of competitors.',
  },
  {
    icon: MessageSquare,
    title: 'Clearer Communication',
    description: 'Strategic messaging and visual hierarchy that communicates value clearly.',
  },
  {
    icon: Globe,
    title: 'More Trust Across Channels',
    description: 'Consistent, professional presence builds trust with customers and partners.',
  },
  {
    icon: Rocket,
    title: 'Easier Marketing Execution',
    description: 'Brand assets and templates that make marketing faster and more effective.',
  },
];

const deliverables = [
  { icon: Fingerprint, name: 'Logo Suite' },
  { icon: Palette, name: 'Color & Typography System' },
  { icon: FileText, name: 'Brand Guidelines' },
  { icon: Share2, name: 'Social Media Templates' },
  { icon: Briefcase, name: 'Business Stationery' },
  { icon: Layout, name: 'Presentation/Proposal Assets' },
  { icon: Megaphone, name: 'Marketing Brand Assets' },
];

const industries = [
  { icon: Rocket, name: 'Startups' },
  { icon: GraduationCap, name: 'Schools' },
  { icon: HeartHandshake, name: 'NGOs' },
  { icon: Store, name: 'Retail Businesses' },
  { icon: Briefcase, name: 'Service Businesses' },
  { icon: User, name: 'Personal Brands' },
  { icon: Building, name: 'Hospitality & Tourism' },
  { icon: Building2, name: 'Professional Firms' },
];

const pricing = [
  {
    name: 'Brand Starter',
    description: 'For new businesses needing foundational brand identity.',
    features: [
      'Logo design',
      'Primary color palette',
      'Typography system',
      'Basic brand guidelines',
      'Business card design',
      'Social media profile graphics',
      '3 logo file formats',
      '1 revision round',
    ],
    cta: 'Start Your Brand',
    popular: false,
  },
  {
    name: 'Growth Identity',
    description: 'For growing businesses needing comprehensive brand systems.',
    features: [
      'Complete logo suite',
      'Full color & typography system',
      'Comprehensive brand guidelines',
      'Social media template kit',
      'Stationery design suite',
      'Presentation templates',
      'All file formats',
      '2 revision rounds',
    ],
    cta: 'Build Your Identity',
    popular: true,
  },
  {
    name: 'Brand System Pro',
    description: 'For established businesses needing complete brand transformation.',
    features: [
      'Strategic brand positioning',
      'Complete visual identity system',
      'Detailed brand book',
      'Full asset library',
      'Marketing collateral suite',
      'Implementation guidelines',
      'Priority support',
      'Unlimited revisions',
    ],
    cta: 'Transform Your Brand',
    popular: false,
  },
];

const testimonials = [
  {
    name: 'Fatima Ahmed',
    role: 'Founder, EduLearn Academy',
    content: 'InRevTech transformed our school\'s brand completely. The new identity communicates professionalism and trust. Enrollment inquiries increased by 35% after the rebrand.',
  },
  {
    name: 'James Kariuki',
    role: 'CEO, TechFlow Solutions',
    content: 'We needed a brand that reflected our technical expertise. The strategic approach before design made all the difference. Our brand now clearly communicates our value proposition.',
  },
  {
    name: 'Linda Mwamba',
    role: 'Director, GreenEarth NGO',
    content: 'The brand guidelines are comprehensive and easy to use. Our team now produces consistent materials across all channels. The rebrand elevated our credibility significantly.',
  },
];

const faqs = [
  {
    q: 'What is included in a branding package?',
    a: 'Packages vary by scope but typically include logo design, color and typography systems, brand guidelines, and key marketing assets. We customize based on your specific needs.',
  },
  {
    q: 'Do you only design logos or full brand systems?',
    a: 'We build complete brand systems. While logos are important, we focus on strategic positioning, visual identity, guidelines, and assets that work together cohesively.',
  },
  {
    q: 'Can you help rebrand an existing business?',
    a: 'Yes. We conduct brand audits, identify improvement areas, and plan strategic rebrands. Whether refresh or complete overhaul, we ensure the new brand aligns with your goals.',
  },
  {
    q: 'Will I receive editable/source files?',
    a: 'Absolutely. You receive all source files, editable formats, and export-ready versions. You own 100% of the brand assets we create.',
  },
  {
    q: 'Do you create social media brand assets too?',
    a: 'Yes. We create social media templates, profile graphics, and visual systems tailored to your platforms. Your brand will be consistent across all social channels.',
  },
  {
    q: 'How long does a branding project take?',
    a: 'Timeline depends on scope. Brand Starter typically takes 2–3 weeks. Growth Identity takes 4–6 weeks. Brand System Pro takes 6–8 weeks. We provide clear timelines during discovery.',
  },
  {
    q: 'How do you make sure the brand fits my business goals?',
    a: 'We start with strategy. We analyze your business, audience, market, and goals before any design. Every design decision is tied to strategic objectives and business outcomes.',
  },
];

export default function BrandingPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();

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
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Branding Services</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold heading-display text-foreground mb-6">
              Brands That{' '}
              <GradientText>Stand Out</GradientText>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
              Strategic branding that builds clear identity, professional positioning, 
              and sustainable growth. We design brands that work as hard as you do.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Button asChild size="lg" className="brand-gradient border-0 text-white hover:opacity-90 h-12 px-8">
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
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Strategy-led approach</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Complete brand systems</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Growth-focused design</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Brand Trust Strip */}
      <section className="border-y border-border bg-card/50 overflow-hidden">
        {/* First Strip - Sliding Left */}
        <div
          className="py-8 border-b border-border overflow-hidden"
          onMouseEnter={() => controlsLeft.stop()}
          onMouseLeave={() => controlsLeft.start({ x: '-50%' })}
        >
          <motion.div
            animate={controlsLeft}
            initial={{ x: 0 }}
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-12">
                {[
                  { icon: Target, name: 'Brand Strategy' },
                  { icon: Layers, name: 'Visual Identity Systems' },
                  { icon: Share2, name: 'Social Media Branding' },
                  { icon: Shield, name: 'Brand Consistency' },
                  { icon: Award, name: 'Professional Market Positioning' },
                ].map((item, i) => (
                  <div
                    key={`${setIndex}-${i}`}
                    className="flex items-center gap-2 text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-semibold">{item.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second Strip - Sliding Right */}
        <div
          className="py-8 overflow-hidden"
          onMouseEnter={() => controlsRight.stop()}
          onMouseLeave={() => controlsRight.start({ x: 0 })}
        >
          <motion.div
            animate={controlsRight}
            initial={{ x: '-50%' }}
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-12">
                {[
                  { icon: Building, name: 'Client Logo 1' },
                  { icon: Store, name: 'Client Logo 2' },
                  { icon: Briefcase, name: 'Client Logo 3' },
                  { icon: GraduationCap, name: 'Client Logo 4' },
                  { icon: HeartHandshake, name: 'Client Logo 5' },
                ].map((item, i) => (
                  <div
                    key={`${setIndex}-${i}`}
                    className="flex items-center gap-2 text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-semibold">{item.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. What We Brand */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="What We Brand"
            description="Comprehensive branding services that build complete, cohesive brand systems."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                <Link 
                  href={service.link}
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
            description="Strategic branding that goes beyond visuals to drive business results."
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

      {/* 5. Branding Process */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Process"
            title="Branding Process"
            description="A strategic, collaborative approach to building powerful brands."
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, i) => (
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
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-4 right-0 w-8 h-px bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Brand Outcomes */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Results"
            title="Brand Outcomes"
            description="The tangible business results of strategic branding."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outcomes.map((outcome, i) => (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <outcome.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{outcome.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{outcome.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Deliverables / Package Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What You Get"
            title="Deliverables & Package Preview"
            description="Typical deliverables included in our branding packages."
            className="mb-16"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {deliverables.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-6 text-center hover:border-primary/30 transition-colors"
              >
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <span className="text-sm font-semibold text-foreground">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Featured Brand Case Study */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Case Study"
            title="Featured Brand Project"
            description="How strategic branding transformed a business."
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
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">Education</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">5 weeks</span>
                </div>
                <h3 className="text-2xl font-bold heading-display text-foreground mb-4">
                  EduLearn Academy Rebrand
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Problem</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      EduLearn had an outdated visual identity that didn\'t reflect their modern teaching methods. 
                      Inconsistent branding across materials hurt credibility and enrollment.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Solution</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Complete brand repositioning with new logo, color system, typography, comprehensive guidelines, 
                      and marketing collateral. Positioned as innovative, trustworthy, and student-focused.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Result</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Enrollment inquiries increased by 35%, parent satisfaction improved, 
                      and the school now presents a cohesive, professional image across all channels.
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
                <h4 className="text-sm font-semibold text-foreground mb-4">Deliverables</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Identity', items: ['Logo Suite', 'Color System', 'Typography'] },
                    { label: 'Guidelines', items: ['Brand Book', 'Usage Rules', 'Asset Library'] },
                    { label: 'Assets', items: ['Stationery', 'Social Templates', 'Presentations'] },
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

      {/* 9. Selected Branding Projects */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Portfolio"
            title="Selected Branding Projects"
            description="A selection of our branding work across industries."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'TechFlow Solutions',
                summary: 'Complete brand identity for a technology consulting firm, positioning them as innovative and reliable.',
                tags: ['Tech', 'B2B', 'Corporate'],
              },
              {
                title: 'GreenEarth NGO',
                summary: 'Brand refresh for environmental organization, emphasizing sustainability and community impact.',
                tags: ['NGO', 'Nonprofit', 'Social'],
              },
              {
                title: 'Urban Cafe',
                summary: 'Visual identity for modern coffee shop, blending contemporary design with warm hospitality.',
                tags: ['Hospitality', 'F&B', 'Lifestyle'],
              },
              {
                title: 'Prime Legal',
                summary: 'Professional brand system for law firm, communicating trust, expertise, and accessibility.',
                tags: ['Legal', 'Professional', 'Corporate'],
              },
              {
                title: 'FitLife Gym',
                summary: 'Energetic brand identity for fitness center, motivating and modern visual language.',
                tags: ['Fitness', 'Lifestyle', 'Consumer'],
              },
              {
                title: 'Dr. Sarah Clinic',
                summary: 'Healthcare brand design balancing professionalism with approachability and care.',
                tags: ['Healthcare', 'Medical', 'Service'],
              },
            ].map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
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

      {/* 10. Industries / Business Types We Support */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Industries"
            title="Industries We Support"
            description="Branding expertise across diverse business types and sectors."
            className="mb-12"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-6 text-center hover:border-primary/30 transition-colors"
              >
                <industry.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <span className="text-sm font-semibold text-foreground">{industry.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Pricing / Engagement Options */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Pricing"
            title="Branding Packages"
            description="Flexible branding solutions for every business stage."
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

      {/* 12. Testimonials */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Testimonials"
            title="What Clients Say"
            description="Feedback from businesses we\'ve branded."
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

      {/* 13. Strategic FAQ */}
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

      {/* 14. Final CTA */}
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
              Build a Brand That{' '}
              <span className="brand-gradient-text">Drives Growth</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Let&apos;s discuss your branding goals. We&apos;ll provide strategic guidance, 
              creative direction, and a clear path to a powerful brand.
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
