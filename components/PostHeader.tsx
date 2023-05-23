import cn from 'classnames';
import BlogImage from 'components/BlogImage';
import PostTitle from 'components/PostTitle';
import type { Post } from 'lib/sanity.queries';

import PostMetadata from './PostMetadata';

interface PostHeaderProps {
  post: Pick<
    Post,
    | 'title'
    | 'coverImage'
    | 'tags'
    | 'publishedAt'
    | 'updatedAt'
    | 'author'
    | 'slug'
  >
}

export default function PostHeader({ post }: PostHeaderProps) {
  const { title, coverImage } = post;

  return (
    <>
      <div
        className={cn('my-3 text-center sm:my-6', {
          'my-8 sm:my-12': !coverImage,
        })}
      >
        <PostTitle>{title}</PostTitle>
      </div>
      {coverImage && (
        <div className="-mx-4 mb-8 rounded sm:mx-0">
          <BlogImage
            title={title}
            image={coverImage}
            width={1280}
            height={720}
            priority
          />
        </div>
      )}
      <PostMetadata
        post={post}
        publishedDate={{ show: true, position: 'below' }}
        updatedDate={{ show: true, position: 'below' }}
        classNames={'mx-auto max-w-2xl'}
      />
    </>
  );
}
