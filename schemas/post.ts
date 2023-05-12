import { BookIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'

import authorType from './author'

/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you
 * create or edit a post in the studio.
 *
 * Here you can see the different schema types that are available:

 https://www.sanity.io/docs/schema-types

 */

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
      validation: (rule) => rule.required().min(10).max(100)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 110,
        isUnique: (value, context) => context.defaultIsUnique(value, context)
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Used both in the post summaries list, as well as for the SEO description of a post.',
      validation: (rule) => rule.required().min(50).max(500)
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption'
        },
        {
          name: 'attribution',
          type: 'string',
          title: 'Attribution',
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alt',
        }
      ]
    }),
    defineField({
      name: 'coverImageThumbnail',
      title: 'Cover image thumbnail',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption'
        },
        {
          name: 'attribution',
          type: 'string',
          title: 'Attribution',
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alt',
        }
      ]
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'index',
            title: 'Index',
            type: 'number',
            validation: (rule) => rule.required().integer().positive()
          },
          {
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: (rule) => rule.required().min(3).max(100)
          },
          {
            name: 'anchor',
            title: 'Anchor',
            type: 'slug',
            options: {
              source: (document, opts) => {
                return 'heading' in opts.parent ?
                  (opts.parent.heading as string).toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 110) : ''
              },
              maxLength: 110
            },
            validation: (rule) => rule.required()
          },
          {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [{ type: 'block' }],
            validation: (rule) => rule.required().min(1)
          },
          {
            name: 'sectionImage',
            title: 'Section image',
            type: 'image',
            options: {
              hotspot: true
            },
            fields: [
              {
                name: 'caption',
                type: 'string',
                title: 'Caption'
              },
              {
                name: 'attribution',
                type: 'string',
                title: 'Attribution'
              },
              {
                name: 'alt',
                type: 'string',
                title: 'Alt'
              },
              {
                name: 'placement',
                title: 'Section image placement',
                type: 'string',
                options: {
                  list: [
                    { title: 'Top', value: 'top' },
                    { title: 'Right', value: 'right' },
                    { title: 'Bottom', value: 'bottom' },
                    { title: 'Left', value: 'left' }
                  ],
                  layout: 'radio',
                  direction: 'horizontal'
                }
              }
            ],
            initialValue: {
              placement: 'top'
            }
          }
        ]
      }],
      validation: (rule) => rule.required().min(1).max(10)
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: authorType.name }],
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'publishedAt',
      media: 'coverImage'
    },
    prepare({ title, media, author, date }) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    }
  }
})
