import cn from 'classnames';
import { urlForImage } from 'lib/sanity.image';
import type { Post } from 'lib/sanity.queries';
import Image from 'next/image';

import Date from './PostDate';
import TagList from './TagList';

interface PostMetadataProps {
  post: Pick<
    Post,
    'coverImage' | 'tags' | 'publishedAt' | 'updatedAt' | 'author' | 'slug'
  >
  publishedDate?: {
    show: boolean
    position: 'inline' | 'below'
  }
  updatedDate?: {
    show: boolean
    position: 'inline' | 'below'
  }
  classNames?: string
}

export default function PostMetadata({
  post,
  publishedDate,
  updatedDate,
  classNames,
}: PostMetadataProps) {
  const author = post.author;
  const showPublishedDateInline =
    publishedDate && publishedDate.show && publishedDate.position === 'inline';
  const showPublishedDateBelow =
    publishedDate && publishedDate.show && publishedDate.position === 'below';
  const showUpdatedDateInline =
    updatedDate && updatedDate.show && updatedDate.position === 'inline';
  const showUpdatedDateBelow =
    updatedDate && updatedDate.show && updatedDate.position === 'below';

  return (
    <div
      className={cn(`text-xs font-light sm:text-sm lg:text-base ${classNames}`)}
    >
      <div
        className={cn(
          'flex flex-wrap items-center space-x-1 sm:space-x-1.5 lg:space-x-2'
        )}
      >
        <div className={cn('mb-2 sm:mb-0')}>
          {author.picture?.asset?._ref && (
            <Image
              src={urlForImage(author.picture)
                .height(100)
                .width(100)
                .fit('crop')
                .url()}
              className={cn('rounded-full')}
              height={35}
              width={35}
              alt={`Author's avatar: ${author.firstName}`}
              title={`Author's avatar: ${author.firstName}`}
            />
          )}
        </div>
        <p>{author.firstName}</p>
        {showPublishedDateInline && (
          <>
            <span className={cn('mb-2 inline-flex shrink lg:font-black')}>
              .
            </span>
            <div className={cn('flex flex-wrap whitespace-nowrap')}>
              <p className={'mr-1 sm:mr-1.5'}>Published:</p>
              <Date dateString={post.publishedAt} />
            </div>
          </>
        )}
        {showUpdatedDateInline && (
          <>
            <span className={cn('mb-2 inline-flex shrink lg:font-black')}>
              .
            </span>
            <div className={cn('flex flex-wrap whitespace-nowrap')}>
              <p className={'mr-1 sm:mr-1.5'}>Updated:</p>
              <Date dateString={post.updatedAt} />
            </div>
          </>
        )}
        {post.tags && post.tags.length && (
          <>
            <span className={cn('mb-2 inline-flex shrink lg:font-black')}>
              .
            </span>
            <TagList tags={post.tags} />
          </>
        )}
      </div>
      <div
        className={cn(
          'flex flex-wrap items-center space-x-1.5 text-xs font-light sm:space-x-2 ' +
            'sm:text-sm lg:space-x-2.5 lg:text-base'
        )}
      >
        {showPublishedDateBelow && (
          <>
            <div className={cn('flex flex-wrap whitespace-nowrap')}>
              <p className={'mr-1 sm:mr-1.5 lg:font-normal'}>Published:</p>
              <Date dateString={post.publishedAt} />
            </div>
          </>
        )}
        {showUpdatedDateBelow && (
          <>
            <span className={cn('mb-2 inline-flex shrink lg:font-black')}>
              .
            </span>
            <div className={cn('flex flex-wrap whitespace-nowrap')}>
              <p className={'mr-1 sm:mr-1.5 lg:font-normal'}>Updated:</p>
              <Date dateString={post.updatedAt} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
