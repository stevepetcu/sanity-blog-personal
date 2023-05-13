import cn from 'classnames'
import Avatar from 'components/AuthorAvatar'
import BlogImage from 'components/BlogImage'
import Date from 'components/PostDate'
import PostTitle from 'components/PostTitle'
import type { Post } from 'lib/sanity.queries'

export default function PostHeader(
  props: Pick<Post, 'title' | 'coverImage' | 'publishedAt' | 'author' | 'slug'>
) {
  const { title, coverImage, publishedAt, author, slug } = props
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className='mb-8 sm:mx-0 md:mb-8'>
        <BlogImage title={title} image={coverImage} width={1280} height={720} priority />
      </div>
      <div className={cn('flex items-center mx-auto max-w-2xl')}>
        <div className={cn('flex-none mr-2.5')}>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <span className={cn('flex-none mr-2.5 pb-2.5 text-2xl')}>.</span>
        <div className={cn('text-lg flex-none')}>
          <Date dateString={publishedAt} />
        </div>
      </div>
    </>
  )
}
