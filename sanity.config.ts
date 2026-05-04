import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas'; // Ensure this path is correct

export default defineConfig({
  name: 'inrevtech-cms',
  title: 'InRevTech CMS',
  basePath: '/studio',
  // Ensure these variables are set in your Vercel Dashboard
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'cui18jca',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});