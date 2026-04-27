'use client';

import { motion } from 'framer-motion';

const clients = [
  'NexaFlow',
  'Luminary Fashion',
  'PulseAI Health',
  'Verdant AgriTech',
  'ClearPath Finance',
  'Orca Studios',
  'Meridian Labs',
  'Apex Dynamics',
];

export function TrustStrip() {
  return (
    <section className="py-14 border-y border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-10">
          Trusted by innovative companies worldwide
        </p>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-card/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-card/50 to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-16 whitespace-nowrap"
          >
            {[...clients, ...clients].map((client, i) => (
              <span
                key={`${client}-${i}`}
                className="text-lg font-semibold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors cursor-default select-none"
              >
                {client}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
