'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import {
  ArrowRight,
  ShoppingCart,
  Store,
  Building2,
  TrendingUp,
  Smartphone,
  Zap,
  Shield,
  Scale,
  CreditCard,
  Package,
  BarChart3,
  Search,
  Lock,
  Truck,
  Users,
  ChevronDown,
  CheckCircle2,
  Star,
  Cpu,
  Layers,
  Server,
  Cloud,
  Globe,
  Layout,
  Palette,
  Bot,
  Target,
  DollarSign,
  Clock,
  Award,
  Factory,
  Shirt,
  Sparkles,
  Heart,
  BookOpen,
  Armchair,
  Activity,
  Dumbbell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GradientText } from '@/components/ui/GradientText';
import { cn } from '@/lib/utils';

const platforms = [
  {
    icon: Store,
    title: 'Growth Store',
    description: 'For growing brands ready to scale online sales with a professional, conversion-focused storefront.',
    bestFor: 'SMBs, emerging brands, first-time ecommerce',
  },
  {
    icon: Building2,
    title: 'Enterprise Commerce',
    description: 'For established businesses needing robust, scalable ecommerce with advanced features and integrations.',
    bestFor: 'Enterprise, multi-location, high-volume operations',
  },
  {
    icon: Users,
    title: 'Marketplace / B2B Platform',
    description: 'For businesses building multi-vendor marketplaces or B2B commerce platforms with complex workflows.',
    bestFor: 'Marketplaces, B2B platforms, multi-tenant systems',
  },
];

const edgePoints = [
  {
    icon: Target,
    title: 'Built for Sales, Not Just Looks',
    description: 'Every design decision is conversion-focused. We optimize for checkout completion, not just aesthetics.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Shopping First',
    description: 'Over 70% of ecommerce traffic is mobile. We build mobile-first stores that convert on every device.',
  },
  {
    icon: Zap,
    title: 'Fast Store Performance',
    description: 'Speed impacts conversion. We optimize for sub-2-second load times and smooth shopping experiences.',
  },
  {
    icon: Scale,
    title: 'Modern Scalable Architecture',
    description: 'Systems designed to handle growth. From 100 orders to 100,000, your store scales without rewrites.',
  },
  {
    icon: CreditCard,
    title: 'Local Payment Readiness',
    description: 'Integrated with MTN MoMo, Airtel Money, Pesapal, and global payment gateways out of the box.',
  },
  {
    icon: Package,
    title: 'Built Around Real Business Operations',
    description: 'Inventory, shipping, orders — we build around how your business actually operates.',
  },
];

const lifecycle = [
  { step: '01', title: 'Discovery & Store Planning', description: 'Business analysis, product catalog structure, and sales strategy alignment.' },
  { step: '02', title: 'UX / Conversion Structure', description: 'Customer journey mapping, checkout flow optimization, and conversion-focused design.' },
  { step: '03', title: 'Store Design & Development', description: 'Custom storefront development with your brand, products, and business logic.' },
  { step: '04', title: 'Payments, Shipping & Integrations', description: 'Payment gateway setup, shipping configuration, and third-party integrations.' },
  { step: '05', title: 'Testing & Launch', description: 'QA testing, payment verification, mobile testing, and staged launch.' },
  { step: '06', title: 'Support & Growth', description: 'Post-launch support, performance monitoring, and iterative improvements.' },
];

const roiFeatures = [
  {
    icon: Bot,
    title: 'Inventory Automation',
    description: 'Automatic stock updates, low-stock alerts, and multi-location inventory sync.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Sales tracking, customer insights, conversion funnels, and performance dashboards.',
  },
  {
    icon: Search,
    title: 'Search-Ready Product Pages',
    description: 'SEO-optimized product pages with structured data for better search visibility.',
  },
  {
    icon: Lock,
    title: 'Secure Checkout Experience',
    description: 'SSL-encrypted checkout, fraud detection, and PCI-compliant payment processing.',
  },
  {
    icon: Truck,
    title: 'Order & Customer Flow Optimization',
    description: 'Streamlined order processing, automated notifications, and customer communication.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Conversion Focus',
    description: 'Touch-optimized checkout, mobile payments, and app-like shopping experience.',
  },
];

const techStack = [
  { category: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Express', 'API Routes', 'Webhooks', 'GraphQL'] },
  { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Prisma'] },
  { category: 'Payments', items: ['Stripe', 'Pesapal', 'MTN MoMo', 'Airtel Money', 'DGateway'] },
];

const industries = [
  { icon: Shirt, name: 'Fashion & Apparel' },
  { icon: Cpu, name: 'Electronics' },
  { icon: Sparkles, name: 'Beauty' },
  { icon: Package, name: 'Groceries' },
  { icon: BookOpen, name: 'Books & Education' },
  { icon: Armchair, name: 'Furniture & Home' },
  { icon: Heart, name: 'Health & Pharmacy' },
  { icon: Dumbbell, name: 'Sports & Lifestyle' },
];

const pricing = [
  {
    name: 'Starter Store',
    price: 'UGX 3M – 6M',
    description: 'For businesses launching their first serious online store',
    features: [
      'Custom storefront design',
      'Up to 100 products',
      'Local payment integration',
      'Mobile-first shopping flow',
      'Basic inventory & orders',
      'Admin dashboard access',
      'Checkout setup',
      '3 months support',
    ],
    cta: 'Start Your Store',
    popular: false,
  },
  {
    name: 'Growth Commerce',
    price: 'UGX 8M – 15M',
    description: 'For scaling brands that need stronger performance and automation',
    features: [
      'Advanced storefront build',
      'Unlimited products',
      'Multiple payment methods',
      'Inventory & order automation',
      'Shipping and tax workflows',
      'Analytics dashboard',
      'Customer account features',
      '6 months support',
    ],
    cta: 'Build for Growth',
    popular: true,
  },
  {
    name: 'Enterprise Commerce Platform',
    price: 'UGX 20M+',
    description: 'For advanced businesses needing scalable ecommerce systems',
    features: [
      'Custom commerce platform',
      'Multi-store or multi-vendor',
      'ERP, logistics, and API integrations',
      'B2B pricing workflows',
      'API-ready architecture',
      'Custom operational logic',
      'Priority support',
      '12 months support',
    ],
    cta: 'Request Consultation',
    popular: false,
  },
];

const testimonials = [
  {
    name: 'Grace Mbeki',
    role: 'Founder, AfriStyle Fashion',
    content: 'InRevTech built our online store in 6 weeks. Mobile payments work flawlessly, and our conversion rate increased by 45%. The team understood African ecommerce challenges.',
  },
  {
    name: 'David Osei',
    role: 'CEO, TechMart Electronics',
    content: 'We needed a store that could handle 10,000+ products. InRevTech delivered a fast, scalable solution with excellent inventory management. Sales have doubled since launch.',
  },
  {
    name: 'Amina Hassan',
    role: 'Director, BeautyGlow',
    content: 'The payment integration was seamless. MTN MoMo, Airtel Money, card payments — everything works. Our customers love the mobile shopping experience.',
  },
];

const faqs = [
  {
    q: 'Can I manage my own products?',
    a: 'Yes. We build an intuitive admin dashboard where you can add, edit, and manage products, inventory, and orders yourself. We provide training and documentation.',
  },
  {
    q: 'Do you help with local payment integrations?',
    a: 'Absolutely. We specialize in African payment integrations — MTN MoMo, Airtel Money, Pesapal, DGateway, and global gateways like Stripe. We ensure smooth payment processing.',
  },
  {
    q: 'Can you connect delivery or logistics systems?',
    a: 'Yes. We integrate with delivery providers, logistics companies, and shipping carriers. Orders can automatically trigger delivery requests and tracking updates.',
  },
  {
    q: 'Will my store work well on slow mobile networks?',
    a: 'We optimize for performance. Your store will load quickly even on slower networks. We use image optimization, code splitting, and efficient loading strategies.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Yes. We offer maintenance plans that include security updates, bug fixes, performance monitoring, and feature iterations. Support is tailored to your needs.',
  },
  {
    q: 'Can you improve an existing store?',
    a: 'Yes. We audit existing stores, identify conversion bottlenecks, and plan improvements. We can redesign, rebuild, or optimize your current ecommerce platform.',
  },
  {
    q: 'Who owns the code and platform?',
    a: 'You own 100% of the code and platform. We deliver clean, documented code with full access. No vendor lock-in, no proprietary platforms.',
  },
];

export default function EcommerceDevelopmentPage() {
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
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Ecommerce Development</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold heading-display text-foreground mb-6">
              Online Stores That{' '}
              <GradientText>Drive Sales</GradientText>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
              We build high-converting ecommerce stores designed for African markets. 
              Mobile-first, payment-ready, and built to scale with your business.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Button asChild size="lg" className="brand-gradient border-0 text-white hover:opacity-90 h-12 px-8">
                <Link href="/get-a-quote">
                  Start Your Store Build
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/work">
                  View Recent Results
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Local payment integration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Mobile-first design</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Conversion optimized</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Trust Bar - Dual Sliding Strips */}
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
                  { icon: Shield, name: 'Secure Payment Integration' },
                  { icon: Smartphone, name: 'Mobile-First Storefronts' },
                  { icon: Package, name: 'Inventory & Order Flows' },
                  { icon: Target, name: 'Conversion-Focused Design' },
                  { icon: Scale, name: 'Scalable Ecommerce Architecture' },
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
                  { icon: CreditCard, name: 'MTN MoMo' },
                  { icon: Smartphone, name: 'Airtel Money' },
                  { icon: Globe, name: 'DGateway' },
                  { icon: DollarSign, name: 'Pesapal' },
                  { icon: Award, name: 'Visa / Mastercard' },
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

      {/* 3. Platform Matchmaker */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Choose Your Platform"
            title="Platform Matchmaker"
            description="Find the right ecommerce solution for your business stage and goals."
            className="mb-16"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {platforms.map((platform, i) => (
              <motion.div
                key={platform.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-3xl border border-border bg-card p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <platform.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{platform.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{platform.description}</p>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Best for:</span> {platform.bestFor}
                  </p>
                </div>
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
            description="Ecommerce expertise built for African markets and global standards."
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

      {/* 5. Ecommerce Development Lifecycle */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Process"
            title="Ecommerce Development Lifecycle"
            description="A proven approach to building successful online stores."
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* 6. ROI-Focused Feature Blocks */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Features"
            title="ROI-Focused Features"
            description="Features designed to increase sales, reduce operations, and improve customer experience."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roiFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Technical Stack + Performance Proof */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Technology"
            title="Technical Stack & Performance"
            description="Modern technology and optimized performance for fast, reliable stores."
            className="mb-16"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-border bg-card p-8"
            >
              <h3 className="text-xl font-bold heading-display text-foreground mb-6">Performance Comparison</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">Generic Build</span>
                    <span className="text-sm text-muted-foreground">4.2s load time</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[40%] bg-muted-foreground/30" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-primary">InRevTech Build</span>
                    <span className="text-sm text-primary font-semibold">1.8s load time</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '90%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full brand-gradient"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  *Based on average performance metrics across our ecommerce projects
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. Featured Success Story */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Success Story"
            title="Featured Ecommerce Project"
            description="How we helped a fashion brand scale online sales."
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
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">Fashion</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">6 weeks</span>
                </div>
                <h3 className="text-2xl font-bold heading-display text-foreground mb-4">
                  AfriStyle Fashion Online Store
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Problem</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      AfriStyle was selling through social media and WhatsApp only. No proper inventory tracking, 
                      manual order processing, and limited payment options. Sales were plateauing.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Solution</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Built a custom ecommerce store with MTN MoMo and Airtel Money integration, 
                      automated inventory management, and mobile-first design focused on conversion.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Result</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Online sales increased by 45%, order processing time reduced by 80%, 
                      and customer satisfaction improved with seamless mobile payments.
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
                    { label: 'Payments', items: ['MTN MoMo', 'Airtel Money', 'Card Payments'] },
                    { label: 'Features', items: ['Inventory Sync', 'Order Tracking', 'Customer Accounts'] },
                    { label: 'Performance', items: ['Mobile-First', 'Fast Checkout', 'SEO Optimized'] },
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

      {/* 9. Selected Ecommerce Projects */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Portfolio"
            title="Selected Ecommerce Projects"
            description="A selection of our ecommerce development work."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'TechMart Electronics Store',
                summary: '10,000+ product catalog with advanced inventory management and multi-vendor shipping integration.',
                tags: ['Electronics', 'Large Catalog', 'Multi-ship'],
              },
              {
                title: 'BeautyGlow Cosmetics',
                summary: 'Beauty products store with subscription options, gift cards, and loyalty program integration.',
                tags: ['Beauty', 'Subscription', 'Loyalty'],
              },
              {
                title: 'FreshGroceries Market',
                summary: 'Grocery delivery platform with real-time inventory, delivery scheduling, and mobile ordering.',
                tags: ['Groceries', 'Delivery', 'Real-time'],
              },
              {
                title: 'BookHaven Education',
                summary: 'Educational bookstore with digital downloads, course bundles, and student discount system.',
                tags: ['Education', 'Digital', 'B2C'],
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

      {/* 10. Industries We Serve */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Industries"
            title="Industries We Serve"
            description="Ecommerce expertise across diverse sectors."
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
            title="Ecommerce Packages"
            description="Flexible ecommerce solutions for every business stage."
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
                  <div className="text-3xl font-bold heading-display brand-gradient-text mb-3">{pkg.price}</div>
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
            description="Feedback from ecommerce businesses we've worked with."
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

      {/* 13. Founder-to-Founder FAQ */}
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
              Build Your{' '}
              <span className="brand-gradient-text">Ecommerce Success</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Let&apos;s discuss your ecommerce goals. We&apos;ll provide technical guidance, 
              honest estimates, and a clear path to launch.
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
