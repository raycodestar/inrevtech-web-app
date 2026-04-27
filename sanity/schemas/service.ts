export default {
  name: 'service',
  title: 'Service',
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
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief description for service cards and listings',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'Full service description for detail pages',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., Globe, Code2, Brain)',
      options: {
        list: [
          { title: 'Globe', value: 'Globe' },
          { title: 'Code2', value: 'Code2' },
          { title: 'Brain', value: 'Brain' },
          { title: 'ShoppingCart', value: 'ShoppingCart' },
          { title: 'TrendingUp', value: 'TrendingUp' },
          { title: 'Sparkles', value: 'Sparkles' },
          { title: 'Shield', value: 'Shield' },
        ],
      },
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
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
      icon: 'icon',
    },
    prepare(selection: any) {
      const { title, icon } = selection;
      return {
        title,
        subtitle: icon,
      };
    },
  },
};
