import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants';
import { sanityFetch, sitemapPostsQuery } from '@/lib/sanity/client';

interface SitemapPost {
  slug: string;
  _updatedAt?: string;
  publishedAt?: string;
}

export const revalidate = 3600;

const staticRoutes = [
  '',
  '/about',
  '/about/founder',
  '/contact',
  '/get-a-quote',
  '/insights',
  '/services',
  '/services/ai-powered-solutions',
  '/services/branding',
  '/services/ecommerce-development',
  '/services/seo-services',
  '/services/software-development',
  '/services/web-design-development',
  '/work',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanityFetch<SitemapPost[]>(sitemapPostsQuery);
  const now = new Date();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/insights' ? 0.8 : 0.7,
  })) satisfies MetadataRoute.Sitemap;

  const postEntries = (posts || []).map((post) => ({
    url: `${siteConfig.url}/insights/${post.slug}`,
    lastModified: new Date(post._updatedAt || post.publishedAt || now),
    changeFrequency: 'weekly',
    priority: 0.8,
  })) satisfies MetadataRoute.Sitemap;

  return [...staticEntries, ...postEntries];
}
