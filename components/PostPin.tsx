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
  const { title, slug, coverImage, summary, tags, updatedAt } = postPin;

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
        {/*{!coverImage && (*/}
        {/*  <Link href={`${POSTS_PAGE_PATH}/${slug}`} className='hover:underline'>*/}
        {/*    <p*/}
        {/*      className={cn(*/}
        {/*        'line-clamp-1 text-base leading-relaxed text-slate-500',*/}
        {/*      )}*/}
        {/*    >*/}
        {/*      {summary}*/}
        {/*    </p>*/}
        {/*  </Link>*/}
        {/*)}*/}
        <div className={cn('mt-2.5 flex flex-wrap text-xs text-slate-600 ' +
          'tracking-tighter sm:tracking-tight lg:tracking-normal')}>
          <p className={'mr-1.5'}>Updated:</p>
          <Date dateString={updatedAt} />
        </div>
        {tags && tags.length && (
          <div className={cn('mt-2.5 flex flex-wrap')}>
            <TagList
              tags={tags}
              itemClassNames={'mr-1.5 mb-1.5 text-xs'}
            />
          </div>
        )}
      </div>
      {/*{!coverImage && (*/}
      {/*)}*/}
      {/*{coverImage && (*/}
      {/*  <div className={cn('relative flex-none basis-1/4')}>*/}
      {/*    <BlogImage*/}
      {/*      slug={slug}*/}
      {/*      title={title}*/}
      {/*      image={coverImage}*/}
      {/*      priority={true}*/}
      {/*      width={64}*/}
      {/*      height={64}*/}
      {/*      imageClassNames={'rounded-sm'}*/}
      {/*    />*/}
      {/*    <span*/}
      {/*      className={cn('absolute right-2 top-1 text-xl font-bold text-white/75 sm:text-sm lg:text-lg')}>*/}
      {/*      {index}/{total}*/}
      {/*    </span>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
}
