import cn from 'classnames'
import PostPinComponent from 'components/PostPin'
import type { PostPin } from 'lib/sanity.queries'

import SectionSeparator from './SectionSeparator'

export default function PostPins({ pins }: { pins: PostPin[] }) {
  return (
    <section>
      <h2 className={cn('text-xl antialiased mb-5')}>Pinned posts</h2>
      <div className={cn('grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-8 lg:gap-x-16 lg:grid-cols-3')}>
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
      <SectionSeparator />
    </section>
  )
}
