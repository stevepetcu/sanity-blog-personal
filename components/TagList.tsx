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
        <small className={cn('flex-none text-sky-500 font-semibold uppercase mt-0.5')} key={tag}>
          <Link href={`${POSTS_PAGE_PATH}?tag=${tag}`} aria-label={`List all posts tagged with "${tag}".`}>#{tag}</Link>
        </small>)}
    </div>
  )
}
