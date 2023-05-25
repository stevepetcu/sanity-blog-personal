import cn from 'classnames';
import type { PostPin } from 'lib/sanity.queries';
import Link from 'next/link';

import { POSTS_PAGE_PATH } from '../pages/posts';
import PostMetadata from './PostMetadata';

interface PostPinProps {
  postPin: Omit<PostPin, '_id'>;
  index: number;
  total: number;
}

export default function PostPin({ postPin, index, total }: PostPinProps) {
  const { title, slug } = postPin;

  return (
    <div className={cn('flex gap-x-4 sm:gap-x-5')}>
      <div className={cn('shrink -mt-1.5')}>
        <span
          className={cn('text-3xl font-medium text-slate-200 ')}>
          {index}/{total}
        </span>
      </div>
      <div className={cn('grow')}>
        <h3 className={cn('text-base font-bold leading-snug tracking-tight ' +
          'text-slate-800 line-clamp-2')}>
          <Link href={`${POSTS_PAGE_PATH}/${slug}`} className='hover:underline'>
            {title}
          </Link>
        </h3>
        <PostMetadata post={postPin} numberOfTagsToShow={1} showUpdatedDate={true} classNames={'mt-2.5'}/>
      </div>
    </div>
  );
}
