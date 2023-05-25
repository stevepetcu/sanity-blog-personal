import cn from 'classnames';
import { urlForImage } from 'lib/sanity.image';
import type { Post } from 'lib/sanity.queries';
import Image from 'next/image';

import Date from './PostDate';
import TagList from './TagList';

interface PostMetadataProps {
  post: {
    tags: Post['tags']
    publishedAt?: Post['publishedAt']
    updatedAt?: Post['updatedAt']
    author?: Post['author']
  }
  showPublishedDate?: boolean;
  showUpdatedDate?: boolean;
  classNames?: string;
  authorImageSize?: number;
  numberOfTagsToShow?: number;
}

export default function PostMetadata({
  post,
  classNames,
  showPublishedDate,
  showUpdatedDate,
  authorImageSize,
  numberOfTagsToShow,
}: PostMetadataProps) {
  const author = post.author || null;
  const nrOfPostTags = post.tags ? post.tags.length : 0;
  const nrOfTagsToShow = numberOfTagsToShow ?? nrOfPostTags;

  return (
    <div
      className={cn(`text-sm font-light text-slate-600
      tracking-tighter ${classNames || ''}`)}
    >
      <div
        className={cn(
          'flex flex-wrap items-center gap-x-1 sm:gap-x-1.5 lg:gap-x-2 gap-y-2.5',
        )}
      >
        {author &&
          <>
            <div>
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
            <span className={cn('mb-2 inline-flex shrink lg:font-black')}>.</span>
          </>
        }
        {showPublishedDate && post.publishedAt &&
          <>
            <div className={cn('flex flex-wrap whitespace-nowrap')}>
              <p className={'hidden sm:inline-flex mr-1 sm:mr-1.5'}>Published:</p>
              <Date dateString={post.publishedAt} />
            </div>
            <span className={cn('mb-2 inline-flex shrink lg:font-black')}>.</span>
          </>
        }
        {showUpdatedDate &&
          <>
            <div className={cn('flex flex-wrap whitespace-nowrap')}>
              <p className={'mr-1 sm:mr-1.5'}>Updated:</p>
              <Date dateString={post.updatedAt} />
            </div>
            <span className={cn('mb-2 inline-flex shrink lg:font-black')}>.</span>
          </>
        }
        {post.tags && post.tags.length > 0 && nrOfTagsToShow > 0 && (
          <>
            <TagList tags={post.tags.slice(0, nrOfTagsToShow)} />
          </>
        )}
      </div>
    </div>
  );
}
