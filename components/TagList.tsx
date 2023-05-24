import cn from 'classnames';
import Link from 'next/link';
import React from 'react';

import { POSTS_PAGE_PATH } from '../pages/posts';

interface TagListProps {
  tags: string[];
  itemClassNames?: string;
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
          href={`${POSTS_PAGE_PATH}?tag=${tag}`}
          aria-label={`List all posts tagged with "${tag}".`}
        >
          <small
            className={cn(
              'flex-initial px-1 py-0.5 sm:px-1.5 lg:px-2.5 ' +
              'rounded-full bg-slate-100 hover:bg-slate-50 ' +
              'tracking-tighter font-light lowercase text-slate-800 hover:text-sky-500 md:uppercase ' +
              'whitespace-nowrap ' +
              itemClassNames || '',
            )}
          >
            #{tag}
          </small>
        </Link>
      ))}
    </>
  );
}
