import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas'; // This now points to the array we fixed in Step 1

export default defineConfig({
  name: 'inrevtech-cms',
  title: 'InRevTech CMS',
  // Using ! tells TypeScript these will definitely exist (since you added them to Vercel)
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, 
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  
  basePath: '/studio', // This ensures the editor lives at yourdomain.com/studio
  
  plugins: [structureTool(), visionTool()],
  
  schema: {
    types: schemaTypes,
  },
});