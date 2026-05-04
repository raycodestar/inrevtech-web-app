'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleCheck as CheckCircle2, Send, Shield, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PhoneTextInput } from '@/components/ui/phone-text-input';
import { GradientText } from '@/components/ui/GradientText';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SERVICES, BUDGET_RANGES, TIMELINES } from '@/lib/constants';
import { submitInquiry } from '@/lib/supabase/client';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { ChevronDown } from "lucide-react"; // Optional: for a premium icon

const reassurances = [
  { icon: Shield, title: 'No obligation', description: 'Getting a quote is 100% free with zero commitment required.' },
  { icon: Clock, title: 'Fast response', description: 'We respond to every quote request within 1 business day.' },
  { icon: Users, title: 'Senior attention', description: 'Your project is reviewed by our senior team, not passed to a junior.' },
  { icon: Star, title: 'Honest estimates', description: "We tell you what things actually cost. No bait-and-switch pricing." },
];

const faqs = [
  { q: "What happens after I submit my quote request?", a: "Our team reviews your project brief within one business day. If we need clarification, we'll reach out via email. Otherwise, we'll provide a preliminary assessment including timeline, recommended technical approach, and estimated investment range. This is followed by a scoping call to discuss your specific needs in detail." },
  { q: "Is the quote binding or can it change?", a: "The initial quote is an estimate based on the information provided. Final pricing is determined during the scoping call once we fully understand your requirements. We maintain transparency throughout — any changes to scope or pricing are discussed and approved by you before proceeding." },
  { q: "Do you work with companies outside North America?", a: "Yes, we serve clients globally. Our distributed team is experienced with remote collaboration across time zones. We've successfully delivered projects for clients in Europe, Asia, Africa, and South America, adapting our communication processes to ensure seamless collaboration regardless of location." },
  { q: "What if I don't know my budget yet?", a: "That's perfectly fine. Select 'Not sure yet' and our team will help you understand what different investment levels can achieve for your goals. We provide transparent pricing information so you can make an informed decision. Many of our clients start without a clear budget and we guide them through the process." },
  { q: "How long does it take to complete a project?", a: "Project timelines vary based on scope and complexity. Simple projects may take 2-4 weeks, while comprehensive solutions can span 3-6 months. During the scoping call, we'll provide a detailed timeline estimate with milestones so you'll know exactly what to expect at each stage." },
  { q: "What payment terms do you offer?", a: "We offer flexible payment structures tailored to project size and duration. Typically, we require a deposit to begin work, with milestone-based payments throughout the project. For ongoing engagements, we can discuss retainer arrangements. All payment terms are clearly outlined in our project agreement before work begins." },
];

export default function GetAQuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedTimeline, setSelectedTimeline] = useState('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string | undefined): { isValid: boolean; message?: string } => {
    if (!phone || phone.trim() === '') {
      return { isValid: false, message: 'Phone number is required' };
    }
    if (!isValidPhoneNumber(phone)) {
      return { isValid: false, message: 'Invalid phone number for selected country' };
    }
    return { isValid: true };
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value);
    if (value) {
      const validation = validatePhone(value);
      setErrors(prev => ({
        ...prev,
        phone: validation.isValid ? undefined : validation.message
      }));
    } else {
      setErrors(prev => ({ ...prev, phone: 'Phone number is required' }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (email && !validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address (e.g., name@company.com)' }));
    } else {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const phoneValue = phone;

    const newErrors: { email?: string; phone?: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address (e.g., name@company.com)';
    }

    const phoneValidation = validatePhone(phoneValue);
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.message;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      await submitInquiry({
        name: formData.get('name') as string,
        email: email,
        company: formData.get('company') as string || undefined,
        phone: phoneValue || undefined,
        service: selectedService || undefined,
        budget: selectedBudget || undefined,
        timeline: selectedTimeline || undefined,
        message: formData.get('project-desc') as string,
        type: 'quote',
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
      alert('Failed to submit quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative py-24 sm:py-28 mesh-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Get a Quote</p>
            <h1 className="text-5xl sm:text-6xl font-bold heading-display text-foreground mb-6 max-w-3xl mx-auto">
              Tell us about your{' '}
              <GradientText>project</GradientText>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Fill in the details below and we&apos;ll come back to you with a clear, honest quote.
              No jargon, no surprises.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {reassurances.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">{item.title}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{item.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {submitted ? (
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
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5">
                    <h2 className="text-lg font-semibold text-foreground">Your details</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full name *</Label>
                        <Input id="name" name="name" placeholder="Jane Smith" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Work email *</Label>
                        <Input id="email" name="email" type="email" placeholder="jane@company.com" required onChange={handleEmailChange} />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company name</Label>
                        <Input id="company" name="company" placeholder="Acme Inc." />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone number *</Label>
                        <PhoneInput
                          id="phone"
                          value={phone}
                          onChange={handlePhoneChange}
                          international
                          defaultCountry="UG"
                          countryCallingCodeEditable={false}
                          displayInitialValueAsLocalNumber={false}
                          withCountryCallingCode={true}
                          className="flex h-10 w-full rounded-md border border-input bg-background"
                          countrySelectProps={{
                            className: 'rounded-l-md border-r-0 bg-transparent w-12',
                          }}
                          inputComponent={PhoneTextInput}
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
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
                        name="project-desc"
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
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-base font-semibold text-foreground mb-4">Common questions</h3>
                <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-border last:border-0">
                      <AccordionTrigger className="text-xs font-semibold text-foreground py-3 hover:text-primary transition-colors text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <p className="text-sm font-semibold text-foreground mb-2">Need to talk first?</p>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  If you&apos;d rather have a conversation before filling out a form, we&apos;re happy to jump on a discovery call.
                </p>
                <a href="/contact" className="text-xs font-medium text-primary hover:underline">
                  Go to contact page →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
