import { PortableText } from '@portabletext/react'
import { LaunchIcon } from '@sanity/icons'
import cn from 'classnames'
import React from 'react'

// TODO: TS things

const components = {
  marks: {
    link: ({ value, children }) => {
      const { blank, href } = value
      return blank || undefined === blank ?
        <a href={href} target='_blank' rel='noopener' className={cn('text-sky-500 after:content-["↗"]')}
           aria-label={`Visit link "${children}". Link opens in a new tab.`}>
          {children}
        </a>
        : <a href={href} className={cn('text-sky-500')} aria-label={`Visit link "${children}". Link opens in the same tab.`}>{children}</a>
    },
    underline: ({ children }) => {
      return <span className={'underline decoration-sky-500 decoration-2'}>{children}</span>
    },
    highlight: ({ children }) => {
      return <span className={'bg-sky-500/50'}>{children}</span>
    },
    sup: ({ children }) => {
      return <sup>{children}</sup>
    },
    sub: ({ children }) => {
      return <sub>{children}</sub>
    }
  }
}

interface SanePortableTextProps {
  content: any;
}

export default function SanePortableText({ content }: SanePortableTextProps) {
  return <PortableText value={content} components={components} />
}
