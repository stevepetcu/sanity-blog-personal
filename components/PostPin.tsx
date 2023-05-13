import type { Post, PostPin } from 'lib/sanity.queries'
import Link from 'next/link'

import PostPinThumbnail from './PostPinThumbnail'

export default function PostPin({
  title,
  slug,
  coverImage,
  tags
}: Omit<PostPin, '_id'>) {
  const className= coverImage ?
    'grid grid-cols-2 md:gap-x-8 lg:gap-x-16' :
    'grid grid-cols-1 md:gap-x-8 lg:gap-x-16'
  return (
    <div className='grid grid-cols-2 md:gap-x-8 lg:gap-x-16'>
      {coverImage &&
        <div className='mb-5'>
        <PostPinThumbnail
          slug={slug}
          title={title}
          image={coverImage}
          priority={false}
          width={64}
          height={64}
        />
      </div>}
      <h5 className="mb-3 text-3xl leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h5>
    {/* TODO: add tags */}
    </div>
  )
}
