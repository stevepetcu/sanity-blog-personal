import cn from 'classnames'
import Avatar from 'components/AuthorAvatar'
import Date from 'components/PostDate'
import type { PostSummary } from 'lib/sanity.queries'
import Link from 'next/link'

import { POSTS_PAGE_PATH } from '../pages/posts'
import BlogImage from './BlogImage'
import PostMetadata from './PostMetadata'
import TagList from './TagList'

interface PostSummaryProps {
  summary: Omit<PostSummary, '_id'>
  index: number
}

export default function PostSummary({ summary, index }: PostSummaryProps) {
  const {
    title,
    slug,
    summary: summaryBody,
    coverImage,
    tags,
    author,
    publishedAt
  } = summary

  return (
    <div className={cn('flex flex-col-reverse lg:flex-row md:gap-x-8 lg:gap-x-16')}>
      <div className={'grow basis-2/3'}>
        <h3 className={cn('mb-3 text-3xl leading-snug')}>
          <Link href={`${POSTS_PAGE_PATH}/${slug}`} className='hover:underline'>
            {title}
          </Link>
        </h3>
        {summary && <p
          className={cn(`mb-5 md:mb-8 lg:mb-12 text-lg leading-relaxed text-left md:text-justify font-light line-clamp-2`)}>{summaryBody}</p>}
        <PostMetadata post={summary} publishedDate={{ show: true, position: 'inline' }} />
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
