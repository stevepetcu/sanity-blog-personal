import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import PostPinComponent from 'components/PostPin';
import type { PostPin } from 'lib/sanity.queries';

export default function PostPins({ pins }: { pins: PostPin[] }) {
  return (
    <section>
      <div className={'mb-5 flex items-center'}>
        <FontAwesomeIcon
          icon={faThumbtack}
          className={cn('mr-4 h-5 w-5 rounded-full bg-slate-200 p-1.5 md:mr-5')}
        />
        <h2
          className={cn('ml-0.5 text-base font-medium leading-snug md:text-xl')}
        >
          Pinned posts
        </h2>
      </div>
      <div
        className={cn(
          'grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3'
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
