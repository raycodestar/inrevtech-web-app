'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Zap,
  Shield,
  Database,
  Cpu,
  Lock,
  TrendingUp,
  Clock,
  CheckCircle2,
  ChevronDown,
  Star,
  MessageSquare,
  FileText,
  Search,
  Users,
  Target,
  Workflow,
  BarChart3,
  Globe,
  Server,
  Code,
  GraduationCap,
  HeartHandshake,
  Store,
  Building2,
  Headphones,
  MapPin,
  Building,
  Briefcase,
  Settings,
  LineChart,
  Puzzle,
  Brain,
  Sparkles,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GradientText } from '@/components/ui/GradientText';
import { cn } from '@/lib/utils';

const useCases = [
  {
    icon: MessageSquare,
    title: 'Intelligent Customer Support',
    description: 'AI-powered chatbots that handle common queries, qualify leads, and escalate complex issues seamlessly.',
  },
  {
    icon: FileText,
    title: 'Automated Content & SEO Workflows',
    description: 'Content generation, optimization, and SEO workflows that scale your marketing efforts efficiently.',
  },
  {
    icon: Search,
    title: 'Data Extraction & Analysis',
    description: 'Extract insights from documents, reports, and data sources with AI-powered analysis.',
  },
  {
    icon: Database,
    title: 'Internal Knowledge Tools',
    description: 'Searchable knowledge bases that help teams find information instantly across your organization.',
  },
  {
    icon: Target,
    title: 'Lead Qualification & Sales Automation',
    description: 'Automated lead scoring, qualification, and follow-up workflows that convert faster.',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation for Operations',
    description: 'Streamline operations with AI-powered automation for repetitive tasks and processes.',
  },
];

const edgePoints = [
  {
    icon: Target,
    title: 'AI With Business Purpose',
    description: 'Every AI solution is tied to specific business outcomes. No technology for technology\'s sake.',
  },
  {
    icon: Settings,
    title: 'Built Around Your Workflow',
    description: 'We integrate AI into your existing processes, not force you to change how you work.',
  },
  {
    icon: Shield,
    title: 'Secure and Scalable Integrations',
    description: 'Enterprise-grade security with scalable architecture that grows with your business.',
  },
  {
    icon: Zap,
    title: 'Practical Automation, Not Hype',
    description: 'Focus on real efficiency gains and measurable outcomes, not buzzwords.',
  },
  {
    icon: Users,
    title: 'Human-Centered Implementation',
    description: 'AI augments your team, not replaces them. We design for human-AI collaboration.',
  },
  {
    icon: TrendingUp,
    title: 'Ongoing Optimization & Support',
    description: 'Continuous monitoring, refinement, and support to ensure AI delivers value over time.',
  },
];

const process = [
  { step: '01', title: 'AI Audit', description: 'Assess current processes, identify automation opportunities, and evaluate AI readiness.' },
  { step: '02', title: 'Opportunity Mapping', description: 'Map high-impact AI use cases aligned with business goals and ROI potential.' },
  { step: '03', title: 'MVP Development', description: 'Build and test minimum viable AI solutions with real data and workflows.' },
  { step: '04', title: 'Refinement & Testing', description: 'Iterate based on feedback, optimize accuracy, and ensure seamless integration.' },
  { step: '05', title: 'Deployment & Team Training', description: 'Deploy to production and train your team on effective AI usage.' },
  { step: '06', title: 'Optimization & Support', description: 'Monitor performance, refine models, and provide ongoing support and updates.' },
];

const capabilities = [
  { icon: MessageSquare, name: 'Chatbot Systems' },
  { icon: Users, name: 'CRM & Sales Integrations' },
  { icon: Code, name: 'API Integrations' },
  { icon: LineChart, name: 'Dashboards & Reporting' },
  { icon: Search, name: 'Document Search / Knowledge Systems' },
  { icon: Workflow, name: 'Internal Workflow Automation' },
];

const industries = [
  { icon: Briefcase, name: 'Service Businesses' },
  { icon: GraduationCap, name: 'Schools & Education' },
  { icon: HeartHandshake, name: 'NGOs & Foundations' },
  { icon: Store, name: 'Ecommerce Brands' },
  { icon: Building2, name: 'Professional Firms' },
  { icon: Settings, name: 'Internal Operations Teams' },
  { icon: Headphones, name: 'Customer Support Teams' },
  { icon: MapPin, name: 'Hospitality & Tourism' },
];

const pricing = [
  {
    name: 'AI Starter Assistant',
    description: 'For businesses launching their first AI-powered workflow',
    price: 'UGX 2M – 5M',
    features: [
      'Custom AI assistant setup',
      'WhatsApp integration',
      'Basic knowledge base',
      'Appointment and inquiry handling',
      'Calendar connection',
      'Documentation and handover',
      '1 month support',
    ],
    cta: 'Launch Your AI Assistant',
    popular: false,
  },
  {
    name: 'Growth Automation Suite',
    description: 'For growing teams ready to automate sales, support, and operations',
    price: 'UGX 8M – 15M',
    features: [
      'Multi-workflow AI setup',
      'Sales, support, and ops automation',
      'CRM and tool integrations',
      'Reporting and process automation',
      'Workflow optimization',
      'Weekly performance reports',
      'Team onboarding and training',
      '3 months support',
    ],
    cta: 'Scale with AI',
    popular: true,
  },
  {
    name: 'Enterprise AI Systems',
    description: 'For organizations needing secure, scalable AI implementation',
    price: 'UGX 20M+',
    features: [
      'Custom AI architecture',
      'Private or controlled deployment',
      'Secure data setup',
      'Multi-channel AI workflows',
      'Predictive dashboards',
      'Custom API integrations',
      'Advanced AI extensions',
      'Dedicated technical support',
      'SLA-backed support',
    ],
    cta: 'Build Enterprise AI',
    popular: false,
  },
];

const testimonials = [
  {
    name: 'Robert Nkosi',
    role: 'CTO, TechFlow Solutions',
    content: 'InRevTech implemented AI-powered lead qualification that increased our conversion rate by 40%. The system integrates seamlessly with our CRM and saves our sales team hours daily.',
  },
  {
    name: 'Grace Mwangi',
    role: 'Operations Manager, EduLearn Academy',
    content: 'Our internal knowledge tool now helps staff find information in seconds instead of hours. The AI assistant handles routine queries, freeing our team for high-value work.',
  },
  {
    name: 'David Okello',
    role: 'Founder, GreenEarth NGO',
    content: 'AI-powered data analysis helped us identify patterns in donor engagement we never saw before. The insights have directly improved our fundraising strategy.',
  },
];

const faqs = [
  {
    q: 'How do you make sure the AI does not give wrong information?',
    a: 'We use RAG (Retrieval-Augmented Generation) architecture, which grounds AI responses in your actual data. We also implement accuracy checks, human review workflows, and continuous monitoring to minimize errors.',
  },
  {
    q: 'Is our data safe?',
    a: 'Absolutely. Your data is never used to train public AI models. We use secure, private deployments with enterprise-grade encryption. Data stays in your control and environment.',
  },
  {
    q: 'Will this replace our team?',
    a: 'No. AI is designed to augment your team, not replace them. Our solutions handle repetitive tasks and provide insights, freeing your people to focus on high-value, strategic work.',
  },
  {
    q: 'Can AI connect with our existing tools?',
    a: 'Yes. We integrate with your existing CRM, databases, communication tools, and business systems. AI works within your current ecosystem, not as a separate silo.',
  },
  {
    q: 'Do you provide training and support?',
    a: 'Yes. We provide comprehensive team training, documentation, and ongoing support. We ensure your team is confident and effective in using AI solutions.',
  },
];

export default function AIPoweredSolutionsPage() {
  const [openFaq, setOpenFaq] = useState(0);
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
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">AI-Powered Solutions</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold heading-display text-foreground mb-6">
              AI That{' '}
              <GradientText>Works for You</GradientText>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
              Practical AI solutions that automate workflows, improve efficiency, 
              and deliver measurable business outcomes. No hype, just results.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Button asChild size="lg" className="brand-gradient border-0 text-white hover:opacity-90 h-12 px-8">
                <Link href="/get-a-quote">
                  Book AI Strategy Session
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/work">
                  Explore Use Cases
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Secure implementation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Business-focused outcomes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Human-centered design</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. AI Trust Strip */}
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
                  { icon: Workflow, name: 'Workflow Automation' },
                  { icon: Bot, name: 'AI Assistants & Chatbots' },
                  { icon: BarChart3, name: 'Data-Driven Insights' },
                  { icon: Shield, name: 'Secure AI Integrations' },
                  { icon: Server, name: 'Scalable Business Systems' },
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

      {/* 3. Intelligence Stack */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Technology"
            title="Intelligence Stack"
            description="Built on proven AI models and secure data systems."
            className="mb-16"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {[
              { name: 'OpenAI' },
              { name: 'Anthropic' },
              { name: 'Meta Llama' },
              { name: 'LangChain' },
              { name: 'Supabase Vector' },
              { name: 'PostgreSQL' },
            ].map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-6 text-center hover:border-primary/30 transition-colors"
              >
                <Cpu className="w-8 h-8 text-primary mx-auto mb-3" />
                <span className="text-sm font-semibold text-foreground">{tech.name}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            InRevTech builds on industry-leading AI models and robust data infrastructure to deliver reliable, scalable solutions.
          </p>
        </div>
      </section>

      {/* 4. Practical AI Use Cases */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Use Cases"
            title="Practical AI Use Cases"
            description="Real AI applications that deliver measurable business value."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, i) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <useCase.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. InRevTech Edge */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why InRevTech"
            title="The InRevTech Edge"
            description="AI solutions built for real business impact, not hype."
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

      {/* 6. Data Privacy, Accuracy & Security */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Security"
            title="Data Privacy, Accuracy & Security"
            description="Enterprise-grade protection for your data and AI systems."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Lock,
                title: 'Private Data Protection',
                description: 'Your data is encrypted and stored securely. We use private deployments that keep your information within your control.',
              },
              {
                icon: Shield,
                title: 'Data Not Used for Training',
                description: 'Your data is never used to train public AI models. Your information remains private and exclusive to your business.',
              },
              {
                icon: Brain,
                title: 'RAG-Based Accuracy',
                description: 'Retrieval-Augmented Generation grounds AI responses in your actual data, reducing hallucinations and improving accuracy.',
              },
              {
                icon: Server,
                title: 'Secure Deployment',
                description: 'Enterprise-grade security protocols, regular audits, and scalable architecture that meets business standards.',
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

      {/* 7. ROI vs Manual Work */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="ROI"
            title="ROI vs Manual Work"
            description="The measurable impact of AI-powered automation."
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
                <Clock className="w-6 h-6 text-muted-foreground" />
                <h3 className="text-xl font-bold heading-display text-foreground">Manual Process</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Hours spent on repetitive tasks',
                  'Inconsistent quality and output',
                  'Limited scalability',
                  'High operational costs',
                  'Slow response times',
                  'Human error and fatigue',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-muted-foreground/20 flex items-center justify-center mt-0.5">
                      <AlertCircle className="w-3 h-3 text-muted-foreground" />
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
                <h3 className="text-xl font-bold heading-display text-foreground">InRevTech AI Solution</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Automated workflows save hours daily',
                  'Consistent, high-quality output',
                  'Easily scales with demand',
                  'Reduced operational costs',
                  'Instant response and action',
                  'Continuous accuracy and improvement',
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

      {/* 8. AI Implementation Process */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Process"
            title="AI Implementation Process"
            description="A proven approach to successful AI adoption."
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

      {/* 9. Technical Capabilities / Integrations */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Capabilities"
            title="Technical Capabilities & Integrations"
            description="Comprehensive AI capabilities that integrate with your systems."
            className="mb-16"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {capabilities.map((capability, i) => (
              <motion.div
                key={capability.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-6 text-center hover:border-primary/30 transition-colors"
              >
                <capability.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <span className="text-sm font-semibold text-foreground">{capability.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Featured AI Case Study */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Case Study"
            title="Featured AI Project"
            description="How AI automation transformed business operations."
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
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">Technology</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">8 weeks</span>
                </div>
                <h3 className="text-2xl font-bold heading-display text-foreground mb-4">
                  TechFlow Lead Qualification AI
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Problem</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      TechFlow\'s sales team spent hours manually qualifying leads. Response times were slow, 
                      and qualified leads were sometimes missed due to human error and inconsistent follow-up.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Solution</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Implemented AI-powered lead qualification that automatically scores, qualifies, 
                      and routes leads. Integrated with CRM for seamless handoff and follow-up automation.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Result</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Lead conversion rate increased by 40%, response time reduced from hours to minutes, 
                      and sales team saved 15+ hours weekly for high-value activities.
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
                <h4 className="text-sm font-semibold text-foreground mb-4">Key Features</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Automation', items: ['Lead Scoring', 'Auto Qualification', 'CRM Sync'] },
                    { label: 'Intelligence', items: ['Pattern Recognition', 'Behavior Analysis', 'Predictive Scoring'] },
                    { label: 'Integration', items: ['Salesforce', 'HubSpot', 'Custom APIs'] },
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

      {/* 11. Selected AI Projects / Examples */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Portfolio"
            title="Selected AI Projects"
            description="Examples of AI solutions we've implemented."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'EduLearn Knowledge Assistant',
                summary: 'Internal AI knowledge base that helps staff find curriculum, policies, and resources instantly across 50+ documents.',
                tags: ['Education', 'Knowledge Base', 'Search'],
              },
              {
                title: 'GreenEarth Data Analyzer',
                summary: 'AI-powered analysis of donor data and engagement patterns to optimize fundraising strategy and donor retention.',
                tags: ['NGO', 'Data Analysis', 'Insights'],
              },
              {
                title: 'Prime Legal Document Processor',
                summary: 'Automated document extraction and analysis for contract review, reducing legal team review time by 60%.',
                tags: ['Legal', 'Automation', 'Documents'],
              },
              {
                title: 'FitLife Member Engagement Bot',
                summary: 'AI chatbot that handles member inquiries, class bookings, and personalized workout recommendations 24/7.',
                tags: ['Fitness', 'Chatbot', 'Engagement'],
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

      {/* 12. Industries / Teams We Support */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Industries"
            title="Industries & Teams We Support"
            description="AI solutions across diverse sectors and business functions."
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

      {/* 13. Pricing / Engagement Options */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Pricing"
            title="AI Solutions Packages"
            description="Practical AI and automation solutions built to save time, improve efficiency, and help your business scale. All prices are in UGX."
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
                We also design custom AI workflows, internal automation systems, support assistants, and enterprise-grade solutions built around your exact business needs.
              </p>
              <Button asChild className="brand-gradient border-0 text-white hover:opacity-90">
                <Link href="/get-a-quote">
                  Request a Custom Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Small Trust Line */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              Every package is designed to turn AI into practical business value — not just another tool, but a real operational advantage.
            </p>
          </div>
        </div>
      </section>

      {/* 14. Testimonials */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Testimonials"
            title="What Clients Say"
            description="Feedback from businesses using our AI solutions."
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

      {/* 15. Ethics & Accuracy FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Ethics & Accuracy"
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

      {/* 16. Final CTA */}
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
              AI That{' '}
              <span className="brand-gradient-text">Delivers Results</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Let&apos;s discuss how AI can transform your operations. We&apos;ll provide strategic guidance, 
              practical solutions, and a clear path to implementation.
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
