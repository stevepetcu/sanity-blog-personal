import cn from 'classnames';
import type { PostPin } from 'lib/sanity.queries';
import Link from 'next/link';

import { PAGE_POSTS_PATH } from '../pages/posts';
import PostMetadata from './PostMetadata';

interface PostPinProps {
  postPin: Omit<PostPin, '_id'>
  index: number
  total: number
}

export default function PostPin({ postPin, index, total }: PostPinProps) {
  const { title, slug } = postPin;

  return (
    <div
      className={cn('flex gap-x-3 @container/postPin md:gap-x-4 xl:gap-x-5')}
    >
      <div className={cn('-mt-1.5 shrink')}>
        <span
          className={cn(
            'text-2xl font-medium text-slate-200 sm:text-3xl md:text-2xl xl:text-3xl '
          )}
        >
          {index}/{total}
        </span>
      </div>
      <div className={cn('flex grow flex-col')}>
        <h3
          className={cn(
            'text-base font-bold leading-snug tracking-tight ' +
              'line-clamp-2 text-slate-800'
          )}
        >
          <Link href={`${PAGE_POSTS_PATH}/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <PostMetadata
          post={postPin}
          numberOfTagsToShow={1}
          showPublishedDate={true}
          showUpdatedDate={true}
          classNames={'pt-2.5 mt-auto'}
        />
      </div>
    </div>
  );
}
