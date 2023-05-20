import cn from 'classnames'
import Avatar from 'components/AuthorAvatar'
import BlogImage from 'components/BlogImage'
import Date from 'components/PostDate'
import PostTitle from 'components/PostTitle'
import type { Post } from 'lib/sanity.queries'

import TagList from './TagList'

export default function PostHeader(
  props: Pick<Post, 'title' | 'coverImage' | 'tags' | 'publishedAt' | 'author' | 'slug'>
) {
  const { title, coverImage, tags, publishedAt, author, slug } = props

  console.log(tags)

  const postTitleClasses = coverImage ? 'absolute' : 'static'

  return (
    <>
      <div className={cn('relative -mx-5 mb-8 ')}>
        <div className={cn(`${postTitleClasses} bottom-0 w-full z-20 p-5 ` +
          'bg-gradient-to-r from-sky-500/75 to-indigo-250/25 ' +
          'text-slate-700 backdrop-blur mix-blend-luminosity')}>
          <PostTitle>{title}</PostTitle>
        </div>
        {
          coverImage &&
          <div className='relative sm:mx-0 z-10 rounded'>
            <BlogImage title={title} image={coverImage} width={1280} height={720} priority captionPosition={'top'} />
          </div>
        }
      </div>
      <div className={cn('flex flex-wrap items-center mx-auto max-w-2xl')}>
        <div className={cn('flex-none')}>
          {author && <Avatar firstName={author.firstName} picture={author.picture} />}
        </div>
        <span className={cn('flex-none ml-1 mr-1 lg:ml-2.5 lg:mr-2.5 pb-2 sm:pb-2.5 md:pb-3 lg:pb-4 text-base md:text-2xl')}>.</span>
        <div className={cn('text-lg flex-none pb-1 sm:pb-0')}>
          <Date dateString={publishedAt} />
        </div>
        {tags && tags.length &&
          <>
            <span className={cn('flex-none ml-1 mr-1 lg:ml-2.5 lg:mr-2.5 pb-2 sm:pb-2.5 md:pb-3 lg:pb-4 text-base md:text-2xl')}>.</span>
            <div className={cn('flex flex-wrap ml-2 sm:ml-0')}>
              <TagList tags={tags} itemClassNames={'mt-1 mr-1 lg:mr-2.5 text-xs sm:text-sm'} />
            </div>
          </>
        }
      </div>
    </>
  )
}
