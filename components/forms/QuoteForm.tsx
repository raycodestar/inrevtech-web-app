'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleCheck as CheckCircle2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SERVICES, BUDGET_RANGES, TIMELINES } from '@/lib/constants';

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedTimeline, setSelectedTimeline] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-primary/30 bg-primary/5 p-12 text-center"
      >
        <div className="w-16 h-16 rounded-full brand-gradient flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold heading-display text-foreground mb-4">Quote submitted!</h2>
        <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. We&apos;ve received your project details and will review
          everything carefully. Expect to hear from us within 1 business day.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5">
        <h2 className="text-lg font-semibold text-foreground">Your details</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full name *</Label>
            <Input id="name" placeholder="Jane Smith" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work email *</Label>
            <Input id="email" type="email" placeholder="jane@company.com" required />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company name</Label>
            <Input id="company" placeholder="Acme Inc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" type="tel" placeholder="+1 555 000 0000" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5">
        <h2 className="text-lg font-semibold text-foreground">Project details</h2>
        <div className="space-y-2">
          <Label>Primary service needed *</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SERVICES.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => setSelectedService(service)}
                className={`text-xs text-left px-3 py-2.5 rounded-lg border transition-all ${
                  selectedService === service
                    ? 'border-primary bg-primary/10 text-primary font-medium'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-desc">Project description *</Label>
          <Textarea
            id="project-desc"
            placeholder="Describe your project — what you're building, who it's for, what success looks like..."
            className="min-h-[120px] resize-none"
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Budget range</Label>
            <div className="space-y-1.5">
              {BUDGET_RANGES.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setSelectedBudget(range)}
                  className={`w-full text-xs text-left px-3 py-2 rounded-lg border transition-all ${
                    selectedBudget === range
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Desired timeline</Label>
            <div className="space-y-1.5">
              {TIMELINES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTimeline(t)}
                  className={`w-full text-xs text-left px-3 py-2 rounded-lg border transition-all ${
                    selectedTimeline === t
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full brand-gradient border-0 text-white hover:opacity-90 h-12"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Submitting...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Submit quote request
            <Send className="w-4 h-4" />
          </span>
        )}
      </Button>
    </form>
  );
}
