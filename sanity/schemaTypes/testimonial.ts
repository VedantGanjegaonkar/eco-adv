export const testimonial = {
  name: 'testimonial',
  title: 'Testimonial / Review',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Guest Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'trek',
      title: 'Trek Attended',
      type: 'reference',
      to: [{ type: 'trek' }],
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
      },
    },
    {
      name: 'comment',
      title: 'Testimonial',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Guest Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
  ],
}
