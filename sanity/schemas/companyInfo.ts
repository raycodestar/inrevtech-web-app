export default {
  name: 'companyInfo',
  title: 'Company Info',
  type: 'document',
  __experimental_actions: ['create', 'update', 'publish', 'delete'],
  fields: [
    {
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Company tagline or slogan',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Company description for SEO and about pages',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
    },
    {
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      description: 'Company LinkedIn URL',
    },
    {
      name: 'twitter',
      title: 'Twitter',
      type: 'url',
      description: 'Company Twitter/X URL',
    },
    {
      name: 'github',
      title: 'GitHub',
      type: 'url',
      description: 'Company GitHub URL',
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
      description: 'Main website URL',
    },
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
    },
    prepare(selection: any) {
      const { name, email } = selection;
      return {
        title: name,
        subtitle: email,
      };
    },
  },
};
