import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { getAllTags } from '../lib/sanity.client';

export default defineType({
  name: 'tag',
  title: 'Tag',
  icon: TagIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .max(20)
          .custom((tag) =>
            getAllTags()
              .then((tags) => !tags.includes(tag) ? true : 'Each tag must be unique.')
              .catch(e => {
                console.log(e);
                return e;
              })),
    }),
  ],
});
