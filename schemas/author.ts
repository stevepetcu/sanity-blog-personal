import { UserIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export enum AuthorLinkedHandleWebsiteKeys {
  LINKEDIN =  'linkedin',
  GITHUB = 'github',
  HACKERRANK = 'hackerrank'
}
export const AuthorLinkedHandleWebsiteOptions = [
  {
    title: 'LinkedIn',
    value: AuthorLinkedHandleWebsiteKeys.LINKEDIN
  },
  {
    title: 'GitHub',
    value: AuthorLinkedHandleWebsiteKeys.GITHUB
  },
  {
    title: 'HackerRank',
    value: AuthorLinkedHandleWebsiteKeys.HACKERRANK
  }
]

export default defineType({
  name: 'author',
  title: 'Author',
  icon: UserIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First name',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'lastName',
      title: 'Last name',
      type: 'string'
    }),
    defineField({
      name: 'picture',
      title: 'Picture',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'handles',
      title: 'Handles',
      type: 'array',
      of: [defineArrayMember(
        {
          type: 'object',
          name: 'handle',
          fields: [
            {
              type: 'string',
              name: 'handleWebsite',
              title: 'Website',
              options: {
                list: AuthorLinkedHandleWebsiteOptions,
              },
              validation: (rule) => rule.required()
            },
            {
              type: 'string',
              name: 'handleName',
              title: 'Handle',
              validation: (rule) => rule.required()
            }
          ]
        }
      )],
      validation: (rule) => rule.unique().error('Cannot link multiple handles for the same website.'),
      initialValue: []
    }),
  ]
})
