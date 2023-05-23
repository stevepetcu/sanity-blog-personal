import cn from 'classnames'
import type { PostPin } from 'lib/sanity.queries'
import Link from 'next/link'

import { POSTS_PAGE_PATH } from '../pages/posts'
import BlogImage from './BlogImage'
import Date from './PostDate'
import TagList from './TagList'

interface PostPinProps {
  postPin: Omit<PostPin, '_id'>,
  index: number
  total: number
}

export default function PostPin(props: PostPinProps) {
  const {
    title,
    slug,
    coverImage,
    summary,
    tags,
    updatedAt
  } = props.postPin
  const { index, total } = props

  return (
    <div className={cn('group rounded')}>
      {
        coverImage &&
        <div className={cn('relative mb-2')}>
          <BlogImage
            slug={slug}
            title={title}
            image={coverImage}
            priority={true}
            width={420}
            height={140}
          />
          <span className={cn('absolute top-1 left-2 font-bold text-white/75 text-xl sm:text-sm lg:text-lg')}>
            {index}/{total}
          </span>
        </div>
      }
      {!coverImage &&
        <div className={cn('pt-0 md:pt-0.5 lg:pt-1')}>
          <span className={cn('ml-2 font-bold text-slate-400 text-lg sm:text-base lg:text-lg')}>{index}/{total}</span>
        </div>
      }
      <div className={cn('p-2')}>
        <h3 className={cn('leading-snug text-lg font-medium text-slate-800')}>
          <Link href={`${POSTS_PAGE_PATH}/${slug}`} className='hover:underline'>
            {title}
          </Link>
        </h3>
        {!coverImage &&
          <Link href={`${POSTS_PAGE_PATH}/${slug}`} className='hover:underline'>
            <p className={cn(`text-base text-slate-500 leading-relaxed line-clamp-3`)}>{summary}</p>
          </Link>
        }
        <div className={cn('flex flex-wrap mt-2.5 text-sm text-slate-800')}>
          <p className={'mr-1.5'}>Updated at:</p>
          <Date dateString={updatedAt} />
        </div>
        {tags && tags.length &&
          <div className={cn('flex flex-wrap mt-2.5')}>
            <TagList tags={tags} itemClassNames={'mr-1.5 mb-1.5 text-xs sm:text-sm lg:text-base'} />
          </div>}
      </div>
    </div>
  )
}
