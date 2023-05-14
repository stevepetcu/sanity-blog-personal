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
        <div className={cn('flex items-center')}>
          <div className='flex-none'>
            {author && <Avatar name={author.name} picture={author.picture} />}
          </div>
          <span className={cn('pr-2 pl-2 pb-1.5')}>.</span>
          <div>
            <Date dateString={publishedAt} />
          </div>
          {tags && tags.length &&
            <div className={cn('flex')}>
              <span className={cn('pr-2 pl-2 pb-1.5')}>.</span>
              {tags.map((tag) =>
                <small className={cn('pt-1.5 flex-none mr-2.5 text-sky-500 font-semibold uppercase')} key={tag}><a href='#'>#{tag}</a>
                </small>)}
            </div>
          }
        </div>
        {/*  TODO: add list of tags */}
      </div>
    </div>
  )
}
