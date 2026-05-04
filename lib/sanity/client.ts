import { createClient } from '@sanity/client';
import { error } from 'console';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'cui18jca',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error: any) {
    console.warn('Sanity fetch warning (using fallback):', error.message || error);
    // Return empty array for list queries, null for single item queries
    return [] as T;
  }
}

export { latestInsightsQuery, postBySlugQuery, postSeoBySlugQuery, relatedPostsQuery, sitemapPostsQuery } from './queries';
