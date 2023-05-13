/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import cn from 'classnames'
import Image from 'next/image'

import { PostSection } from '../lib/sanity.queries'
import BlogImage from './BlogImage'
import styles from './PostBody.module.css'
import SanePortableText from './SanePortableText'

// TODO:
//  1. Extract a reusable image component
//  2. Add a button to copy the heading's anchor
export default function PostSection({
                                      index,
                                      heading,
                                      anchor,
                                      body,
                                      sectionImage
                                    }: Omit<PostSection & {index: number}, '_id'>) {
  return (
    <section className={cn(`mx-auto max-w-2xl ${styles.portableText}`)}>
      {heading && <h2 id={anchor.current}>{heading}</h2>}
      <SanePortableText content={body} />
      {sectionImage &&
        <BlogImage title={sectionImage.alt} image={sectionImage} width={480} height={320} priority={index <= 1} alwaysShowCaption={true} />
      }
    </section>
  )
}
