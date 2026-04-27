'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Code as Code2, Brain, ShoppingCart, TrendingUp, Sparkles, Shield, CircleCheck as CheckCircle2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GradientText } from '@/components/ui/GradientText';
import { placeholderServices } from '@/data/placeholder';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Code2, Brain, ShoppingCart, TrendingUp, Sparkles, Shield,
};

const process = [
  { step: '01', title: 'Discovery', description: "We start by deeply understanding your business, goals, constraints, and what success looks like for you." },
  { step: '02', title: 'Strategy', description: "We develop a clear plan of attack — the right technology choices, architecture decisions, and timeline." },
  { step: '03', title: 'Design', description: "Before writing a line of code, we design the experience. Every interface decision is rooted in user behavior and conversion." },
  { step: '04', title: 'Build', description: "We engineer with precision. Clean code, scalable architecture, comprehensive testing, and clear communication throughout." },
  { step: '05', title: 'Launch', description: "We deploy with confidence. Thorough QA, performance optimization, and a smooth go-live experience." },
  { step: '06', title: 'Grow', description: "The relationship doesn't end at launch. We help you iterate, optimize, and scale based on real data." },
];

const faqs = [
  { q: 'How long does a typical project take?', a: 'It depends on scope. A focused landing page or small web app typically takes 4–8 weeks. A full custom platform might take 3–6 months. We always give honest estimates up front.' },
  { q: 'Do you work with startups or established businesses?', a: 'Both. We work with companies at every stage — from pre-seed startups building their MVP to established enterprises modernizing their tech stack.' },
  { q: 'What\'s included in your maintenance plans?', a: 'Our maintenance plans include security monitoring, software updates, performance audits, uptime monitoring, content updates, and priority support access.' },
  { q: 'Do you offer fixed-price or time-and-materials engagements?', a: 'Both models are available. We recommend fixed-price for well-defined projects and T&M for exploratory or evolving engagements. We\'ll recommend the right model for your situation.' },
  { q: 'Can you work with our existing team?', a: 'Absolutely. We often embed with in-house teams as a specialized extension, filling skill gaps or providing senior technical leadership.' },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <>
      <section className="relative py-24 sm:py-32 mesh-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Services</p>
            <h1 className="text-5xl sm:text-6xl font-bold heading-display text-foreground mb-6">
              Everything you need to{' '}
              <GradientText>build and grow</GradientText>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We offer a comprehensive suite of technology services, designed to work together
              as an integrated system — or stand alone as focused engagements.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8">
            {placeholderServices.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Globe;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  id={service.slug}
                  className="rounded-3xl border border-border bg-card p-8 sm:p-10 hover:border-primary/30 transition-colors"
                >
                  <div className="grid sm:grid-cols-[1fr_auto] gap-8">
                    <div>
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-foreground">{service.title}</h2>
                        </div>
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <span className="text-xs text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-start sm:items-end gap-3 sm:justify-between">
                      {(service.slug === 'web-design-development' || service.slug === 'software-development' || service.slug === 'ecommerce-development' || service.slug === 'branding' || service.slug === 'ai-powered-solutions' || service.slug === 'seo-services') ? (
                        <Button asChild className="brand-gradient border-0 text-white hover:opacity-90 flex-shrink-0">
                          <Link href={`/services/${service.slug}`}>
                            Learn more
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Button asChild className="brand-gradient border-0 text-white hover:opacity-90 flex-shrink-0">
                          <Link href="/get-a-quote">
                            Get a quote
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How We Work"
            title="Our process, from idea to impact"
            description="A clear, collaborative approach that keeps you informed and in control at every stage."
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="text-4xl font-bold heading-display brand-gradient-text mb-4">{step.step}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient opacity-[0.06]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold heading-display text-foreground mb-6">
            Ready to start?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Tell us about your project and we&apos;ll give you an honest, no-pressure assessment.
          </p>
          <Button asChild size="lg" className="brand-gradient border-0 text-white hover:opacity-90 h-12 px-8">
            <Link href="/get-a-quote">
              Get a free quote
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
