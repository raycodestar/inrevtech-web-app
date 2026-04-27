'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Twitter, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { placeholderFounder } from '@/data/placeholder';

export function FounderSpotlight() {
  const founder = placeholderFounder;

  return (
    <section className="py-24 sm:py-32 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-3xl overflow-hidden">
              <Image
                src={founder.avatar ?? '/placeholder-avatar.jpg'}
                alt={founder.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-6 hidden lg:block w-48 rounded-2xl border border-border bg-card p-4 shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">JR</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">{founder.name}</div>
                  <div className="text-[10px] text-muted-foreground">{founder.role}</div>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                "Technology should solve real problems for real people."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Meet the Founder
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold heading-display text-foreground mb-4">
              {founder.name}
            </h2>
            <p className="text-primary font-medium mb-6">{founder.role}</p>

            <div className="relative mb-6">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20 fill-primary/10" />
              <p className="text-base text-muted-foreground leading-relaxed pl-6 italic">
                "I built InRevTech because I believed that ambitious companies deserved a technology partner that understood both the art and the science of great digital products."
              </p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              {founder.bio}
            </p>

            <div className="flex items-center gap-4 mb-8">
              {founder.linkedin && (
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {founder.twitter && (
                <a
                  href={founder.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>

            <Button asChild variant="outline" className="gap-2">
              <Link href="/about/founder">
                Read Jordan's full story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
