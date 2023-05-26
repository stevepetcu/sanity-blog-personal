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
  showPublishedDate?: boolean
  showUpdatedDate?: boolean
  classNames?: string
  authorImageSize?: number
  numberOfTagsToShow?: number
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
      className={cn(`text-xs font-light tracking-tighter text-slate-600 sm:text-sm md:text-xs
      xl:text-sm ${classNames || ''} @container/metadata`)}
    >
      <div
        className={cn(
          'flex flex-wrap items-center gap-y-2.5 ' +
            '@[50px]/metadata:gap-x-1 @[350px]/metadata:gap-x-1.5'
        )}
      >
        {author && (
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
            <span
              className={cn(
                'mb-2 inline-flex shrink ' +
                  '@[50px]/metadata:font-light @[350px]/metadata:font-bold'
              )}
            >
              .
            </span>
          </>
        )}
        {showPublishedDate && post.publishedAt && (
          <>
            <div className={cn('flex whitespace-nowrap')}>
              <p
                className={
                  'mr-1 grow basis-1/5 sm:mr-1.5 ' +
                  '@[50px]/metadata:hidden @[350px]/metadata:inline-flex'
                }
              >
                Published:
              </p>
              <p
                className={
                  'mr-0.5 grow basis-1/5 ' +
                  '@[50px]/metadata:inline-flex @[350px]/metadata:hidden'
                }
              >
                P:
              </p>
              <Date dateString={post.publishedAt} />
            </div>
            <span
              className={cn(
                'mb-2 inline-flex shrink ' +
                  '@[50px]/metadata:font-light @[350px]/metadata:font-bold'
              )}
            >
              .
            </span>
          </>
        )}
        {showUpdatedDate && (
          <>
            <div className={cn('flex whitespace-nowrap')}>
              <p
                className={
                  'mr-1 grow basis-1/5 sm:mr-1.5 ' +
                  '@[50px]/metadata:hidden @[350px]/metadata:inline-flex'
                }
              >
                Updated:
              </p>
              <p
                className={
                  'mr-0.5 grow basis-1/5 ' +
                  '@[50px]/metadata:inline-flex @[350px]/metadata:hidden'
                }
              >
                U:
              </p>
              <Date dateString={post.updatedAt} />
            </div>
            <span
              className={cn(
                'mb-2 inline-flex shrink ' +
                  '@[50px]/metadata:font-light @[350px]/metadata:font-bold'
              )}
            >
              .
            </span>
          </>
        )}
        {post.tags && post.tags.length > 0 && nrOfTagsToShow > 0 && (
          <>
            <TagList tags={post.tags.slice(0, nrOfTagsToShow)} />
          </>
        )}
      </div>
    </div>
  );
}
