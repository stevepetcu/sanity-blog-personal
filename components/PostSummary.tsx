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
      className={cn('flex flex-col-reverse md:gap-x-8 lg:flex-row lg:gap-x-16')}
    >
      <div className={'grow basis-2/3'}>
        <h3 className={cn('mb-3 text-3xl leading-snug')}>
          <Link href={`${POSTS_PAGE_PATH}/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        {postSummary && (
          <p
            className={cn(
              'mb-5 line-clamp-2 text-left text-lg font-light leading-relaxed md:mb-8 md:text-justify lg:mb-12'
            )}
          >
            {summary}
          </p>
        )}
        <PostMetadata
          post={postSummary}
          publishedDate={{ show: true, position: 'inline' }}
        />
      </div>
      {coverImage && (
        <div className="mb-5 flex-none basis-1/3">
          <BlogImage
            slug={slug}
            title={title}
            image={coverImage}
            priority={index <= 1}
            width={480}
            height={270}
          />
        </div>
      )}
    </div>
  );
}
