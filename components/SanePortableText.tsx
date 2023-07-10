import { PortableText } from '@portabletext/react';
import cn from 'classnames';
import Link from 'next/link';
import React from 'react';

import LinkExternal from './LinkExternal';

// TODO: TS all the things

const components = {
  marks: {
    link: ({ value, children }) => {
      const { blank, href } = value;
      return blank || undefined === blank ? (
        <LinkExternal href={href}>
          {children}
        </LinkExternal>
      ) : (
        <Link
          href={href}
          className={cn('text-sky-500')}
          aria-label={`Link opens in the same tab.`}
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
