export const gallery = {
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'trek',
      title: 'Related Trek',
      type: 'reference',
      to: [{ type: 'trek' }],
    },
    {
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Photo',
              options: { hotspot: true },
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Photo Caption',
            },
            {
              name: 'photographerName',
              type: 'string',
              title: 'Photographer Name',
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
  ],
}
