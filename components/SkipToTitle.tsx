import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { IconHr } from './IconHr';

export default function SkipToTitle() {
  return <a href={'#post-title'} title={'Skip to post title'}
    aria-label={'Skip to post title'}
    className={'group'}>
    <IconHr
      icon={faChevronUp}
      iconWidth={16}
      iconHeight={16}
      iconClassNames={'group-hover:animate-bounce group-hover:text-slate-500 ' +
        'transition-colors duration-300'}
      hrClassNames={'group-hover:bg-slate-400 group-hover:w-full ' +
        'transition-all duration-300 ease-out'}
    />
  </a>;
}
