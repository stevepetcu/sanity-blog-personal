import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import PostPinComponent from 'components/PostPin';
import type { PostPin } from 'lib/sanity.queries';

export default function PostPins({ pins }: { pins: PostPin[] }) {
  return (
    <section>
      <h2 className={cn('text-md mb-5 font-medium leading-snug ml-2.5')}>
        <FontAwesomeIcon
          icon={faThumbtack}
          className={cn('h-5 w-5 mr-2.5')}
        />
        Pinned posts
      </h2>
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7'
        )}
      >
        {pins.map((pin, index) => (
          <PostPinComponent
            postPin={pin}
            key={pin._id}
            index={index + 1}
            total={pins.length}
          />
        ))}
      </div>
    </section>
  );
}
