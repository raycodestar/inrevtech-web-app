'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Globe, Code as Code2, Brain, ShoppingCart, TrendingUp, Sparkles, Shield } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Code2, Brain, ShoppingCart, TrendingUp, Sparkles, Shield,
};

const services = [
  { icon: 'Globe', title: 'Web Design & Development', description: 'Premium, high-performance websites built to convert and scale with your business.', href: '/services/web-design-development', accent: 'from-sky-500/10 to-cyan-500/10' },
  { icon: 'Code2', title: 'Software Development', description: 'Custom software solutions engineered for your unique challenges and scale requirements.', href: '/services/software-development', accent: 'from-blue-500/10 to-sky-500/10' },
  { icon: 'Brain', title: 'AI-Powered Solutions', description: 'Intelligent automation, LLM integration, and custom ML models that give you an edge.', href: '/services/ai-powered-solutions', accent: 'from-cyan-500/10 to-teal-500/10', badge: 'Hot' },
  { icon: 'ShoppingCart', title: 'Ecommerce Development', description: 'High-converting online stores that turn browsers into buyers at any scale.', href: '/services/ecommerce-development', accent: 'from-sky-500/10 to-blue-500/10' },
  { icon: 'TrendingUp', title: 'SEO Services', description: 'Data-driven SEO strategy that builds compounding organic growth over time.', href: '/services/seo-services', accent: 'from-teal-500/10 to-cyan-500/10' },
  { icon: 'Sparkles', title: 'Branding', description: 'Strategic brand identities that communicate your vision and build lasting trust.', href: '/services/branding', accent: 'from-blue-500/10 to-sky-600/10' },
  { icon: 'Shield', title: 'Website Maintenance', description: 'Proactive care plans that keep your site fast, secure, and always performing.', href: '/services/website-maintenance', accent: 'from-sky-400/10 to-cyan-400/10' },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export function ServicesOverview() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What We Do"
          title="Services built for ambitious companies"
          description="From strategy to execution, we offer end-to-end technology services that drive real business outcomes."
          className="mb-16"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <motion.div key={service.href} variants={item}>
                <Link
                  href={service.href}
                  className="group relative flex flex-col h-full rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className={cn('absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300', service.accent)} />

                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      {Icon && <Icon className="w-5 h-5 text-primary" />}
                    </div>

                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-semibold text-foreground leading-tight">
                        {service.title}
                      </h3>
                      {service.badge && (
                        <span className="ml-2 flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full brand-gradient text-white">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
                      Learn more
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          <motion.div variants={item}>
            <Link
              href="/services"
              className="group flex flex-col items-center justify-center h-full rounded-2xl border border-dashed border-border bg-muted/30 p-6 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 min-h-[160px]"
            >
              <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                View all services
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary mt-1 group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
