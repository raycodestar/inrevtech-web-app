export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Job title or position',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Company or organization name',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          type: 'text',
          name: 'alt',
          title: 'Alternative text',
          description: 'Important for accessibility.',
        },
      ],
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating out of 5',
      validation: (Rule: any) => Rule.required().min(1).max(5),
      initialValue: 5,
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
      author: 'author',
      company: 'company',
      rating: 'rating',
      media: 'avatar',
    },
    prepare(selection: any) {
      const { author, company, rating, media } = selection;
      return {
        title: author,
        subtitle: `${company} • ${'★'.repeat(rating)}`,
        media,
      };
    },
  },
};
