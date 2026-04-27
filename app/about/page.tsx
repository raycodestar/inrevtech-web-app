'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Eye, Heart, Lightbulb, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GradientText } from '@/components/ui/GradientText';

const values = [
  { icon: Target, title: 'Excellence without compromise', description: 'We hold ourselves to the highest standards in everything we ship. Good enough is never good enough.' },
  { icon: Users, title: 'Client success is our success', description: "Your wins are our wins. We're invested in your outcomes, not just completing a scope of work." },
  { icon: Lightbulb, title: 'Curiosity-driven innovation', description: 'We stay at the frontier of technology so you benefit from what&apos;s possible — not just what&apos;s conventional.' },
  { icon: Heart, title: 'Transparency and trust', description: 'We communicate openly, deliver what we promise, and never hide behind jargon or complexity.' },
  { icon: Zap, title: 'Speed with intention', description: "We move fast but thoughtfully — making decisions that won't need to be undone six months later." },
  { icon: Eye, title: 'Clarity of vision', description: "We help you see what you're building, why you're building it, and how it connects to what matters most." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative py-24 sm:py-32 overflow-hidden mesh-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">About InRevTech</p>
            <h1 className="text-5xl sm:text-6xl font-bold heading-display text-foreground mb-6">
              We exist to help{' '}
              <GradientText>ambitious companies</GradientText>
              {' '}build the future.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              InRevTech is a premium technology company founded on the belief that the companies
              that succeed in the digital age are those that treat technology as a strategic asset,
              not a cost center.
            </p>
          </motion.div>
        </div>
      </section>

      {/* <section className="py-20 border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: '2014', label: 'Founded' },
              { value: '150+', label: 'Projects delivered' },
              { value: '50+', label: 'Clients globally' },
              { value: '100%', label: 'Remote-first team' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold heading-display brand-gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Our Story</p>
              <h2 className="text-3xl sm:text-4xl font-bold heading-display text-foreground mb-6">
                Built by builders, for builders.
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  InRevTech started with a simple observation: most technology companies
                  treated clients as projects to be managed, not partners to be grown with. We set out
                  to be different.
                </p>
                <p>
                  Over many years later, we&apos;ve helped various companies build technology that has
                  changed their markets — from scrappy startups raising their first round to established
                  enterprises reimagining their digital infrastructure.
                </p>
                <p>
                  What sets us apart isn&apos;t just our technical ability — it&apos;s the fact that
                  we think like founders. We understand that every decision has a business consequence,
                  and we make sure the technology we build serves the strategy, not the other way around.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Our Mission</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To be the most trusted technology partner for ambitious companies — delivering
                  work that creates real, measurable impact and building relationships that last
                  decades, not projects.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Our Vision</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A world where every ambitious company — regardless of size or stage — has access
                  to the quality of technology expertise previously reserved for the Fortune 500.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Values"
            title="The principles we build by"
            description="These aren't values we wrote for a pitch deck. They're the beliefs that guide every decision we make."
            className="mb-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 brand-gradient opacity-[0.06]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold heading-display text-foreground mb-6">
            Meet the founder
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            InRevTech is led by Raymond Zion, a technology entrepreneur who honors
             the power of imagination to create and build solutions that solve critical 
             problems and deliver lasting impact.
          </p>
          <Button asChild size="lg" className="brand-gradient border-0 text-white hover:opacity-90">
            <Link href="/about/founder">
              Read Raymond&apos;s story
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
