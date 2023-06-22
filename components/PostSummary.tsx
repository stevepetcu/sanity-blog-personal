import cn from 'classnames';
import type { PostSummary } from 'lib/sanity.queries';
import Link from 'next/link';

import { PAGE_POSTS_PATH } from '../pages/posts';
import BlogImage from './BlogImage';
import PostMetadata from './PostMetadata';

interface PostSummaryProps {
  postSummary: Omit<PostSummary, '_id'>
  index: number
}

export default function PostSummary({ postSummary, index }: PostSummaryProps) {
  const { title, slug, summary, coverImage } = postSummary;

  return (
    <div className={cn('flex gap-x-4 pt-7 md:gap-x-8')}>
      <div className={'grow'}>
        <h2
          className={cn(
            'mb-3 line-clamp-1 text-base font-bold leading-snug text-slate-800 sm:text-xl',
            { 'line-clamp-2': !coverImage }
          )}
        >
          <Link href={`${PAGE_POSTS_PATH}/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h2>
        {postSummary && (
          <p
            className={cn(
              'line-clamp-1 text-sm font-light leading-relaxed sm:line-clamp-2 sm:text-base ' +
                'mb-2.5 text-slate-600 sm:mb-3.5',
              { 'line-clamp-2': !coverImage }
            )}
          >
            {summary}
          </p>
        )}
        <PostMetadata
          post={postSummary}
          showPublishedDate={true}
          authorImageSize={16}
          numberOfTagsToShow={1}
        />
      </div>
      {coverImage && (
        <div className="mb-5 w-24 flex-none sm:w-36">
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
