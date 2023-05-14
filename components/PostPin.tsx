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
          <Link href={`/posts/${slug}`} className='hover:underline'>
            {title}
          </Link>
        </h2>
        {tags && tags.length &&
          <div className={cn('flex mt-10 items-center')}>
            <small className={cn('flex-none mr-2.5')}><p>Tags:</p></small>
            {tags.map((tag) =>
              <small className={cn('flex-none mr-2.5 text-sky-500 font-semibold uppercase')} key={tag}><a href={`/posts/tags/${tag}`}>#{tag}</a>
              </small>)}
          </div>
        }
      </div>
      {/* TODO: add tags */}
    </div>
  )
}
