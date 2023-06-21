import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

export default function SkipToTitle() {
  return <a href={'#post-title'} title={'Skip to post title'}
    aria-label={'Skip to post title'}
    className={'group opacity-20 hover:opacity-100 transition-opacity'}>
    <div className={'flex justify-center items-center ' +
      'space-x-2.5 w-full px-8'}>
      <div className={'group-hover:flex-grow'}>
        <hr className="h-px my-1 bg-slate-400 border-0 w-28 group-hover:w-full"/>
      </div>
      <FontAwesomeIcon
        icon={faChevronUp}
        width={16}
        height={16}
        className={cn('text-slate-500 my-2 group-hover:animate-bounce')}
      />
      <div className={'group-hover:flex-grow'}>
        <hr className="h-px my-1 bg-slate-400 border-0 w-28 group-hover:w-full"/>
      </div>
    </div>
  </a>;
}
