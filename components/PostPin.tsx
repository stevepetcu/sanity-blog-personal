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
                                  tags,
                                  index,
                                  total
                                }: Omit<PostPin, '_id'> & { index: number, total: number }) {
  return (
    <div className={cn('group rounded')}>
      {
        coverImage &&
        <div className={cn('relative')}>
          <BlogImage
            slug={slug}
            title={title}
            image={coverImage}
            priority={true}
            width={384}
            height={99}
          />
          <span className={cn('absolute top-1 left-1.5 font-bold text-white/75 text-sm lg:text-lg')}>
            {index}/{total}
          </span>
        </div>
      }
      <div className={cn('p-2')}>
        {!coverImage &&
          <span className={cn('font-bold text-slate-400 text-sm lg:text-lg')}>
              {index}/{total}
            </span>
        }
        <h3 className={cn('leading-snug text-sm sm:text-base mb-3 font-medium text-slate-700')}>
          <Link href={`${POSTS_PAGE_PATH}/${slug}`} className='hover:underline'>
            {title}
          </Link>
        </h3>
        <div className={cn('flex flex-wrap')}>
          {tags && tags.length && <TagList tags={tags} itemClassNames={'mr-1.5 mb-1.5'} />}
        </div>
      </div>
    </div>
  )
}
