'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, Share2, Tag, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollProgressFab } from '@/components/navigation/ScrollProgressFab';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { getHeadings, getPortableTextBlockText, slugifyHeading } from '@/lib/utils';

interface FAQ {
  question?: string;
  answer?: string;
}

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
  coverImageAlt?: string;
  mobileCoverImage?: string;
  mobileCoverImageAlt?: string;
  faqs?: FAQ[];
  author: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
  };
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  coverImage: string;
}

interface BlogPostContentProps {
  post: Post;
  relatedPosts: RelatedPost[];
}

export default function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const headings = useMemo(() => getHeadings(post.body || []), [post.body]);
  const faqs = useMemo(() => {
    return (post.faqs || []).filter((faq) => faq?.question?.trim() && faq?.answer?.trim());
  }, [post.faqs]);
  const headingIdsByKey = useMemo(() => {
    return new Map(headings.filter((heading) => heading._key).map((heading) => [heading._key, heading.id]));
  }, [headings]);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const tocNavRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia('(max-width: 639px)');

    const syncMobileViewport = () => {
      setIsMobileViewport(mobileMediaQuery.matches);
    };

    syncMobileViewport();
    mobileMediaQuery.addEventListener('change', syncMobileViewport);

    return () => {
      mobileMediaQuery.removeEventListener('change', syncMobileViewport);
    };
  }, []);

  // Keep the modular progress FAB synced with the section currently being read.
  useEffect(() => {
    if (headings.length === 0) {
      setActiveHeading('');
      return;
    }

    let animationFrameId: number | null = null;

    const updateActiveHeading = () => {
      const headingElements = headings
        .map((heading) => ({
          id: heading.id,
          element: document.getElementById(heading.id),
        }))
        .filter((heading): heading is { id: string; element: HTMLElement } => Boolean(heading.element));

      if (headingElements.length === 0) {
        return;
      }

      const scrollPosition = window.scrollY + 128;
      const viewportBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight - 24;
      let currentHeading = headingElements[0].id;

      for (const heading of headingElements) {
        const headingTop = heading.element.getBoundingClientRect().top + window.scrollY;

        if (headingTop <= scrollPosition) {
          currentHeading = heading.id;
        } else {
          break;
        }
      }

      if (viewportBottom >= pageBottom) {
        currentHeading = headingElements[headingElements.length - 1].id;
      }

      setActiveHeading((previousHeading) =>
        previousHeading === currentHeading ? previousHeading : currentHeading
      );
    };

    const scheduleActiveHeadingUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = null;
        updateActiveHeading();
      });
    };

    updateActiveHeading();
    window.addEventListener('scroll', scheduleActiveHeadingUpdate, { passive: true });
    window.addEventListener('resize', scheduleActiveHeadingUpdate);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener('scroll', scheduleActiveHeadingUpdate);
      window.removeEventListener('resize', scheduleActiveHeadingUpdate);
    };
  }, [headings]);

  useEffect(() => {
    if (!activeHeading || !tocNavRef.current) {
      return;
    }

    const activeTocItem = tocNavRef.current.querySelector<HTMLElement>(
      `[data-heading-id="${CSS.escape(activeHeading)}"]`
    );

    activeTocItem?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }, [activeHeading]);

  // PortableText components with heading IDs
  const components: PortableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.url) {
          return null;
        }

        const alt = value.alt || post.title;

        return (
          <figure className="my-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
              <Image
                src={value.url}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
            {value.alt && (
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                {value.alt}
              </figcaption>
            )}
          </figure>
        );
      },
      table: ({ value }: any) => {
        const rows = (value?.rows || [])
          .map((row: any) => ({
            cells: (row?.cells || []).map((cell: unknown) => String(cell ?? '')),
          }))
          .filter((row: { cells: string[] }) => row.cells.some((cell) => cell.trim()));

        if (rows.length === 0) {
          return null;
        }

        const hasHeaderRow = value?.hasHeaderRow !== false && rows.length > 1;
        const bodyRows = hasHeaderRow ? rows.slice(1) : rows;
        const columnCount = Math.max(...rows.map((row: { cells: string[] }) => row.cells.length));
        const isWideTable = columnCount > 2;

        return (
          <figure className="not-prose my-10 w-full min-w-0 max-w-full overflow-hidden">
            {value?.caption && (
              <figcaption className="mb-3 text-sm font-semibold text-foreground">
                {value.caption}
              </figcaption>
            )}
            <div className="w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain rounded-2xl border border-border bg-card [scrollbar-width:thin]">
              <table
                className={`w-full border-collapse text-sm ${
                  isWideTable ? 'min-w-[720px]' : 'min-w-0 table-fixed'
                }`}
              >
                {hasHeaderRow && (
                  <thead>
                    <tr className="border-b border-border bg-muted/60">
                      {rows[0].cells.map((cell: string, cellIndex: number) => (
                        <th
                          key={`header-${cellIndex}`}
                          scope="col"
                          className="break-words px-4 py-3 text-left font-semibold text-foreground"
                        >
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {bodyRows.map((row: { cells: string[] }, rowIndex: number) => (
                    <tr key={`row-${rowIndex}`} className="border-b border-border last:border-b-0">
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          key={`cell-${rowIndex}-${cellIndex}`}
                          className="break-words px-4 py-3 align-top text-muted-foreground"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </figure>
        );
      },
    },
    block: {
      h2: ({ children, value }: any) => {
        const id =
          headingIdsByKey.get(value?._key) ||
          slugifyHeading(getPortableTextBlockText(value));
        return (
          <h2 id={id} className="scroll-mt-28 text-3xl font-bold heading-display text-foreground mt-12 mb-6">
            {children}
          </h2>
        );
      },
      h3: ({ children, value }: any) => {
        const id =
          headingIdsByKey.get(value?._key) ||
          slugifyHeading(getPortableTextBlockText(value));
        return (
          <h3 id={id} className="scroll-mt-28 text-2xl font-semibold heading-display text-foreground mt-8 mb-4">
            {children}
          </h3>
        );
      },
      h4: ({ children }) => (
        <h4 className="text-xl font-semibold heading-display text-foreground mt-8 mb-3">
          {children}
        </h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-primary/50 pl-5 italic text-muted-foreground my-8">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => <p className="text-base text-muted-foreground leading-relaxed mb-6">{children}</p>,
    },
    marks: {
      link: ({ children, value }) => (
        <a href={value.href} className="text-primary hover:underline">
          {children}
        </a>
      ),
    },
  };

  const handleScrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 112; // Navbar height + some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const featuredImageSrc =
    isMobileViewport && post.mobileCoverImage ? post.mobileCoverImage : post.coverImage;
  const featuredImageAlt =
    isMobileViewport && post.mobileCoverImage
      ? post.mobileCoverImageAlt || post.coverImageAlt || post.title
      : post.coverImageAlt || post.title;
  const hasMobileCoverImage = Boolean(post.mobileCoverImage);
  const shouldContainFeaturedImage = isMobileViewport && !hasMobileCoverImage;

  return (
    <div className="min-h-screen">
      <ScrollProgressFab
        mode="blog"
        headings={headings}
        activeHeading={activeHeading}
        onHeadingSelect={handleScrollToHeading}
      />

      {/* Header Section */}
      <section className="relative pt-16 pb-8 sm:pt-20 sm:pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <List className="w-4 h-4 rotate-180" />
            Back to insights
          </Link>

          <div>
            <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 rounded-full px-3 py-1 mb-4">
              {post.category || 'Insight'}
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
                {post.readingTime || 5} min read
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently'}
              </span>
            </div>

            {post.author && (
              <div className="flex items-center gap-4 pb-6 border-b border-border">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={post.author.avatar || '/fallback-avatar.png'}
                    alt={post.author.name || 'Author'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{post.author.name || 'InRevTech Team'}</p>
                  <p className="text-xs text-muted-foreground">{post.author.role || 'Team Member'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid min-w-0 lg:grid-cols-12 gap-12">
            {/* Main Article */}
            <main className="min-w-0 lg:col-span-9">
              {post.coverImage && (
                <div
                  className={`relative mb-12 overflow-hidden rounded-3xl ${
                    shouldContainFeaturedImage
                      ? 'aspect-video h-auto bg-muted'
                      : 'h-[520px] sm:h-96'
                  }`}
                >
                  <Image
                    key={featuredImageSrc}
                    src={featuredImageSrc}
                    alt={featuredImageAlt}
                    fill
                    className={shouldContainFeaturedImage ? 'object-contain' : 'object-cover'}
                    priority
                    sizes="(max-width: 639px) 100vw, (max-width: 1024px) 100vw, 896px"
                  />
                </div>
              )}

              {/* Legacy sticky inline TOC intentionally disabled.
                  The modular progress FAB now opens the table of contents in a bottom sheet. */}

              <article className="prose prose-lg dark:prose-invert min-w-0 max-w-none prose-headings:heading-display prose-a:text-primary">
                <PortableText value={post.body} components={components} />
              </article>

              {faqs.length > 0 && (
                <section className="mt-16 rounded-2xl border border-border bg-card/60 p-6 sm:p-8">
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                      FAQs
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold heading-display text-foreground">
                      Frequently Asked Questions
                    </h2>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem
                        key={`${faq.question}-${index}`}
                        value={`faq-${index}`}
                        className="border-border last:border-b-0"
                      >
                        <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-primary hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              )}

              <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </main>

            {/* Desktop Sidebar TOC - Mobile uses the modular progress FAB bottom sheet. */}
            {headings.length > 0 && (
              <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-24">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
                    <List className="w-4 h-4" />
                    On this page
                  </div>
                  <nav
                    ref={tocNavRef}
                    className="max-h-[calc(100vh-10rem)] space-y-1 overflow-y-auto overscroll-contain pr-2 [scrollbar-width:thin]"
                  >
                    {headings.map((heading) => (
                      <button
                        key={heading.id}
                        onClick={() => handleScrollToHeading(heading.id)}
                        data-heading-id={heading.id}
                        aria-current={activeHeading === heading.id ? 'location' : undefined}
                        className={`block text-sm text-left transition-all w-full py-1.5 px-2 rounded-md ${
                          activeHeading === heading.id
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        } ${heading.level === 'h3' ? 'pl-6' : ''}`}
                      >
                        {heading.text}
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* Related Insights Section */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-24 border-t border-border bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold heading-display text-foreground mb-12">
              Related Insights
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  href={`/insights/${relatedPost.slug?.current || "#"}`}
                  className="group flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden bg-muted">
                    <Image
                      src={relatedPost.coverImage || '/fallback.png'}
                      alt={relatedPost.title || 'Related Post'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-primary/90 text-white">
                        {relatedPost.category || 'Insight'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2 line-clamp-2">
                      {relatedPost.title || 'Untitled Post'}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
                      {relatedPost.excerpt || 'Click to read more...'}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {relatedPost.readingTime || 5} min
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {relatedPost.publishedAt ? new Date(relatedPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
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
