'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { placeholderProjects } from '@/data/placeholder';

export function FeaturedProjects() {
  const projects = placeholderProjects.slice(0, 4);

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <SectionHeader
            eyebrow="Our Work"
            title="Projects that move the needle"
            description="A selection of our most impactful work across industries and technologies."
            align="left"
          />
          <Button asChild variant="outline" className="flex-shrink-0 self-start sm:self-auto">
            <Link href="/work">
              View all work
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group block rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden bg-muted">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <span className="text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
                      {project.category}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0 translate-x-2">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs text-muted-foreground mb-1">{project.client} · {project.year}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>

                  {project.results && project.results.length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                      {project.results.map((result) => (
                        <div key={result.label}>
                          <div className="text-sm font-bold brand-gradient-text">{result.value}</div>
                          <div className="text-[11px] text-muted-foreground">{result.label}</div>
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
  );
}
