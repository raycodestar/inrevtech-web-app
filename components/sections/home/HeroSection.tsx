'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/GradientText';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden mesh-bg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.015] bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-4xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Premium Technology Partner for Ambitious Companies
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold heading-display text-foreground mb-6"
          >
            Imagine.{' '}
            <GradientText>Create.</GradientText>
            <br />
            Impact.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            We partner with forward-thinking companies to design, build, and scale
            technology that changes industries. From stunning web experiences to
            AI-powered systems — we turn your vision into competitive advantage.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="brand-gradient border-0 text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all h-12 px-8"
            >
              <Link href="/get-a-quote">
                Start your project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 border-border/60 hover:border-primary/50 gap-2"
            >
              <Link href="/work">
                <Play className="w-4 h-4 text-primary fill-primary/20" />
                View our work
              </Link>
            </Button>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-16"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Powered by modern technology</p>
            <div className="flex flex-wrap items-center gap-4">
              {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'Python', 'AWS', 'Vercel'].map((tech) => (
                <div
                  key={tech}
                  className="px-4 py-2 rounded-lg border border-border/60 bg-card/50 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-muted-foreground/50">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-primary/40 to-transparent"
        />
      </div>
    </section>
  );
}
