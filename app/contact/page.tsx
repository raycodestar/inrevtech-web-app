'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PhoneTextInput } from '@/components/ui/phone-text-input';
import { GradientText } from '@/components/ui/GradientText';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS } from '@/lib/constants';
import { siteConfig } from '@/lib/constants';
import { submitInquiry } from '@/lib/supabase/client';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

const contactOptions = [
  { icon: Mail, label: 'Email us', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, description: 'Best for detailed inquiries and project briefs.' },
  { icon: Phone, label: 'Call us', value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE}`, description: 'Available Mon–Fri, 9am–6pm EST.' },
  { icon: MapPin, label: 'Location', value: CONTACT_ADDRESS, href: '#', description: 'We serve clients globally.' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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
        service: formData.get('service') as string || undefined,
        message: formData.get('message') as string,
        type: 'contact',
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit inquiry:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Contact</p>
            <h1 className="text-5xl sm:text-6xl font-bold heading-display text-foreground mb-6">
              Let&apos;s start a{' '}
              <GradientText>conversation</GradientText>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you have a project in mind, a question, or just want to say hello —
              we&apos;d love to hear from you. We respond to every message.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {contactOptions.map((option, i) => (
              <motion.a
                key={option.label}
                href={option.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <option.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">{option.label}</div>
                  <div className="text-sm font-semibold text-foreground">{option.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold heading-display text-foreground mb-4">Send us a message</h2>
              <p className="text-sm text-muted-foreground mb-8">
                Tell us about your project, ask a question, or just introduce yourself.
                We typically respond within 24 hours on business days.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-primary/30 bg-primary/5 p-10 text-center"
                >
                  <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center mx-auto mb-4">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message sent!</h3>
                  <p className="text-sm text-muted-foreground">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full name *</Label>
                      <Input id="name" name="name" placeholder="Jane Smith" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address *</Label>
                      <Input id="email" name="email" type="email" placeholder="jane@company.com" required onChange={handleEmailChange} />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" name="company" placeholder="Acme Inc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service of interest</Label>
                      <Input id="service" name="service" placeholder="Web Development" />
                    </div>
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
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" name="message" placeholder="Tell us about your project or question..." className="min-h-[140px] resize-none" required />
                  </div>
                  <Button type="submit" className="w-full brand-gradient border-0 text-white hover:opacity-90 h-11" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send message
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              <div className="rounded-2xl border border-border bg-card p-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Have a project in mind?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  For project inquiries, our dedicated quote request form helps us understand
                  your needs faster and give you a more accurate response.
                </p>
                <Button asChild variant="outline" className="gap-2">
                  <a href="/get-a-quote">
                    Get a project quote
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>

              <div className="rounded-2xl border border-border bg-card p-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Follow us</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Stay up to date with our latest work, insights, and announcements.
                </p>
                <div className="flex gap-3">
                  {siteConfig.links.linkedin && (
                    <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {siteConfig.links.twitter && (
                    <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {siteConfig.links.github && (
                    <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-8">
                <h3 className="text-lg font-semibold text-foreground mb-2">Response time</h3>
                <p className="text-sm text-muted-foreground">
                  We aim to respond to all inquiries within <strong className="text-foreground">24 business hours</strong>.
                  For urgent matters, please call us directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
