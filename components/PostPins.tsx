import cn from 'classnames'
import PostPinComponent from 'components/PostPin'
import type { PostPin } from 'lib/sanity.queries'

import SectionSeparator from './SectionSeparator'

export default function PostPins({ pins }: { pins: PostPin[] }) {
  return (
    <section>
      <h2 className={cn('text-md leading-snug mb-5')}>Pinned posts</h2>
      <div className={cn('grid grid-cols-1 gap-x-3.5 gap-y-5 md:grid-cols-2 lg:gap-x-5 lg:grid-cols-3')}>
        {pins.map((pin) => (
          <PostPinComponent
            key={pin._id}
            title={pin.title}
            slug={pin.slug}
            coverImage={pin.coverImage}
            tags={pin.tags}
          />
        ))}
      </div>
    </section>
  )
}
