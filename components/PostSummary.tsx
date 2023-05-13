import Avatar from 'components/AuthorAvatar'
import Date from 'components/PostDate'
import type { PostSummary } from 'lib/sanity.queries'
import Link from 'next/link'

import PostSummaryThumbnail from './PostSummaryThumbnail'

export default function PostSummary({
  title,
  slug,
  summary,
  coverImage,
  tags,
  author,
  publishedAt
}: Omit<PostSummary, '_id'>) {
  const className= coverImage ?
    'grid grid-cols-2 md:gap-x-8 lg:gap-x-16' :
    'grid grid-cols-1 md:gap-x-8 lg:gap-x-16'
  return (
    <div className={className}>
      {coverImage &&
        <div className='mb-5'>
        <PostSummaryThumbnail
          slug={slug}
          title={title}
          image={coverImage}
          priority={false}
          width={240}
          height={160}
        />
      </div>}
      <div>
        <h3 className="mb-3 text-3xl leading-snug">
          <Link href={`/posts/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        {summary && <p className="mb-4 text-lg leading-relaxed">{summary}</p>}
        <div className="mb-4 text-lg">
          <Date dateString={publishedAt} />
        </div>
        {author && <Avatar name={author.name} picture={author.picture} />}
        {/*  TODO: add list of tags */}
      </div>
    </div>
  )
}
