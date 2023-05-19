import cn from 'classnames'
import Link from 'next/link'
import React from 'react'

import { POSTS_PAGE_PATH } from '../pages/posts'

interface TagListProps {
  tags: string[]
  itemClassNames?: string
}

export default function TagList({ tags, itemClassNames }: TagListProps) {
  return (
    <>
      {tags.map((tag) =>
        <Link key={tag} href={`${POSTS_PAGE_PATH}?tag=${tag}`}
              aria-label={`List all posts tagged with "${tag}".`} className={cn(itemClassNames)}>
          <small
            className={cn('flex-initial mt-1 bg-slate-200 rounded-xl px-2.5 py-0.5 ' +
              'font-light text-slate-700 lowercase md:uppercase ' +
              'hover:text-sky-500 hover:bg-slate-100 whitespace-nowrap')}>
            #{tag}
          </small>
        </Link>)}
    </>
  )
}
