import {PortableText} from '@portabletext/react'
import React from 'react'

// TODO: TS things

const components = {
  marks: {
    link: ({value, children}) => {
      const { blank, href } = value
      return blank || undefined === blank ?
        <a href={href} target="_blank" rel="noopener">{children}</a>
        : <a href={href}>{children}</a>
    }
  }
}

interface SanePortableTextProps {
  content: any;
}

export default function SanePortableText({ content }: SanePortableTextProps) {
  return <PortableText value={content} components={components} />
}
