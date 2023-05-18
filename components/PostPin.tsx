import cn from 'classnames'
import type { PostPin } from 'lib/sanity.queries'
import Link from 'next/link'

import { POSTS_PAGE_PATH } from '../pages/posts'
import BlogImage from './BlogImage'
import TagList from './TagList'

export default function PostPin({
                                  title,
                                  slug,
                                  coverImage,
                                  tags
                                }: Omit<PostPin, '_id'>) {
  return (
    <div className={cn('group flex gap-x-3 shadow-sm rounded overflow-hidden')}>
      {
        coverImage &&
        <div className='flex-none'>
          <BlogImage
            slug={slug}
            title={title}
            image={coverImage}
            priority={true}
            width={148}
            height={148}
            alwaysShowCaption={false}
          />
        </div>
      }
      <div className={cn('p-2')}>
        <h3 className={cn('text-md leading-snug text-xl mb-3')}>
          <Link href={`${POSTS_PAGE_PATH}/${slug}`} className='hover:underline'>
            {title}
          </Link>
        </h3>
        <div className={cn('flex space-x-2.5')}>
          {tags && tags.length && <TagList tags={tags} />}
        </div>
      </div>
    </div>
  )
}
