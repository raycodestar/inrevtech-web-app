export default {
  name: 'project',
  title: 'Project',
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
      name: 'client',
      title: 'Client',
      type: 'string',
      description: 'Client or company name',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Software Development', value: 'Software Development' },
          { title: 'Ecommerce Development', value: 'Ecommerce Development' },
          { title: 'AI-Powered Solutions', value: 'AI-Powered Solutions' },
          { title: 'Web Design & Development', value: 'Web Design & Development' },
          { title: 'SEO Services', value: 'SEO Services' },
          { title: 'Branding', value: 'Branding' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief description for project cards',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'Full project description',
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
          description: 'Important for SEO and accessibility.',
        },
      ],
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
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark as featured to highlight on homepage',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      category: 'category',
      media: 'coverImage',
      year: 'year',
    },
    prepare(selection: any) {
      const { title, client, category, media, year } = selection;
      return {
        title,
        subtitle: `${client} • ${category} • ${year}`,
        media,
      };
    },
  },
};