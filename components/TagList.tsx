import cn from 'classnames'
import Link from 'next/link'
import React from 'react'

import { POSTS_PAGE_PATH } from '../pages/posts'

interface TagListProps {
  tags: string[]
  classNames?: string
}

export default function TagList({ tags, classNames }: TagListProps) {
  return (
    <div className={cn(`${classNames} flex space-x-2.5`)}>
      {tags.map((tag) =>
        <Link key={tag} href={`${POSTS_PAGE_PATH}?tag=${tag}`} aria-label={`List all posts tagged with "${tag}".`}>
          <small
            className={cn('flex-none mt-1 bg-gray-200 rounded-full px-2.5 py-0.5 uppercase font-semibold text-gray-700 hover:text-sky-500 hover:bg-gray-100')}>
            #{tag}
          </small>
        </Link>)}
    </div>
  )
}
