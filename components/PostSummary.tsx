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
    <div className={cn('flex flex-col-reverse lg:flex-row md:gap-x-8 lg:gap-x-16')}>
      <div className={'grow basis-2/3'}>
        <h3 className={cn('mb-3 text-3xl leading-snug')}>
          <Link href={`${POSTS_PAGE_PATH}/${slug}`} className='hover:underline'>
            {title}
          </Link>
        </h3>
        {summary && <p className={cn(`mb-5 md:mb-8 lg:mb-12 text-lg leading-relaxed text-left md:text-justify line-clamp-2`)}>{summary}</p>}
        <div className={cn('flex flex-wrap space-x-1.5 sm:space-x-2 lg:space-x-2.5')}>
          <div className={cn('flex-shrink')}>
            {author && <Avatar firstName={author.firstName} picture={author.picture} />}
          </div>
          <span className={cn('inline-flex flex-none text-xs sm:text-sm md:text-base mt-2.5 sm:mt-1 md:mt-0')}>.</span>
          <div className={cn('whitespace-nowrap mt-2 sm:mt-1.5 md:mt-1')}>
            <Date dateString={publishedAt} />
          </div>
          {tags && tags.length &&
            <>
              <span className={cn('inline-flex flex-none text-xs sm:text-sm md:text-base mt-2.5 sm:mt-1 md:mt-0')}>.</span>
              <TagList tags={tags} itemClassNames={'mt-3.5 sm:mt-2 md:mt-1 text-xs sm:text-sm md:text-base'}/>
            </>
          }
        </div>
      </div>
      {
        coverImage &&
        <div className='mb-5 flex-none basis-1/3'>
          <BlogImage
            slug={slug}
            title={title}
            image={coverImage}
            priority={index <= 1}
            width={480}
            height={270}
          />
        </div>
      }
    </div>
  )
}
