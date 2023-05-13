/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import { PortableText } from '@portabletext/react'

import { Post, PostSection, Settings } from '../lib/sanity.queries'
import styles from './PostBody.module.css'
import { PostPageProps } from './PostPage'

export default function PostFootnotes({ content }) {
  return (
    <div className={`mx-auto max-w-2xl ${styles.portableText}`}>
      <PortableText value={content} />
    </div>
  )
}
