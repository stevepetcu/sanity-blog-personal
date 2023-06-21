import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

export default function SkipToMainContent() {
  return <a href={'#post-section-0'} title={'Skip to main content'}
    aria-label={'Skip to main content'}
    className={'group'}>
    <div className={'flex justify-center items-center ' +
    'space-x-2.5 w-full px-8'}>
      <div className={'group-hover:flex-grow'}>
        <hr className="h-px my-1 bg-slate-200 group-hover:bg-slate-400
        border-0 w-28 group-hover:w-full transition-colors"/>
      </div>
      <FontAwesomeIcon
        icon={faChevronDown}
        width={16}
        height={16}
        className={cn('text-slate-300 group-hover:text-slate-500 ' +
          'my-2 group-hover:animate-bounce transition-colors')}
      />
      <div className={'group-hover:flex-grow'}>
        <hr className="h-px my-1 bg-slate-200 group-hover:bg-slate-400
        border-0 w-28 group-hover:w-full transition-colors"/>
      </div>
    </div>
  </a>;
}
