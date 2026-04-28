'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Search, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GradientText } from '@/components/ui/GradientText';
import { sanityFetch, latestInsightsQuery } from '@/lib/sanity/client';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  featured: boolean;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

const categories = ['All', 'Technology', 'Business', 'Design', 'Development', 'Industry Insights'];

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await sanityFetch<Post[]>(latestInsightsQuery);
        setPosts(data || []);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Safety Check 1: If still loading or no posts exist, show a placeholder
  // This prevents the "slug" crash during the Vercel build process
  if (loading || !posts || posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground animate-pulse">Initializing insights...</p>
        </div>
      </div>
    );
  }

  const featured = posts.find(p => p.featured) || posts[0];
  const rest = posts.filter(p => p._id !== featured?._id);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 mesh-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Insights</p>
            <h1 className="text-5xl sm:text-6xl font-bold heading-display text-foreground mb-6">
              Ideas worth{' '}
              <GradientText>reading</GradientText>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Expert perspectives on technology, design, AI, and digital strategy —
              written for builders and founders who want to stay ahead.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">Featured Article</p>
          {featured && (
            <Link
              href={`/insights/${featured.slug?.current || "#"}`}
              className="group grid lg:grid-cols-5 gap-0 rounded-3xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="lg:col-span-3 relative h-64 lg:h-96 overflow-hidden bg-muted">
                <Image
                  src={featured.coverImage || '/fallback.png'}
                  alt={featured.title || 'Featured Post'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="lg:col-span-2 p-8 sm:p-10 flex flex-col justify-center">
                <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 rounded-full px-3 py-1 mb-4 w-fit">
                  {featured.category || 'Expertise'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold heading-display text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                  {featured.title || 'Untitled Article'}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                  {featured.excerpt || 'Read our latest insights from the team.'}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readingTime || 5} min read
                  </span>
                  <span>{featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently'}</span>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                  activeCategory === cat
                    ? 'brand-gradient text-white border-transparent shadow-sm'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 bg-card'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 pb-24" id="guides">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest?.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  href={`/insights/${post.slug?.current || "#"}`}
                  className="group flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden bg-muted">
                    <Image src={post.coverImage || '/fallback.png'} alt={post.title || 'Insight'} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-primary/90 text-white">{post.category || 'General'}</span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2 line-clamp-2">{post.title || "Untitled Post"}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">{post.excerpt || 'Click to read more...'}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground"><Clock className="w-3 h-3" />{post.readingTime || 5} min</span>
                      <span className="text-[11px] text-muted-foreground">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 border-t border-border bg-card/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold heading-display text-foreground mb-4">
            Stay in the loop
          </h2>
          <p className="text-base text-muted-foreground mb-8">
            Get our best insights delivered to your inbox. No spam — just actionable ideas for builders and founders.
          </p>
          <form className="flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="your@email.com" className="flex-1" />
            <Button type="submit" className="brand-gradient border-0 text-white hover:opacity-90 flex-shrink-0">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">Join 2,000+ readers. Unsubscribe any time.</p>
        </div>
      </section>
    </>
  );
}