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
import Image from 'next/image'

import { urlForImage } from '../lib/sanity.image'
import { Post, PostSection, Settings } from '../lib/sanity.queries'
import styles from './PostBody.module.css'
import { PostPageProps } from './PostPage'

// TODO:
//  1. Extract a reusable image component
//  2. Add a button to copy the heading's anchor
export default function PostSection({
                                      heading,
                                      anchor,
                                      body,
                                      sectionImage
                                    }: Omit<PostSection, '_id'>) {
  return (
    <div className={`mx-auto max-w-2xl ${styles.portableText}`}>
      {heading && <h2 id={anchor.current}>{heading}</h2>}
      <PortableText value={body} />
      {sectionImage &&
        <Image
          className='h-auto w-full'
          width={480}
          height={320}
          alt={sectionImage.alt}
          title={sectionImage.alt}
          src={urlForImage(sectionImage.asset._ref).width(480 * 4).height(320 * 4).url()}
          sizes='100vw'
          priority={false}
        />}
    </div>
  )
}
