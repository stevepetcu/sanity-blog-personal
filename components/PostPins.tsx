import PostPinComponent from 'components/PostPin'
import type { PostPin } from 'lib/sanity.queries'

export default function PostPins({ pins }: { pins: PostPin[] }) {
  return (
    <section>
      <div className='mb-32 grid grid-cols-2 gap-y-20 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-16'>
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
