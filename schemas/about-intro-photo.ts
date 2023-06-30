import { ImagesIcon } from '@sanity/icons';
import { format, parseISO } from 'date-fns';
import { defineArrayMember, defineField, defineType } from 'sanity';

import authorType from './author';

// TODO: Probably remodel this into an About document that has an array of images.
export default defineType({
  name: 'aboutIntroPhoto',
  title: 'About page intro photo',
  icon: ImagesIcon,
  type: 'document',
  fields: [
    // TODO: add a <small> thing to the text editors + extract some of these components.
    defineField({
      name: 'photoImage',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              marks: {
                annotations: [
                  defineField({
                    type: 'object',
                    name: 'link',
                    fields: [
                      {
                        type: 'url',
                        name: 'href',
                        title: 'URL',
                        validation: (rule) =>
                          rule.required().uri({ scheme: 'https' }),
                      },
                      {
                        title: 'Open in a new tab',
                        name: 'blank',
                        type: 'boolean',
                        initialValue: true,
                      },
                    ],
                  }),
                ],
              },
            }),
          ],
          title: 'Caption',
          hidden: (document) => {
            return document?.parent?.asset === undefined;
          },
          validation: (rule) =>
            rule.custom((value: string, context) => {
              if (value && value.length > 0 && !context.parent.asset) {
                return 'An image must be added for this value to be accepted.';
              }

              if ((!value || value.length < 1) && context.parent.asset) {
                return 'Please attribute the image.';
              }

              return true;
            }),
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alt',
          hidden: (document) => {
            return document?.parent?.asset === undefined;
          },
          validation: (rule) =>
            rule.custom((value: string, context) => {
              if (value && value.length > 0 && !context.parent.asset) {
                return 'An image must be added for this value to be accepted.';
              }

              if ((!value || value.length < 5) && context.parent.asset) {
                return 'Please add an alt description for the image.';
              }

              return true;
            }),
        },
        {
          name: 'cropMode',
          type: 'string',
          options: {
            list: [
              { title: 'Top', value: 'top' },
              { title: 'Bottom', value: 'bottom' },
              { title: 'Left', value: 'left' },
              { title: 'Right', value: 'right' },
              { title: 'Center', value: 'center' },
              { title: 'Focal point', value: 'focalpoint' },
              { title: 'Entropy', value: 'entropy' },
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'focalpoint',
          hidden: (document) => {
            return document?.parent?.asset === undefined;
          },
          validation: (rule) =>
            rule.custom((value: string, context) => {
              if (value && value.length > 0 && !context.parent.asset) {
                return 'An image must be added for this value to be accepted.';
              }

              if (
                context.parent.asset &&
                !['top', 'bottom', 'left', 'right', 'center', 'focalpoint', 'entropy'].includes(value)
              ) {
                return 'Please specify the crop mode.';
              }

              return true;
            }),
        },
      ],
    }),
    defineField({
      name: 'orderNumber',
      title: 'Order number',
      type: 'number',
      validation: (rule) => rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: authorType.name }],
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Published at, desc',
      name: 'publishedAtDateDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published at, asc',
      name: 'publishedAtDateAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Order number, desc',
      name: 'orderNumberDesc',
      by: [{ field: 'orderNumber', direction: 'desc' }],
    },
    {
      title: 'Order number, asc',
      name: 'orderNumberAsc',
      by: [{ field: 'orderNumber', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'photoImage.alt',
      author: 'author.firstName',
      date: 'publishedAt',
      media: 'photoImage',
    },
    prepare({ title, media, author, date }) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean);

      return { title, media, subtitle: subtitles.join(' ') };
    },
  },
});
