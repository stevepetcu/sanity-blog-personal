import cn from 'classnames'
import Avatar from 'components/AuthorAvatar'
import Date from 'components/PostDate'
import type { PostSummary } from 'lib/sanity.queries'
import Link from 'next/link'

import { POSTS_PAGE_PATH } from '../pages/posts'
import BlogImage from './BlogImage'
import TagList from './TagList'

export default function PostSummary({
                                      index,
                                      title,
                                      slug,
                                      summary,
                                      coverImage,
                                      tags,
                                      author,
                                      publishedAt
                                    }: Omit<PostSummary & { index: number }, '_id'>) {
  return (
    <div className={cn('lg:flex md:gap-x-8 lg:gap-x-16')}>
      {
        coverImage &&
        <div className='mb-5 md:shrink-0'>
          <BlogImage
            slug={slug}
            title={title}
            image={coverImage}
            priority={index <= 1}
            width={480}
            height={360}
          />
        </div>
      }
      <div>
        <h3 className={cn('mb-3 text-3xl leading-snug')}>
          <Link href={`${POSTS_PAGE_PATH}/${slug}`} className='hover:underline'>
            {title}
          </Link>
        </h3>
        {summary && <p className={cn('mb-4 text-lg leading-relaxed')}>{summary}</p>}
        <div className={cn('flex flex-wrap space-x-1.5 sm:space-x-2 lg:space-x-2.5')}>
          <div className={cn('flex-shrink')}>
            {author && <Avatar name={author.name} picture={author.picture} />}
          </div>
          <span className={cn('inline-flex flex-none text-xs sm:text-sm md:text-base mt-4 sm:mt-3 md:mt-2')}>.</span>
          <div className={cn('whitespace-nowrap sm:pb-0 pt-1 mt-2.5 md:mt-2')}>
            <Date dateString={publishedAt} />
          </div>
          {tags && tags.length &&
            <>
              <span className={cn('pb-1.5 inline-flex flex-none text-xs sm:text-sm md:text-base mt-4 sm:mt-3 md:mt-2')}>.</span>
              <TagList tags={tags} itemClassNames={'mt-3.5 md:mt-3'}/>
            </>
          }
        </div>
      </div>
    </div>
  )
}
