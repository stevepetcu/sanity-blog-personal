import cn from 'classnames'
import Avatar from 'components/AuthorAvatar'
import Date from 'components/PostDate'
import type { PostSummary } from 'lib/sanity.queries'
import Link from 'next/link'

import BlogImage from './BlogImage'

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
            alwaysShowCaption={true}
          />
        </div>
      }
      <div>
        <h3 className={cn('mb-3 text-3xl leading-snug')}>
          <Link href={`/posts/${slug}`} className='hover:underline'>
            {title}
          </Link>
        </h3>
        {summary && <p className={cn('mb-4 text-lg leading-relaxed')}>{summary}</p>}
        <div className={cn('items-center space-x-2.5 flex')}>
          <div className='sm:flex-none'>
            {author && <Avatar name={author.name} picture={author.picture} />}
          </div>
          <span className={cn('pb-1.5 hidden md:inline-flex flex-none')}>.</span>
          <div>
            <Date dateString={publishedAt} />
          </div>
          {/* TODO: 1. extract a tags component */}
          {tags && tags.length &&
            <div className={cn('flex')}>
              <span className={cn('pb-1.5 hidden md:inline-flex flex-none')}>.</span>
              {tags.map((tag) =>
                <small className={cn('ml-1.5 pt-1.5 flex-none text-sky-500 font-semibold uppercase sm:pb-1 md:pb-0')} key={tag}>
                  <a href={`/posts/tags/${tag}`}>#{tag}</a>
                </small>)}
            </div>
          }
        </div>
        {/*  TODO: add list of tags */}
      </div>
    </div>
  )
}
