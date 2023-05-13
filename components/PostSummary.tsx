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
    <div className={cn('flex md:gap-x-8 lg:gap-x-16')}>
      <div className='mb-5 flex-none'>
        <BlogImage
          slug={slug}
          title={title}
          image={coverImage}
          priority={index <= 1}
          width={480}
          height={360}
        />
      </div>
      <div>
        <div className='mb-4 flex-auto'>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <h3 className={cn('mb-3 text-3xl leading-snug')}>
          <Link href={`/posts/${slug}`} className='hover:underline'>
            {title}
          </Link>
        </h3>
        {summary && <p className={cn('mb-4 text-lg leading-relaxed')}>{summary}</p>}
        <div className={cn('mb-4 pr-5 items-center')}>
          <Date dateString={publishedAt} />
        </div>
        {/*  TODO: add list of tags */}
      </div>
    </div>
  )
}
