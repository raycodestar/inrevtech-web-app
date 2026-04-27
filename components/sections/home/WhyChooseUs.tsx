'use client';

import { motion } from 'framer-motion';
import { Zap, Target, Users, Award, Clock, TrendingUp } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const reasons = [
  {
    icon: Award,
    title: 'Engineering excellence',
    description: 'We deliver production-grade code with clean architecture, comprehensive testing, and scalable design patterns that stand the test of time.',
  },
  {
    icon: Target,
    title: 'Strategic approach',
    description: 'Every project begins with understanding your business objectives. We align technical decisions with measurable outcomes, not just feature lists.',
  },
  {
    icon: Users,
    title: 'Dedicated partnership',
    description: 'You work directly with senior engineers and strategists — no account managers, no handoffs. We become an extension of your team.',
  },
  {
    icon: Zap,
    title: 'End-to-end capability',
    description: 'From concept to deployment and beyond, we handle the full lifecycle. Design, development, integration, and ongoing support under one roof.',
  },
  {
    icon: Clock,
    title: 'Transparent process',
    description: 'Clear communication, regular updates, and predictable timelines. You always know where your project stands and what comes next.',
  },
  {
    icon: TrendingUp,
    title: 'Future-ready solutions',
    description: 'We build with scalability in mind. Your solution grows with your business, accommodating new features and increased demand without rewrites.',
  },
];

const stats = [
  { value: 150, suffix: '+', label: 'Projects delivered' },
  { value: 98, suffix: '%', label: 'On-time delivery rate' },
  { value: 50, suffix: '+', label: 'Clients served' },
  { value: 10, suffix: '+', label: 'Years of expertise' },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 sm:py-32 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="Why InRevTech"
              title="Built different. Engineered for impact."
              description="We're not a typical agency. We're a team of builders, strategists, and technologists who care deeply about the work we produce."
              align="left"
              className="mb-12"
            />

            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Our technology stack</p>
              <div className="flex flex-wrap gap-3">
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Python', 'AWS', 'Vercel', 'Supabase', 'PostgreSQL'].map((tech) => (
                  <div
                    key={tech}
                    className="px-3 py-1.5 rounded-md border border-border/60 bg-card/50 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-4"
          >
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-colors"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                  <reason.icon className="w-4.5 h-4.5 text-primary" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{reason.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
