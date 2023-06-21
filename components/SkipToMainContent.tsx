import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

export default function SkipToMainContent() {
  return <a href={'#post-section-0'} title={'Skip to main content'}
    aria-label={'Skip to main content'}
    className={'group opacity-20 hover:opacity-100 transition-opacity'}>
    <div className={'flex justify-center items-center ' +
    'space-x-2.5 w-full px-8'}>
      <div className={'group-hover:flex-grow'}>
        <hr className="h-px my-1 bg-slate-400 border-0 w-28 group-hover:w-full"/>
      </div>
      <FontAwesomeIcon
        icon={faChevronDown}
        width={20}
        height={20}
        className={cn('text-slate-500 my-2 group-hover:animate-bounce')}
      />
      <div className={'group-hover:flex-grow'}>
        <hr className="h-px my-1 bg-slate-400 border-0 w-28 group-hover:w-full"/>
      </div>
    </div>
  </a>;
}
