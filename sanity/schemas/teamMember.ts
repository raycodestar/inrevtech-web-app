export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
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
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      description: 'Professional biography',
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
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      description: 'LinkedIn profile URL',
    },
    {
      name: 'twitter',
      title: 'Twitter',
      type: 'url',
      description: 'Twitter/X profile URL',
    },
    {
      name: 'github',
      title: 'GitHub',
      type: 'url',
      description: 'GitHub profile URL',
    },
    {
      name: 'isFounder',
      title: 'Is Founder',
      type: 'boolean',
      description: 'Mark as founder to highlight on founder page',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      name: 'name',
      role: 'role',
      media: 'avatar',
    },
    prepare(selection: any) {
      const { name, role, media } = selection;
      return {
        title: name,
        subtitle: role,
        media,
      };
    },
  },
};
