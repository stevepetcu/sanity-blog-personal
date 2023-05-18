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
    <div className={cn('flex gap-x-3')}>
      {
        coverImage &&
        < div className='mb-5 flex-none'>
          <BlogImage
            slug={slug}
            title={title}
            image={coverImage}
            priority={true}
            width={128}
            height={128}
            alwaysShowCaption={false}
          />
        </div>
      }
      <div className={cn('flex-auto')}>
        <h2 className={cn('text-md leading-snug')}>
          <Link href={`${POSTS_PAGE_PATH}/${slug}`} className='hover:underline'>
            {title}
          </Link>
        </h2>
        {tags && tags.length &&
          <TagList tags={tags} />
        }
      </div>
      {/* TODO: add tags */}
    </div>
  )
}
