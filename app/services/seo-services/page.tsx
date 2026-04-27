'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  ArrowRight,
  Search,
  TrendingUp,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Target,
  MapPin,
  FileText,
  Code,
  LineChart,
  CheckCircle2,
  ChevronDown,
  Star,
  Activity,
  Users,
  MessageSquare,
  Smartphone,
  Award,
  GraduationCap,
  HeartHandshake,
  Store,
  Stethoscope,
  Building,
  Building2,
  Briefcase,
  Gauge,
  Brain,
  AlertTriangle,
  Clock,
  HelpCircle,
  Sparkles,
  X,
  Link as LinkIcon,
  Map
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GradientText } from '@/components/ui/GradientText';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: Search,
    title: 'Keyword Research & Search Strategy',
    description: 'Data-driven keyword research and competitive analysis to identify high-value opportunities.',
  },
  {
    icon: FileText,
    title: 'On-Page SEO',
    description: 'Optimize content, meta tags, and structure for maximum search visibility and relevance.',
  },
  {
    icon: Code,
    title: 'Technical SEO',
    description: 'Site architecture, crawlability, and Core Web Vitals optimization for performance.',
  },
  {
    icon: MapPin,
    title: 'Local SEO',
    description: 'Google Business Profile optimization and local search dominance for regional visibility.',
  },
  {
    icon: FileText,
    title: 'Content SEO',
    description: 'Strategic content development that builds topical authority and search relevance.',
  },
  {
    icon: Brain,
    title: 'AI Search / AEO',
    description: 'Optimize for AI-driven answer engines and semantic search discoverability.',
  },
];

const pillars = [
  {
    icon: Gauge,
    title: 'Technical SEO & Core Web Vitals',
    description: 'Fast, crawlable, and technically sound websites that search engines prefer and users love.',
  },
  {
    icon: TrendingUp,
    title: 'Authority & Backlink Growth',
    description: 'Strategic link building and authority development that signals credibility and trust.',
  },
  {
    icon: Sparkles,
    title: 'AEO & Schema Architecture',
    description: 'Structured data and semantic markup for AI-answer visibility and rich results.',
  },
];

const edgePoints = [
  {
    icon: Target,
    title: 'Strategy Before Tactics',
    description: 'We start with business goals and audience insights, not generic keyword lists.',
  },
  {
    icon: Code,
    title: 'Technical + Content SEO Together',
    description: 'Integrated approach that combines technical excellence with content authority.',
  },
  {
    icon: Zap,
    title: 'Performance-First Search Growth',
    description: 'SEO that improves user experience and conversion, not just rankings.',
  },
  {
    icon: MapPin,
    title: 'Local Market Relevance',
    description: 'Local SEO strategies that connect you with customers in your area.',
  },
  {
    icon: BarChart3,
    title: 'Reporting Linked to Business Results',
    description: 'Metrics that matter: traffic quality, leads, and revenue, not vanity numbers.',
  },
  {
    icon: TrendingUp,
    title: 'Search Visibility Built for Growth',
    description: 'Scalable SEO systems that grow with your business and market presence.',
  },
];

const process = [
  { step: '01', title: 'Deep Audit', description: 'Comprehensive technical audit, content analysis, and competitive benchmarking.' },
  { step: '02', title: 'Keyword & Competitor Mapping', description: 'Identify high-value opportunities and map competitive landscape.' },
  { step: '03', title: 'On-Page & Technical Optimization', description: 'Implement technical fixes, on-page optimization, and schema markup.' },
  { step: '04', title: 'Semantic Content Development', description: 'Create authoritative content that builds topical relevance.' },
  { step: '05', title: 'Authority Building', description: 'Develop backlink profile and domain authority through strategic outreach.' },
  { step: '06', title: 'Monitor, Report & Improve', description: 'Track performance, analyze data, and continuously optimize.' },
];

const outcomes = [
  {
    icon: Users,
    title: 'More Qualified Organic Traffic',
    description: 'Attract visitors actively searching for your products and services.',
  },
  {
    icon: MapPin,
    title: 'Better Local Visibility',
    description: 'Appear in local search results and connect with nearby customers.',
  },
  {
    icon: MessageSquare,
    title: 'More Leads and Inquiries',
    description: 'Convert search traffic into qualified leads and business inquiries.',
  },
  {
    icon: Award,
    title: 'Stronger Search Trust',
    description: 'Build authority and credibility that search engines recognize.',
  },
  {
    icon: Gauge,
    title: 'Better Performance Metrics',
    description: 'Improved Core Web Vitals and user experience metrics.',
  },
  {
    icon: TrendingUp,
    title: 'Long-Term Organic Growth',
    description: 'Sustainable traffic growth that compounds over time.',
  },
];

const industries = [
  { icon: Briefcase, name: 'Service Businesses' },
  { icon: GraduationCap, name: 'Schools & Education' },
  { icon: HeartHandshake, name: 'NGOs & Foundations' },
  { icon: Store, name: 'Ecommerce Stores' },
  { icon: Stethoscope, name: 'Healthcare Providers' },
  { icon: Building, name: 'Hospitality & Tourism' },
  { icon: Building2, name: 'Professional Firms' },
  { icon: MapPin, name: 'Real Estate' },
];

const pricing = [
  {
    name: 'Local Visibility',
    description: 'For businesses focused on stronger local rankings and regional discoverability',
    price: 'UGX 800K / month',
    features: [
      'Google Business Profile optimization',
      'Local keyword targeting',
      'Citation building across trusted directories',
      'On-page local search optimization',
      'Review and reputation guidance',
      'Monthly ranking and visibility reporting',
      'Competitor tracking',
      '3-month minimum engagement',
    ],
    cta: 'Boost Local Visibility',
    popular: false,
  },
  {
    name: 'Search Growth',
    description: 'For businesses ready to grow organic traffic, authority, and AI-search relevance',
    price: 'UGX 1.5M / month',
    features: [
      'Everything in Local Visibility',
      'Technical SEO improvements',
      'Search strategy and keyword mapping',
      'Content optimization for search intent',
      'Structured data and schema implementation',
      'Authority-building support',
      'AI search readiness improvements',
      'Bi-weekly performance reviews',
    ],
    cta: 'Grow Your Search Presence',
    popular: true,
  },
  {
    name: 'Market Authority',
    description: 'For businesses pursuing stronger search dominance and long-term authority',
    price: 'UGX 3M+ / month',
    features: [
      'Full-service SEO + AEO support',
      'National or broader market targeting',
      'Advanced technical optimization',
      'Core Web Vitals improvement support',
      'Authority and backlink growth campaigns',
      'Content strategy and scaling',
      'AI search and answer-engine readiness',
      'Custom reporting dashboard',
      'Priority strategy support',
    ],
    cta: 'Build Market Authority',
    popular: false,
  },
];

const testimonials = [
  {
    name: 'Sarah Kamau',
    role: 'Marketing Director, EduLearn Academy',
    content: 'InRevTech\'s local SEO strategy increased our enrollment inquiries by 60%. We now appear in local searches for schools across the region.',
  },
  {
    name: 'James Okoth',
    role: 'Founder, TechFlow Solutions',
    content: 'Technical SEO optimization improved our site speed by 40% and organic traffic by 150%. The performance gains directly impacted our conversion rate.',
  },
  {
    name: 'Grace Njeri',
    role: 'CEO, GreenEarth NGO',
    content: 'Content SEO strategy built our topical authority. We now rank for key environmental terms and receive qualified donor inquiries monthly.',
  },
];

const faqs = [
  {
    q: 'How long until SEO results show?',
    a: 'SEO is a long-term strategy. Initial improvements can appear in 3-6 months, with significant growth typically in 6-12 months. Results compound over time.',
  },
  {
    q: 'What is AEO and why does it matter?',
    a: 'AEO (Answer Engine Optimization) optimizes content for AI-driven search and answer engines. It ensures your business appears in AI-generated answers and voice search results.',
  },
  {
    q: 'Does site speed affect ranking?',
    a: 'Yes. Core Web Vitals are a ranking factor. Fast-loading, responsive sites rank better and convert more visitors.',
  },
  {
    q: 'Do you handle technical SEO and content SEO?',
    a: 'Yes. We provide integrated technical and content SEO. Both are essential for sustainable search growth.',
  },
  {
    q: 'Can you help us rank locally?',
    a: 'Absolutely. Local SEO is a core service. We optimize Google Business Profiles, local citations, and location-specific content.',
  },
  {
    q: 'Can you help us appear in AI-generated answers?',
    a: 'Yes. AEO and schema markup help your content become discoverable by AI search engines and appear in answer snippets.',
  },
  {
    q: 'Do you guarantee first-page rankings?',
    a: 'No. No ethical SEO agency guarantees rankings. We guarantee strategic execution, transparent reporting, and data-driven optimization.',
  },
];

export default function SEOServicesPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const controls = useAnimation();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <>
      {/* 1. Future-Proof Hero */}
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
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">SEO Services</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold heading-display text-foreground mb-6">
              SEO for the{' '}
              <GradientText>AI Era</GradientText>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
              Future-proof search visibility that combines rankings, technical performance, 
              local dominance, and AI-answer readiness. Drive qualified traffic and leads.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Button asChild size="lg" className="brand-gradient border-0 text-white hover:opacity-90 h-12 px-8">
                <Link href="/get-a-quote">
                  Get a Free SEO Audit
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/contact">
                  Book a Consultation
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Technical SEO</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Local SEO</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>AI Search Ready</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Visibility Gap */}
      <section className="py-16 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AlertTriangle className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Many businesses rank weakly in search and remain invisible in AI-driven answers. 
              Traditional SEO is no longer enough. You need search visibility built for the future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Search Visibility Trust Strip */}
      <section className="border-y border-border bg-card/50 overflow-hidden">
        <div
          className="py-8 overflow-hidden"
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() => controls.start({ x: '-50%' })}
        >
          <motion.div
            animate={controls}
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
                  { icon: Code, name: 'Technical SEO' },
                  { icon: MapPin, name: 'Local SEO' },
                  { icon: FileText, name: 'Content Strategy' },
                  { icon: Brain, name: 'AI Search Readiness' },
                  { icon: Gauge, name: 'Performance Optimization' },
                  { icon: LineChart, name: 'Reporting & Insights' },
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

      {/* 4. What We Optimize */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Services"
            title="What We Optimize"
            description="Comprehensive SEO services that drive measurable results."
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
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 3-Pillar Technical Powerhouse */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Technical Excellence"
            title="3-Pillar Technical Powerhouse"
            description="The technical foundation of sustainable search growth."
            className="mb-16"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border-2 border-primary/30 bg-card p-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <pillar.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold heading-display text-foreground mb-3">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. InRevTech Edge */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why InRevTech"
            title="The InRevTech Edge"
            description="Strategic SEO that drives business results, not just rankings."
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

      {/* 7. Local Dominance */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Local SEO"
            title="Local Dominance"
            description="Connect with customers in your area through local search optimization."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: 'Google Business Profile Optimization', desc: 'Complete profile optimization for maximum local visibility.' },
              { icon: Map, title: 'Map Visibility', desc: 'Appear in local map results and nearby searches.' },
              { icon: Globe, title: 'Local Citations', desc: 'Build consistent local business citations across directories.' },
              { icon: Search, title: 'Local Keyword Targeting', desc: 'Target location-specific keywords for local relevance.' },
              { icon: Smartphone, title: 'Mobile Local Search', desc: 'Optimize for mobile local search and voice queries.' },
              { icon: Star, title: 'Review Strategy', desc: 'Encourage and manage reviews to build local trust.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SEO Growth Framework / Process */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Process"
            title="SEO Growth Framework"
            description="A proven approach to sustainable search visibility."
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

      {/* 9. Business Outcomes / ROI */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Results"
            title="Business Outcomes & ROI"
            description="The tangible business impact of strategic SEO."
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

      {/* 10. Analytics That Matter */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Reporting"
            title="Analytics That Matter"
            description="Transparent reporting focused on business results."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: LineChart, name: 'Live Dashboard' },
              { icon: Users, name: 'Lead & Inquiry Tracking' },
              { icon: Activity, name: 'Traffic Quality Analysis' },
              { icon: TrendingUp, name: 'Visibility Trends' },
              { icon: Target, name: 'Conversion Reporting' },
              { icon: BarChart3, name: 'Competitor Benchmarking' },
            ].map((item, i) => (
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

      {/* 11. Technical SEO + AI Search Readiness */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Technical Excellence"
            title="Technical SEO + AI Search Readiness"
            description="Optimized for search engines and AI-driven answers."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Code,
                title: 'Structured Data / Schema',
                description: 'Implement schema markup for rich results and AI-answer discoverability.',
              },
              {
                icon: Search,
                title: 'Crawlability',
                description: 'Ensure search engines can efficiently crawl and index your content.',
              },
              {
                icon: LinkIcon,
                title: 'Internal Linking Architecture',
                description: 'Build logical internal linking structure for authority distribution.',
              },
              {
                icon: FileText,
                title: 'Semantic Search Structure',
                description: 'Organize content for semantic relevance and topic authority.',
              },
              {
                icon: Gauge,
                title: 'Core Web Vitals',
                description: 'Optimize loading speed, interactivity, and visual stability.',
              },
              {
                icon: Brain,
                title: 'AI-Answer Discoverability',
                description: 'Structure content to appear in AI-generated answers and voice search.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Traditional SEO vs InRevTech SEO */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Comparison"
            title="Traditional SEO vs InRevTech SEO"
            description="The difference between shallow tactics and strategic growth."
            className="mb-16"
          />
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-border bg-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-muted-foreground" />
                <h3 className="text-xl font-bold heading-display text-foreground">Traditional SEO</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Generic keyword chasing',
                  'Slow, infrequent updates',
                  'Vanity reporting (rankings only)',
                  'Traditional SEO only',
                  'Tactics without strategy',
                  'Short-term focus',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-muted-foreground/20 flex items-center justify-center mt-0.5">
                      <X className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border-2 border-primary/30 bg-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold heading-display text-foreground">InRevTech SEO</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Topic authority building',
                  'Continuous optimization',
                  'Conversion-focused reporting',
                  'SEO + AEO readiness',
                  'Strategy before tactics',
                  'Long-term growth focus',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 13. Featured SEO Case Study */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Case Study"
            title="Featured SEO Project"
            description="How strategic SEO transformed organic visibility."
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
                  <span className="text-xs text-muted-foreground">6 months</span>
                </div>
                <h3 className="text-2xl font-bold heading-display text-foreground mb-4">
                  EduLearn Academy Organic Growth
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Problem</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      EduLearn had weak organic visibility and ranked poorly for key education terms. 
                      Their site was slow, and they were invisible in local search results.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Strategy</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Implemented technical SEO optimization, local SEO strategy, content development, 
                      and schema markup. Focused on topic authority and performance improvements.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Result</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Organic traffic increased by 150%, local search inquiries by 60%, 
                      and site speed improved by 40%. Now ranking on page 1 for key terms.
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
                <h4 className="text-sm font-semibold text-foreground mb-4">Key Metrics</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Organic Traffic', value: '+150%' },
                    { label: 'Local Inquiries', value: '+60%' },
                    { label: 'Site Speed', value: '+40%' },
                    { label: 'Page 1 Rankings', value: '8 keywords' },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                      <div className="text-lg font-bold brand-gradient-text">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 14. Industries / Business Types We Support */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Industries"
            title="Industries We Support"
            description="SEO expertise across diverse business sectors."
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

      {/* 15. Pricing / Engagement Options */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Pricing"
            title="SEO Packages"
            description="Flexible SEO solutions built to improve visibility, grow qualified traffic, and strengthen your position across search and AI-driven discovery. All prices are in UGX."
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
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{pkg.description}</p>
                  {pkg.price && (
                    <div className="text-2xl font-bold brand-gradient-text">{pkg.price}</div>
                  )}
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

          {/* Bottom Support Block */}
          <div className="mt-16 text-center">
            <div className="rounded-2xl border border-border bg-card p-8 max-w-3xl mx-auto">
              <h3 className="text-lg font-semibold text-foreground mb-2">Need Something Tailored?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                If your business needs a custom SEO roadmap, stronger local expansion, technical SEO recovery, content-led growth, or AI-search optimization, InRevTech can prepare a tailored plan built around your goals.
              </p>
              <Button asChild className="brand-gradient border-0 text-white hover:opacity-90">
                <Link href="/get-a-quote">
                  Request a Custom SEO Plan
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Small Trust Line */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              Every package is designed to turn search visibility into measurable business growth — not just rankings, but real discovery, trust, and opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* 16. Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Testimonials"
            title="What Clients Say"
            description="Feedback from businesses we've helped grow organically."
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

      {/* 17. Strategic FAQ */}
      <section className="py-24 bg-card/50">
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

      {/* 18. Audit Footer / Final CTA */}
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
              Ready to{' '}
              <span className="brand-gradient-text">Grow Organically?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Get a free SEO audit to discover opportunities, identify issues, 
              and see how we can help you rank higher and attract more qualified traffic.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="brand-gradient border-0 text-white hover:opacity-90 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all h-12 px-8"
              >
                <Link href="/get-a-quote">
                  Get a Free SEO Audit
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/contact">
                  Book a Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
