'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Twitter, Github, Quote, CircleCheck as CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/GradientText';
import { placeholderFounder } from '@/data/placeholder';

const expertise = [
  'Full-Stack Engineering (React, Next.js, Node.js, Python)',
  'AI/ML Integration & LLM Application Architecture',
  'Product Strategy & Go-to-Market Planning',
  'Cloud Infrastructure (AWS, GCP, Vercel)',
  'Ecommerce & Conversion Optimization',
  'Technical Leadership & Team Building',
  'SEO Architecture & Content Strategy',
  'Brand Strategy & Digital Identity',
];

const timeline = [
  { year: '2014', title: 'Founded InRevTech', description: 'Started with a vision to change how technology companies serve their clients.' },
  { year: '2016', title: 'First enterprise client', description: 'Delivered a mission-critical platform for a Fortune 1000 company — on time and under budget.' },
  { year: '2019', title: 'Expanded into AI', description: 'Built the team\'s first ML-powered product. Began establishing InRevTech\'s AI practice.' },
  { year: '2022', title: '50+ clients milestone', description: 'Passed the 50 client milestone with a 98% retention rate and expanded the core team.' },
  { year: '2024', title: 'Global reach', description: 'Now serving clients across North America, Europe, and Asia-Pacific with a fully remote team.' },
];

export default function FounderPage() {
  const founder = placeholderFounder;

  return (
    <>
      <section className="relative py-24 sm:py-32 overflow-hidden mesh-bg">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 sm:translate-x-0" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Founder & CEO</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold heading-display text-foreground mb-4 break-words">
                {founder.name}
              </h1>
              <p className="text-lg sm:text-xl text-primary font-medium mb-2">{founder.role}</p>
              <p className="text-sm text-muted-foreground mb-6">Also known as <span className="text-primary font-medium">RayCodeStar</span> in the developer community</p>
              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                {founder.bio}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {founder.linkedin && (
                  <a href={founder.linkedin} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors" aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {founder.twitter && (
                  <a href={founder.twitter} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors" aria-label="Twitter">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {founder.github && (
                  <a href={founder.github} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors" aria-label="GitHub">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                <Button asChild className="ml-0 sm:ml-2 brand-gradient border-0 text-white hover:opacity-90">
                  <Link href="/get-a-quote">
                    Work with Raymond
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative w-full"
            >
              <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden">
                <Image
                  src={founder.avatar ?? '/placeholder-avatar.jpg'}
                  alt={founder.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/50 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl border border-primary/20 bg-primary/5 p-8 sm:p-12">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/20 fill-primary/10" />
            <blockquote className="text-xl sm:text-2xl font-medium text-foreground leading-relaxed text-center pl-8 sm:pl-12">
              &ldquo;The best technology is invisible. It doesn&apos;t impose itself on the user —
              it quietly enables them to do things they couldn&apos;t do before. That&apos;s what
              we build at InRevTech.&rdquo;
            </blockquote>
            <p className="text-center text-sm text-muted-foreground mt-6">— Raymond Zion, Founder & CEO</p>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Expertise</p>
          <h2 className="text-3xl font-bold heading-display text-foreground mb-8">
            Depth across the full stack
          </h2>
          <div className="space-y-3 max-w-2xl mx-auto text-left">
            {expertise.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Expertise</p>
              <h2 className="text-3xl font-bold heading-display text-foreground mb-8">
                Depth across the full stack
              </h2>
              <div className="space-y-3">
                {expertise.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Journey</p>
              <h2 className="text-3xl font-bold heading-display text-foreground mb-8">
                A decade of building
              </h2>
              <div className="space-y-6">
                {timeline.map((event, i) => (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] font-bold">{event.year.slice(2)}</span>
                      </div>
                      {i < timeline.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <div className="text-xs text-primary font-semibold mb-1">{event.year}</div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">{event.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
