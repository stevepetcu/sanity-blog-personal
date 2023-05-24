import cn from 'classnames';
import type { PostSummary } from 'lib/sanity.queries';
import Link from 'next/link';

import { POSTS_PAGE_PATH } from '../pages/posts';
import BlogImage from './BlogImage';
import PostMetadata from './PostMetadata';

interface PostSummaryProps {
  postSummary: Omit<PostSummary, '_id'>
  index: number
}

export default function PostSummary({ postSummary, index }: PostSummaryProps) {
  const { title, slug, summary, coverImage } = postSummary;

  return (
    <div
      className={cn('flex md:gap-x-8 pt-7')}
    >
      <div className={'grow'}>
        <h2 className={cn('mb-3 text-slate-800 text-base sm:text-xl font-bold leading-snug line-clamp-2')}>
          <Link href={`${POSTS_PAGE_PATH}/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h2>
        {postSummary && (
          <p
            className={cn(
              'hidden mb-3.5 sm:line-clamp-1 md:line-clamp-2 text-left ' +
              'text-sm sm:text-base font-light leading-relaxed ' +
              'md:text-justify text-slate-600'
            )}
          >
            {summary}
          </p>
        )}
        <PostMetadata
          post={postSummary}
          showPublishedDate={true}
          classNames={'text-sm sm:text-sm md:text-sm lg:text-sm'}
          authorImageSize={16}
        />
      </div>
      {coverImage && (
        <div className="mb-5 flex-none w-24 sm:w-36">
          <BlogImage
            slug={slug}
            title={title}
            image={coverImage}
            priority={index <= 1}
            width={160}
            height={160}
          />
        </div>
      )}
    </div>
  );
}
