'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Layout, Smartphone, Zap, Shield, TrendingUp, CheckCircle2, Code, Palette, MousePointer2, Gauge, Lock, Search, Star, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GradientText } from '@/components/ui/GradientText';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Layout,
    title: 'Custom UI/UX Design',
    description: 'We craft intuitive, beautiful interfaces that guide users naturally toward conversion. Every pixel serves a purpose.',
  },
  {
    icon: Smartphone,
    title: 'Responsive & Mobile-First',
    description: 'Your site performs flawlessly across all devices. We design mobile-first to capture the 60%+ of traffic from smartphones.',
  },
  {
    icon: Zap,
    title: 'Lightning-Fast Performance',
    description: 'Speed is a ranking factor and a conversion killer. We optimize for Core Web Vitals, achieving 90+ scores consistently.',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description: 'SSL, secure authentication, data encryption, and protection against common vulnerabilities. Your users\' data stays safe.',
  },
  {
    icon: Search,
    title: 'SEO-Ready Architecture',
    description: 'Semantic HTML, proper meta tags, structured data, and technical SEO best practices built in from day one.',
  },
  {
    icon: Code,
    title: 'Scalable Codebase',
    description: 'Clean, maintainable code that grows with your business. No technical debt, no spaghetti code — just solid engineering.',
  },
];

const deliverables = [
  'Custom responsive design system',
  'Component-based architecture',
  'Performance optimization (90+ CWV scores)',
  'SEO implementation (meta tags, sitemap, robots.txt)',
  'Analytics integration (Google Analytics 4, Mixpanel)',
  'CMS integration (Contentful, Sanity, or custom)',
  'Contact forms with validation',
  'Blog/news section with dynamic routing',
  'Multi-language support (if needed)',
  'Accessibility compliance (WCAG 2.1 AA)',
];

const techStack = [
  { category: 'Frontend', items: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend & API', items: ['Node.js', 'API Routes', 'REST/GraphQL', 'Supabase', 'PostgreSQL'] },
  { category: 'Performance', items: ['Image Optimization', 'Code Splitting', 'Lazy Loading', 'CDN Integration', 'Caching Strategy'] },
  { category: 'Analytics & SEO', items: ['Google Analytics 4', 'Google Search Console', 'Structured Data', 'Meta Tags', 'Sitemap'] },
];

const packages = [
  {
    name: 'Launch Website',
    price: 'UGX 1.5M – 3M',
    description: 'For startups, small businesses, and personal brands building a strong digital presence.',
    features: [
      'Up to 5 professionally crafted pages',
      'Responsive design across all devices',
      'Fast, modern website experience',
      'Content management setup',
      'WhatsApp and contact form integration',
      'Basic SEO foundation',
      'Secure SSL setup',
      'Launch support included',
    ],
    cta: 'Start Your Project',
    popular: false,
  },
  {
    name: 'Growth Website',
    price: 'UGX 4M – 8M',
    description: 'For growing businesses that need a stronger online presence, better structure, and more conversion opportunities.',
    features: [
      '10–15 custom-designed pages',
      'Premium interface with modern interactions',
      'Blog or updates section',
      'Conversion-focused layout strategy',
      'Advanced SEO setup',
      'Lead capture integration',
      'Analytics and tracking setup',
      'Post-launch support included',
    ],
    cta: 'Build for Growth',
    popular: true,
  },
  {
    name: 'Custom Platform',
    price: 'UGX 10M+',
    description: 'For businesses, organizations, and teams that need advanced functionality and scalable digital systems.',
    features: [
      'Custom website or web platform',
      'Advanced feature development',
      'User accounts and role management',
      'Database integration',
      'API and third-party integrations',
      'Scalable system architecture',
      'Enhanced security setup',
      'Built for long-term expansion',
    ],
    cta: 'Request a Custom Quote',
    popular: false,
  },
];

const process = [
  { step: '01', title: 'Discovery & Research', description: 'We analyze your competitors, target audience, and business goals to define success metrics.' },
  { step: '02', title: 'Wireframing & UX', description: 'Low-fidelity wireframes map user journeys. We validate flows before committing to visual design.' },
  { step: '03', title: 'Visual Design', description: 'High-fidelity designs bring your brand to life. We iterate until every detail aligns with your vision.' },
  { step: '04', title: 'Development', description: 'We build with modern frameworks, following best practices for performance, accessibility, and SEO.' },
  { step: '05', title: 'Testing & QA', description: 'Cross-browser testing, device testing, performance audits, and security checks before launch.' },
  { step: '06', title: 'Launch & Support', description: 'Seamless deployment with monitoring. We provide training and ongoing support as needed.' },
];

const faqs = [
  {
    q: 'How long does a website project take?',
    a: 'A standard corporate website typically takes 6–10 weeks. Ecommerce or complex web applications may take 12–20 weeks. We provide detailed timelines during discovery.',
  },
  {
    q: 'Do you work with existing designs or create from scratch?',
    a: 'Both. If you have designs from another agency, we can implement them. If not, our design team creates everything from scratch based on your brand and goals.',
  },
  {
    q: 'Will my website be mobile-friendly?',
    a: 'Absolutely. We design mobile-first, ensuring your site works perfectly on phones, tablets, and desktops. This is non-negotiable in modern web development.',
  },
  {
    q: 'Can I update content myself after launch?',
    a: 'Yes. We integrate a CMS (Contentful, Sanity, or custom) so you can update text, images, and pages without touching code. We provide training.',
  },
  {
    q: 'What about SEO?',
    a: 'SEO is built into our process. We handle technical SEO, on-page optimization, meta tags, structured data, and sitemaps. We can also coordinate with content strategists.',
  },
  {
    q: 'Do you offer ongoing maintenance?',
    a: 'Yes. We offer maintenance plans that include security updates, performance monitoring, content updates, and priority support. Plans start at $500/month.',
  },
];

export default function WebDesignDevelopmentPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 mesh-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Service</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold heading-display text-foreground mb-6">
                Web Design &{' '}
                <GradientText>Development</GradientText>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                Premium, high-performance websites built to convert and scale. We combine stunning design 
                with rock-solid engineering to create digital experiences that set you apart from competitors.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Button asChild size="lg" className="brand-gradient border-0 text-white hover:opacity-90 h-12 px-8">
                  <Link href="/get-a-quote">
                    Get a quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8">
                  <Link href="/contact">
                    Schedule a call
                  </Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-2xl">
                <Image
                  src="/web-design-development.png"
                  alt="Web Design and Development"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Deliver"
            title="More than just a website"
            description="We build complete digital experiences that drive business results — from first impression to conversion."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
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

      {/* Pricing Packages Section */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Website Packages"
            title="Designed for Growth"
            description="From launch-ready business websites to advanced custom platforms, InRevTech delivers modern web solutions built for performance, credibility, and long-term growth."
            className="mb-4"
          />
          <p className="text-center text-sm text-muted-foreground mb-16">All prices are in UGX</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {packages.map((pkg, i) => (
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
                      <Sparkles className="w-3.5 h-3.5" />
                      Most Popular
                      <Sparkles className="w-3.5 h-3.5" />
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

          {/* Custom Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 rounded-3xl border border-border bg-card p-8 sm:p-12 text-center"
          >
            <h3 className="text-2xl font-bold heading-display text-foreground mb-4">Need Something More Specific?</h3>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Every business has unique goals. If you need a tailored website, portal, booking system, ecommerce solution, or custom digital platform, InRevTech can prepare a solution built around your exact needs.
            </p>
            <Button asChild variant="outline" size="lg" className="h-12 px-8">
              <Link href="/contact">
                Talk to InRevTech
              </Link>
            </Button>
          </motion.div>

          {/* Trust Line */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Every package is crafted to balance design, speed, usability, and business value.
            </p>
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeader
                eyebrow="Project Deliverables"
                title="What you get"
                description="Every project includes these core deliverables, tailored to your specific needs."
                align="left"
                className="mb-8"
              />
              <div className="space-y-3">
                {deliverables.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-border bg-card p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold heading-display text-foreground mb-6">Tech Stack</h3>
              <div className="space-y-6">
                {techStack.map((stack) => (
                  <div key={stack.category}>
                    <h4 className="text-sm font-semibold text-primary mb-3">{stack.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {stack.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Process"
            title="How we work"
            description="A proven, collaborative approach that keeps you informed and in control at every stage."
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
              >
                <div className="text-4xl font-bold heading-display brand-gradient-text mb-4">{step.step}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-card/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Common questions"
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

      {/* CTA Section */}
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
              Ready to build your{' '}
              <span className="brand-gradient-text">perfect website</span>
              ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Let&apos;s talk about your project. We&apos;ll listen carefully, ask the right questions,
              and give you an honest assessment of what&apos;s possible.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="brand-gradient border-0 text-white hover:opacity-90 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all h-12 px-8"
              >
                <Link href="/get-a-quote">
                  Start a project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/contact">
                  Just say hello
                </Link>
              </Button>
            </div>
            <p className="mt-8 text-xs text-muted-foreground">
              No commitment required · Typical response within 24 hours
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
