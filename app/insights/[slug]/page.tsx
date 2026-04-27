import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { sanityFetch, postBySlugQuery } from '@/lib/sanity/client';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/GradientText';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: any[];
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  coverImage: string;
  author: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await sanityFetch<Post>(postBySlugQuery, { slug: params.slug });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <section className="relative py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to insights
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 rounded-full px-3 py-1 mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold heading-display text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-12 pb-8 border-b border-border">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden mb-12">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {/* Render the body content */}
            {post.body.map((block: any, index: number) => {
              if (block._type === 'block') {
                return (
                  <p key={index} className="text-base text-foreground leading-relaxed mb-6">
                    {block.children?.map((child: any) => child.text).join('')}
                  </p>
                );
              }
              if (block._type === 'image') {
                return (
                  <div key={index} className="relative h-64 sm:h-80 rounded-2xl overflow-hidden my-8">
                    <Image
                      src={block.asset?.url}
                      alt={block.alt || ''}
                      fill
                      className="object-cover"
                    />
                  </div>
                );
              }
              return null;
            })}
          </motion.article>

          <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold heading-display text-foreground mb-4">
            Ready to start your project?
          </h2>
          <p className="text-base text-muted-foreground mb-8">
            Let's discuss how we can help you achieve your goals.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/get-a-quote">
              <Button className="brand-gradient border-0 text-white hover:opacity-90">
                Get a quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">
                Contact us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  // This will be replaced with actual data fetching once Sanity is connected
  return [];
}
