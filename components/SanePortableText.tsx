import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PortableText } from '@portabletext/react';
import cn from 'classnames';
import Link from 'next/link';
import React from 'react';

// TODO: TS all the things

const components = {
  marks: {
    link: ({ value, children }) => {
      const { blank, href } = value;
      return blank || undefined === blank ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener"
          className={cn('text-sky-500')}
          aria-label={`Visit link "${children}". Link opens in a new tab.`}
        >
          {children}
          <sup>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className={'ml-1 w-2'}
            />
          </sup>
        </Link>
      ) : (
        <Link
          href={href}
          className={cn('text-sky-500')}
          aria-label={`Visit link "${children}". Link opens in the same tab.`}
        >
          {children}
        </Link>
      );
    },
    underline: ({ children }) => {
      return (
        <span className={'underline decoration-sky-500 decoration-2'}>
          {children}
        </span>
      );
    },
    highlight: ({ children }) => {
      return <span className={'bg-sky-500/50'}>{children}</span>;
    },
    sup: ({ children }) => {
      return <sup>{children}</sup>;
    },
    sub: ({ children }) => {
      return <sub>{children}</sub>;
    },
  },
};

interface SanePortableTextProps {
  content: any
}

export default function SanePortableText({ content }: SanePortableTextProps) {
  return <PortableText value={content} components={components} />;
}
