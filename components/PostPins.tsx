import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import PostPinComponent from 'components/PostPin';
import type { PostPin } from 'lib/sanity.queries';

export default function PostPins({ pins }: { pins: PostPin[] }) {
  return (
    <section>
      <div className={'flex items-center mb-5 ml-2'}>
        <FontAwesomeIcon
          icon={faThumbtack}
          className={cn('h-5 w-5 mr-4 md:mr-5 p-1.5 bg-slate-200 rounded-full')}
        />
        <h2 className={cn('text-base md:text-xl ml-0.5 font-medium leading-snug')}>
          Pinned posts
        </h2>
      </div>
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8'
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
