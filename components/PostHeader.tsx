import cn from 'classnames'
import BlogImage from 'components/BlogImage'
import PostTitle from 'components/PostTitle'
import type { Post } from 'lib/sanity.queries'

import PostMetadata from './PostMetadata'

export default function PostHeader(
  props: Pick<Post, 'title' | 'coverImage' | 'tags' | 'publishedAt' | 'updatedAt' | 'author' | 'slug'>
) {
  const { title, coverImage, tags, publishedAt, updatedAt, author, slug } = props

  return (
    <>
      <div className={cn('text-center my-3 sm:my-6', {'my-8 sm:my-12': !coverImage})}>
        <PostTitle>{title}</PostTitle>
      </div>
      {
        coverImage &&
        <div className='-mx-4 mb-8 sm:mx-0 rounded'>
          <BlogImage title={title} image={coverImage} width={1280} height={720} priority />
        </div>
      }
      <PostMetadata post={props}
                    publishedDate={{ show: true, position: 'below' }} updatedDate={{ show: true, position: 'below' }}
                    classNames={'mx-auto max-w-2xl'} />
    </>
  )
}
