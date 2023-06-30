import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { IconHr } from './IconHr';

export default function SkipToMainContent() {
  return (
    <a
      href={'#post-section-0'}
      title={'Skip to main content'}
      aria-label={'Skip to main content'}
      className={'group'}
    >
      <IconHr
        icon={faChevronDown}
        iconWidth={16}
        iconHeight={16}
        iconClassNames={'group-hover:animate-bounce group-hover:text-slate-500 ' +
          'transition-colors duration-300'}
        hrClassNames={'group-hover:bg-slate-400 group-hover:w-full ' +
          'transition-all duration-300 ease-out'}
      />
    </a>
  );
}
