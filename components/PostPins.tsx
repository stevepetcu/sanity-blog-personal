import { faThumbtack } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import PostPinComponent from 'components/PostPin'
import type { PostPin } from 'lib/sanity.queries'

import SectionSeparator from './SectionSeparator'

export default function PostPins({ pins }: { pins: PostPin[] }) {
  return (
    <section>
      <h2 className={cn('text-md leading-snug mb-5 font-medium')}>
        <FontAwesomeIcon icon={faThumbtack}
          className={cn('w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6')} /> Pinned posts
      </h2>
      <div className={cn('grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3')}>
        {pins.map((pin, index) => (
          <PostPinComponent
            key={pin._id}
            index={index + 1}
            total={pins.length}
            title={pin.title}
            summary={pin.summary}
            slug={pin.slug}
            coverImage={pin.coverImage}
            tags={pin.tags}
            updatedAt={pin.updatedAt}
          />
        ))}
      </div>
    </section>
  )
}
