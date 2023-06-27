import { ImagesIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutIntroPhoto',
  title: 'About page intro photo',
  icon: ImagesIcon,
  type: 'document',
  fields: [
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
      ],
    }),
  ],
});
