import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

export default function LinkExternal(props: LinkProps & PropsWithChildren) {
  return <Link
    href={props.href}
    target='_blank'
    rel='noopener nofollow'
    aria-label={'Link opens in a new tab.'}
  >
    {props.children}
    <sup className={'text-xs md:text-sm'}>
      <FontAwesomeIcon
        icon={faArrowUpRightFromSquare}
        className={'ml-0.5 w-1.5 md:w-2 xl:w-2.5'}
      />
    </sup>
  </Link>;
}
