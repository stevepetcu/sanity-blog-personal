/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import { CheckmarkIcon, LinkIcon } from '@sanity/icons'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { PostSection } from '../lib/sanity.queries'
import BlogImage from './BlogImage'
import styles from './PostSection.module.css'
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
                                    }: Omit<PostSection, '_key'> & { index: number }) {
  const [isLinkToHeadingCopied, setIsLinkToHeadingCopied] = useState(false)
  const location = useRouter()

  const copyLinkToHeading = async (anchor: string) => {
    // We could generate the location statically, but we'd need to mess
    // with environment variables. Given the website domain has a few
    // aliases, we'll go with using the window object for now, since
    // this function only runs client-side anyway.
    const location = window?.location?.origin + window?.location?.pathname

    try {
      await navigator.clipboard.writeText(`${location}#${anchor}`)
      setIsLinkToHeadingCopied(true)
      setTimeout(() => {
        setIsLinkToHeadingCopied(false)
      }, 1000)
    } catch (e) {
      console.error(`Failed to copy the anchor link to clipboard; ${e.message}.`)
    }
  }

  return (
    <section className={cn(`mx-auto max-w-2xl ${styles.portableText}`)}>
      {heading &&
        <h2 onClick={() => copyLinkToHeading(anchor.current)} id={anchor.current}
            className={cn(`${styles.sectionHeading} group`)}>
          {heading}
          {!isLinkToHeadingCopied && <LinkIcon width='2.5rem' height='2.5rem'
                                               className={cn('inline mb-1.5 group-hover:translate-x-1.5 transition-all ease-in-out text-sky-500')} />}
          {isLinkToHeadingCopied && <CheckmarkIcon width='2.5rem' height='2.5rem'
                                                   className={cn('inline mb-1.5 group-hover:translate-x-1.5 transition-all ease-in-out text-green-600')} />}
        </h2>}
      <SanePortableText content={body} />
      {sectionImage &&
        <BlogImage title={sectionImage.alt} image={sectionImage} width={480} height={320} priority={index <= 1}
                   alwaysShowCaption={true} />
      }
    </section>
  )
}
