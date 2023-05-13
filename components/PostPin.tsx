import cn from 'classnames'
import type { Post, PostPin } from 'lib/sanity.queries'
import Link from 'next/link'

import BlogImage from './BlogImage'

export default function PostPin({
                                  title,
                                  slug,
                                  coverImage,
                                  tags
                                }: Omit<PostPin, '_id'>) {
  return (
    <div className={cn('flex md:gap-x-4 lg:gap-x-8')}>
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
          <Link href={`/posts/${slug}`} className='hover:underline'>
            {title}
          </Link>
        </h2>
        {tags && tags.length &&
          <div className={cn('flex mt-10')}>
            <div className={cn('flex-none mr-2.5')}><p>Tags:</p></div>
            {tags.map((tag) =>
              <div className={cn('flex-none mr-2.5 text-emerald-700 font-semibold')} key={tag}><a href='#'>#{tag}</a>
              </div>)}
          </div>
        }
      </div>
      {/* TODO: add tags */}
    </div>
  )
}
