'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GradientText } from '@/components/ui/GradientText';
import { placeholderProjects } from '@/data/placeholder';

const categories = ['All', 'Software Development', 'AI-Powered Solutions', 'Ecommerce Development', 'Web Design & Development'];

export default function WorkPage() {
  const featured = placeholderProjects[0];
  const rest = placeholderProjects.slice(1);

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
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Our Work</p>
            <h1 className="text-5xl sm:text-6xl font-bold heading-display text-foreground mb-6">
              Work that speaks{' '}
              <GradientText>for itself</GradientText>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We measure success in outcomes, not outputs. Here&apos;s a selection of the work
              we&apos;re most proud of — and the results it created.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16" id="case-studies">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">Featured Case Study</p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`/work/${featured.slug}`}
              className="group grid lg:grid-cols-2 gap-0 rounded-3xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="relative h-64 lg:h-auto overflow-hidden bg-muted">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />
              </div>
              <div className="p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-4">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {featured.category}
                  </div>
                  <h2 className="text-3xl font-bold heading-display text-foreground mb-3 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {featured.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featured.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {featured.results && (
                  <div>
                    <div className="grid grid-cols-3 gap-4 py-6 border-t border-border mb-6">
                      {featured.results.map((r) => (
                        <div key={r.label}>
                          <div className="text-2xl font-bold heading-display brand-gradient-text">{r.value}</div>
                          <div className="text-xs text-muted-foreground">{r.label}</div>
                        </div>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      View case study <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="All Projects"
            title="More of our work"
            align="left"
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="group flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <span className="text-[10px] font-semibold text-white/90 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-0.5">
                        {project.category}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="p-5 flex-1">
                    <div className="text-xs text-muted-foreground mb-1">{project.client} · {project.year}</div>
                    <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>
                    {project.results && (
                      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border">
                        {project.results.slice(0, 2).map((r) => (
                          <div key={r.label}>
                            <div className="text-sm font-bold brand-gradient-text">{r.value}</div>
                            <div className="text-[10px] text-muted-foreground">{r.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold heading-display text-foreground mb-6">
            Ready to be our next success story?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Let&apos;s talk about what you&apos;re building and how we can help you exceed your goals.
          </p>
          <Button asChild size="lg" className="brand-gradient border-0 text-white hover:opacity-90">
            <Link href="/get-a-quote">
              Start a project
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
