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
  publishedAt: string;
  readingTime: number;
  featured: boolean;
  coverImage: string;
}

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Technology', value: 'technology' },
  { label: 'Business', value: 'business' },
  { label: 'Design', value: 'design' },
  { label: 'Development', value: 'development' },
  { label: 'Industry Insights', value: 'industry-insights' },
] as const;

function getCategoryLabel(categoryValue?: string) {
  return categories.find((category) => category.value === categoryValue)?.label || 'General';
}

export default function BlogPostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  // Safety Check: If still loading or no posts exist, show a placeholder
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

  const postsToFilter = selectedCategory === 'all' ? rest : posts;
  const filteredPosts = postsToFilter.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 mesh-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold heading-display text-foreground mb-6 leading-tight">
              Insights & <GradientText>Expertise</GradientText>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Explore our latest thoughts on technology, design, and business strategy. Stay ahead with actionable insights from our team.
            </p>
            <div className="flex items-center gap-4 justify-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search insights..."
                  className="pl-10 bg-background border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
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
                  {getCategoryLabel(featured.category)}
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
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.value
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:bg-border'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 pb-24" id="guides">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts?.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                      <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-primary/90 text-white">{getCategoryLabel(post.category)}</span>
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
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No insights found matching your criteria.</p>
            </div>
          )}
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
            Get weekly insights on technology, design, and business strategy delivered to your inbox.
          </p>
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-background border-border"
            />
            <Button className="brand-gradient border-0 text-white hover:opacity-90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
