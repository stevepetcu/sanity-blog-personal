import { BookIcon } from '@sanity/icons';
import { format, parseISO } from 'date-fns';
import { defineArrayMember, defineField, defineType, SlugValue } from 'sanity';

import authorType from './author';
import tagType from './tag';

// TODO:
//  1. Fix TS errors.
//  2. Extract duplicated validation and other functions.
//  3. Type things (use the types defined in the sanity.queries.ts file but consider moving them to another file.
//  4. Add a way to clear fields (like you can for images, but for e.g., string/radio fields etc.
//     In particular when you clear a parent object's value, like an image, its associated
//     fields stick around in the data.
//  5. Set an initial value for the post author.

export default defineType({
  name: 'post',
  title: 'Post',
  icon: BookIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 110,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) =>
        rule.required().custom((value: SlugValue) => {
          return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)
            ? true
            : 'Slug value must match the RegExp "^[a-z]+(?:-[a-z]+)*$".';
        }),
    }),
    defineField({
      name: 'isPinned',
      title: 'Pin article',
      type: 'boolean',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
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
    defineField({
      name: 'embeddedWebsiteUrl',
      title: 'Embedded website URL',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: 'https' }),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (rule) => rule.min(3).max(100),
            },
            {
              name: 'anchor',
              title: 'Anchor',
              type: 'slug',
              options: {
                source: (document, opts) => {
                  return 'heading' in opts.parent
                    ? (opts.parent.heading as string)
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .slice(0, 110)
                    : '';
                },
                maxLength: 110,
                isUnique: (value: string, context) => {
                  const documentContentSections = context.document
                    .content as Array<{ anchor: SlugValue; _key: string }>;
                  const slugParent = context.parent as { _key: string };

                  return (
                    documentContentSections.some(
                      (section) =>
                        slugParent._key !== section._key &&
                        section.anchor &&
                        section.anchor.current === value
                    ) === false
                  );
                },
              },
              validation: (rule) =>
                rule.custom((value: SlugValue, context) => {
                  return !context.parent?.heading ||
                    context.parent?.heading.length === 0 ||
                    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)
                    ? true
                    : 'Slug value must match the RegExp "^[a-z0-9]+(?:-[a-z0-9]+)*$".';
                }),
            },
            {
              name: 'body',
              title: 'Body',
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
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      {
                        title: 'Underline',
                        value: 'underline',
                        icon: () => (
                          <span
                            style={{
                              textDecoration: 'underline',
                              textDecorationColor: 'lightblue',
                            }}
                          >
                            U
                          </span>
                        ),
                        component: (props) => (
                          <span
                            style={{
                              textDecoration: 'underline',
                              textDecorationColor: 'lightblue',
                            }}
                          >
                            {props.children}
                          </span>
                        ),
                      },
                      { title: 'Code', value: 'code' },
                      {
                        title: 'Highlight',
                        value: 'highlight',
                        icon: () => (
                          <span
                            style={{
                              backgroundColor: 'darkblue',
                              padding: '0px 5px',
                            }}
                          >
                            H
                          </span>
                        ),
                        component: (props) => (
                          <span style={{ backgroundColor: 'darkblue' }}>
                            {props.children}
                          </span>
                        ),
                      },
                      {
                        title: 'Superscript',
                        value: 'sup',
                        icon: () => (
                          <>
                            T<sup>S</sup>
                          </>
                        ),
                        component: (props) => <sup>{props.children}</sup>,
                      },
                      {
                        title: 'Subscript',
                        value: 'sub',
                        icon: () => (
                          <>
                            T<sub>S</sub>
                          </>
                        ),
                        component: (props) => <sub>{props.children}</sub>,
                      },
                    ],
                  },
                }),
              ],
              validation: (rule) => rule.required().min(1),
            },
            {
              name: 'sectionImage',
              title: 'Section image',
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

                      if (
                        (!value || value.length < 1) &&
                        context.parent.asset
                      ) {
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

                      if (
                        (!value || value.length < 5) &&
                        context.parent.asset
                      ) {
                        return 'Please attribute the image.';
                      }

                      return true;
                    }),
                },
                {
                  name: 'placement',
                  title: 'Section image placement',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Top', value: 'top' },
                      { title: 'Bottom', value: 'bottom' },
                    ],
                    layout: 'radio',
                    direction: 'horizontal',
                  },
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
                        !['top', 'bottom'].includes(value)
                      ) {
                        return 'Please place the image.';
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
            },
          ],
        },
      ],
      validation: (rule) => rule.required().min(1).max(10),
    }),
    defineField({
      title: 'Footnotes',
      name: 'footnotes',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description:
        'Used both in the post summaries list and for the <meta> SEO description of a post.',
      validation: (rule) => rule.required().min(50).max(500),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: tagType.name }],
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.min(1).max(3).unique(),
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
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.firstName',
      date: 'publishedAt',
      media: 'coverImage',
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
