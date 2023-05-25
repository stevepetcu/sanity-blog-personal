import cn from 'classnames';
import type { PostPin } from 'lib/sanity.queries';
import Link from 'next/link';

import { POSTS_PAGE_PATH } from '../pages/posts';
import Date from './PostDate';
import TagList from './TagList';

interface PostPinProps {
  postPin: Omit<PostPin, '_id'>;
  index: number;
  total: number;
}

export default function PostPin({ postPin, index, total }: PostPinProps) {
  const { title, slug, tags, updatedAt } = postPin;

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
        <div className={cn('mt-2.5 flex flex-wrap text-xs text-slate-600 ' +
          'tracking-tighter sm:tracking-tight lg:tracking-normal')}>
          <p className={'mr-1.5'}>Updated:</p>
          <Date dateString={updatedAt} />
        </div>
        {tags && tags.length && (
          <div className={cn('mt-2.5 flex flex-wrap gap-x-2 text-sm ' +
            'sm:text-sm md:text-sm lg:text-sm')}>
            <TagList tags={tags} />
          </div>
        )}
      </div>
    </div>
  );
}
