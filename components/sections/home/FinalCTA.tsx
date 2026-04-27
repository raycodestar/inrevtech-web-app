'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FinalCTA() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 brand-gradient opacity-[0.07]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.12)_0%,_transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Ready to build something great?
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold heading-display text-foreground mb-6">
            Your vision.{' '}
            <span className="brand-gradient-text">Our expertise.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Let&apos;s talk about your project. We&apos;ll listen carefully, ask the right questions,
            and give you an honest assessment of what&apos;s possible — and how we&apos;d approach it.
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
            <Button asChild variant="outline" size="lg" className="h-12 px-8 gap-2">
              <Link href="/contact">
                <MessageSquare className="w-4 h-4" />
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
  );
}
