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
      <div className={cn('relative')}>
        <div className={cn('absolute bottom-0 w-full z-20 p-5 ' +
          'bg-gradient-to-r from-sky-500/25 to-indigo-500/25 ' +
          'text-slate-800 backdrop-blur')}>
          <PostTitle>{title}</PostTitle>
        </div>
        {
          coverImage &&
          <div className='relative mb-8 sm:mx-0 md:mb-8 z-10 rounded'>
            <BlogImage title={title} image={coverImage} width={1280} height={720} priority alwaysShowCaption={true} captionPosition={'top'} />
          </div>
        }
      </div>
      <div className={cn('flex items-center mx-auto max-w-2xl px-5')}>
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
