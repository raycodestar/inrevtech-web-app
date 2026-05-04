import React from 'react';
import type { BlockStyleProps } from 'sanity';
import { SmartPortableTextInput } from '../components/SmartPortableTextInput';

function SafeBlockquoteStyle(props: BlockStyleProps) {
  return React.createElement(
    'blockquote',
    {
      style: {
        borderLeft: '3px solid var(--card-border-color)',
        fontStyle: 'italic',
        margin: 0,
        paddingLeft: '0.75rem',
      },
    },
    props.children
  );
}

export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description for the blog post listing',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      description: 'Optional search and social metadata. Falls back to the post title, excerpt, and cover image.',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for Google and social previews. Keep it concise.',
          validation: (Rule: any) => Rule.max(70).warning('Aim for 50-60 characters where possible.'),
        },
        {
          name: 'metaDesc',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description for search results. Keep it persuasive and specific.',
          validation: (Rule: any) => Rule.max(170).warning('Aim for 140-160 characters where possible.'),
        },
        {
          name: 'shareImage',
          title: 'Share Image',
          type: 'image',
          description: 'Specific image for social sharing. Recommended size: 1200 x 630.',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative text',
              type: 'text',
              rows: 2,
            },
          ],
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      components: {
        input: SmartPortableTextInput,
      },
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote', component: SafeBlockquoteStyle },
          ],
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.',
            },
          ],
        },
        {
          name: 'table',
          title: 'Table',
          type: 'object',
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional short title or explanation for the table.',
            },
            {
              name: 'hasHeaderRow',
              title: 'First row is header',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [
                {
                  name: 'tableRow',
                  title: 'Row',
                  type: 'object',
                  fields: [
                    {
                      name: 'cells',
                      title: 'Cells',
                      type: 'array',
                      of: [{ type: 'string' }],
                    },
                  ],
                  preview: {
                    select: {
                      cells: 'cells',
                    },
                    prepare(selection: any) {
                      return {
                        title: selection.cells?.join(' | ') || 'Empty row',
                      };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'caption',
              rows: 'rows',
            },
            prepare(selection: any) {
              const rowCount = selection.rows?.length || 0;

              return {
                title: selection.title || 'Table',
                subtitle: `${rowCount} ${rowCount === 1 ? 'row' : 'rows'}`,
              };
            },
          },
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          type: 'text',
          name: 'alt',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
        },
      ],
    },
    {
      name: 'mobileCoverImage',
      title: 'Mobile Cover Image',
      type: 'image',
      description: 'Optional portrait or mobile-optimized cover image. Falls back to the main cover image.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          type: 'text',
          name: 'alt',
          title: 'Alternative text',
          description: 'Optional. Falls back to the main cover image alt text or post title.',
        },
      ],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Technology', value: 'technology' },
          { title: 'Business', value: 'business' },
          { title: 'Design', value: 'design' },
          { title: 'Development', value: 'development' },
          { title: 'Industry Insights', value: 'industry-insights' },
        ],
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark as featured to highlight on homepage',
      initialValue: false,
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      description: 'Optional FAQ section displayed at the end of the blog post.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection: any) {
      const { title, author, media, publishedAt } = selection;
      return {
        title,
        subtitle: `${author || 'Unknown'} • ${new Date(publishedAt).toLocaleDateString()}`,
        media,
      };
    },
  },
};
