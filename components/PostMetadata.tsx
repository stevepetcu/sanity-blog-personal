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
  >;
  showPublishedDate?: boolean;
  showUpdatedDate?: boolean;
  classNames?: string;
  authorImageSize?: number;
}

export default function PostMetadata({
  post,
  classNames,
  showPublishedDate,
  showUpdatedDate,
  authorImageSize,
}: PostMetadataProps) {
  const author = post.author;

  return (
    <div
      className={cn(`text-xs font-light sm:text-sm text-slate-600
      tracking-tighter ${classNames || ''}`)}
    >
      <div
        className={cn(
          'flex flex-wrap items-center gap-x-1 sm:gap-x-1.5 lg:gap-x-2',
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
              height={authorImageSize || 32}
              width={authorImageSize || 32}
              alt={`Author's avatar: ${author.firstName}`}
              title={`Author's avatar: ${author.firstName}`}
            />
          )}
        </div>
        <p>{author.firstName}</p>
        {showPublishedDate &&
          <>
            <span className={cn('mb-2 inline-flex shrink lg:font-black')}>
              .
            </span>
            <div className={cn('flex flex-wrap whitespace-nowrap')}>
              <p className={'mr-1 sm:mr-1.5'}>Published:</p>
              <Date dateString={post.publishedAt} />
            </div>
          </>
        }
        {showUpdatedDate &&
          <>
            <span className={cn('mb-2 inline-flex shrink lg:font-black')}>
              .
            </span>
            <div className={cn('flex flex-wrap whitespace-nowrap')}>
              <p className={'mr-1 sm:mr-1.5'}>Updated:</p>
              <Date dateString={post.updatedAt} />
            </div>
          </>
        }
        {post.tags && post.tags.length && (
          <>
            <span className={cn('mb-2 inline-flex shrink lg:font-black')}>
              .
            </span>
            <TagList tags={post.tags} />
          </>
        )}
      </div>
    </div>
  );
}
