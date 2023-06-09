import cn from 'classnames';
import Link from 'next/link';
import React from 'react';

import { Post } from '../lib/sanity.queries';
import { PAGE_POSTS_PATH } from '../pages/posts';

interface TagListProps {
  tags: Post['tags']
  itemClassNames?: string
}

/**
 * Should be used inside a container that has the flex and flex-wrap classes.
 * @param tags
 * @param itemClassNames
 * @constructor
 */
export default function TagList({ tags, itemClassNames }: TagListProps) {
  return (
    <>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`${PAGE_POSTS_PATH}?tag=${tag}`}
          aria-label={`List all posts tagged with "${tag}".`}
        >
          <small
            className={cn(
              'flex-initial px-2.5 py-1.5 ' +
                'rounded-full bg-slate-100 hover:bg-slate-50 ' +
                'font-light lowercase tracking-tighter text-slate-800 hover:text-sky-500 md:uppercase ' +
                'whitespace-nowrap ' +
                itemClassNames || ''
            )}
          >
            {tag}
          </small>
        </Link>
      ))}
    </>
  );
}
