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
    <sup>
      <FontAwesomeIcon
        icon={faArrowUpRightFromSquare}
        className={'ml-1 w-2'}
      />
    </sup>
  </Link>;
}
