import cn from 'classnames';
import Link from 'next/link';
import React from 'react';

import { POSTS_PAGE_PATH } from '../pages/posts';

interface TagListProps {
  tags: string[]
  itemClassNames?: string
}

export default function TagList({ tags, itemClassNames }: TagListProps) {
  return (
    <>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`${POSTS_PAGE_PATH}?tag=${tag}`}
          aria-label={`List all posts tagged with "${tag}".`}
          className={cn(itemClassNames)}
        >
          <small
            className={cn(
              'mt-1 flex-initial rounded-xl bg-slate-200 px-2.5 py-0.5 ' +
                'font-light lowercase text-slate-800 md:uppercase ' +
                'whitespace-nowrap hover:bg-slate-100 hover:text-sky-500'
            )}
          >
            #{tag}
          </small>
        </Link>
      ))}
    </>
  );
}
