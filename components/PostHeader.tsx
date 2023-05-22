import cn from 'classnames'
import Avatar from 'components/AuthorAvatar'
import BlogImage from 'components/BlogImage'
import Date from 'components/PostDate'
import PostTitle from 'components/PostTitle'
import type { Post } from 'lib/sanity.queries'

import PostMetadata from './PostMetadata'
import TagList from './TagList'

export default function PostHeader(
  props: Pick<Post, 'title' | 'coverImage' | 'tags' | 'publishedAt' | 'updatedAt' | 'author' | 'slug'>
) {
  const { title, coverImage, tags, publishedAt, updatedAt, author, slug } = props
  const postTitleClasses = coverImage ? 'absolute' : 'static'

  return (
    <>
      <div className={cn('relative -mx-5 mb-8 ')}>
        <div className={cn(`${postTitleClasses} bottom-0 w-full z-20 p-5 ` +
          'bg-gradient-to-r from-indigo-500/30 from-10% via-sky-500/50 via-40% to-emerald-500/10 to-90% ' +
          'text-slate-700 backdrop-blur-sm mix-blend-luminosity')}>
          <PostTitle>{title}</PostTitle>
        </div>
        {
          coverImage &&
          <div className='relative sm:mx-0 z-10 rounded'>
            <BlogImage title={title} image={coverImage} width={1280} height={720} priority captionPosition={'top'} />
          </div>
        }
      </div>
      <PostMetadata post={props}
                    publishedDate={{ show: true, position: 'below' }} updatedDate={{ show: true, position: 'below' }}
                    classNames={'mx-auto max-w-2xl'} />
    </>
  )
}
