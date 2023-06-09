import cn from 'classnames';
import BlogImage from 'components/BlogImage';
import PostTitle from 'components/PostTitle';
import type { Post } from 'lib/sanity.queries';

import EmbeddedWebsite from './EmbeddedWebsite';
import PostMetadata from './PostMetadata';
import SkipToMainContent from './SkipToMainContent';
import SkipToTitle from './SkipToTitle';

interface PostHeaderProps {
  post: Pick<
    Post,
    | 'title'
    | 'coverImage'
    | 'embeddedWebsiteUrl'
    | 'tags'
    | 'publishedAt'
    | 'updatedAt'
    | 'author'
    | 'slug'
  >
}

export const COVER_IMAGE_ASPECT_RATIO = 16/9;

export default function PostHeader({ post }: PostHeaderProps) {
  const { title, coverImage, embeddedWebsiteUrl } = post;

  return (
    <>
      <div
        className={cn('mt-3 mb-5 sm:my-4 text-center', {
          'my-8 sm:my-12': !coverImage && !embeddedWebsiteUrl,
        })}
      >
        <PostTitle>{title}</PostTitle>
      </div>
      {
        (coverImage || embeddedWebsiteUrl) && (
          <div className={'-mt-2 mb-5'}>
            <SkipToMainContent/>
          </div>
        )}
      {(!embeddedWebsiteUrl && coverImage) && (
        <div className="-mx-4 mb-5 rounded sm:mx-0 overflow-hidden">
          <BlogImage
            title={title}
            image={coverImage}
            width={Math.floor(720 * COVER_IMAGE_ASPECT_RATIO)}
            height={720}
            priority
          />
        </div>
      )}
      {
        embeddedWebsiteUrl && (
          <div className="-mx-4 mb-5 rounded sm:mx-0 overflow-hidden">
            <EmbeddedWebsite
              src={embeddedWebsiteUrl}
              aspectRatio={COVER_IMAGE_ASPECT_RATIO}
            />
          </div>
        )}
      <div className={cn({
        'my-10': !embeddedWebsiteUrl,
      })}>
        <PostMetadata
          post={post}
          showPublishedDate={true}
          showUpdatedDate={true}
          classNames={'mx-auto max-w-2xl'}
        />
      </div>
      {
        embeddedWebsiteUrl && (
        // TODO: make this thing sticky at the bottom of the window?
          <div className={'mt-8 mb-3'}>
            <SkipToTitle />
          </div>
        )}
    </>
  );
}
