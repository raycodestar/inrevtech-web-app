import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/lib/constants';
import { sanityFetch, postBySlugQuery, postSeoBySlugQuery, relatedPostsQuery } from '@/lib/sanity/client';
import BlogPostContent from './BlogPostContent';

export const revalidate = 300;

interface PostSeo {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
  _updatedAt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  mobileCoverImage?: string;
  mobileCoverImageAlt?: string;
  seo?: {
    metaTitle?: string;
    metaDesc?: string;
    keywords?: string[];
    shareImage?: string;
    shareImageAlt?: string;
  };
  author?: {
    name?: string;
  };
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  _updatedAt?: string;
  body: any[];
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  coverImage: string;
  coverImageAlt?: string;
  mobileCoverImage?: string;
  mobileCoverImageAlt?: string;
  seo?: {
    metaTitle?: string;
    metaDesc?: string;
    keywords?: string[];
    shareImage?: string;
    shareImageAlt?: string;
  };
  faqs?: {
    question?: string;
    answer?: string;
  }[];
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

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function getPostUrl(slug: string) {
  return `${siteConfig.url}/insights/${slug}`;
}

function getSeoTitle(post: PostSeo) {
  return post.seo?.metaTitle?.trim() || post.title;
}

function getSeoDescription(post: PostSeo) {
  return post.seo?.metaDesc?.trim() || post.excerpt || siteConfig.description;
}

function getSeoImage(post: PostSeo) {
  return post.seo?.shareImage || post.coverImage || siteConfig.ogImage;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<PostSeo | null>(postSeoBySlugQuery, { slug });

  if (!post || Array.isArray(post)) {
    return {
      title: `Insight Not Found | ${siteConfig.name}`,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = getSeoTitle(post);
  const description = getSeoDescription(post);
  const image = getSeoImage(post);
  const url = getPostUrl(post.slug?.current || slug);
  const imageAlt = post.seo?.shareImageAlt || post.coverImageAlt || title;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    keywords: post.seo?.keywords?.length ? post.seo.keywords : post.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
      creator: '@inrevtech',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await sanityFetch<Post>(postBySlugQuery, { slug });

  if (!post || Array.isArray(post)) {
    notFound();
  }

  const relatedPosts = await sanityFetch<RelatedPost[]>(relatedPostsQuery, {
    category: post.category,
    currentId: post._id,
  });

  const seoPost: PostSeo = post;
  const canonicalUrl = getPostUrl(post.slug?.current || slug);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: getSeoTitle(seoPost),
    description: getSeoDescription(seoPost),
    image: [getSeoImage(seoPost)],
    author: {
      '@type': 'Person',
      name: post.author?.name || siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.ogImage,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <BlogPostContent post={post} relatedPosts={relatedPosts || []} />
    </>
  );
}

export async function generateStaticParams() {
  return [];
}
