/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import { LinkIcon } from '@sanity/icons'
import cn from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

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
                                    }: Omit<PostSection, '_key'> & { index: number }) {

  const [isLinkToHeadingCopied, setIsLinkToHeadingCopied] = useState(false)

  async function copyTextToClipboard(text) {
    // TODO: probably don't need this function, just use the navigator.clipboard directly
    //  Better yet, configure the base path thru settings and concatenate it with /posts etc.
    //  Instead of using the window object.
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }

  const copyLinkToHeading = async (anchor: string) => {
    const location = window.location.origin + window.location.pathname // TODO: can I use `useLocation` with next js?

    try {
      await copyTextToClipboard(`${location}#${anchor}`)
      setIsLinkToHeadingCopied(true)
      setTimeout(() => {
        setIsLinkToHeadingCopied(false)
      }, 1000)
    } catch (e) {
      console.error(e) // TODO: handle this better.
    }
  }

  return (
    <section className={cn(`mx-auto max-w-2xl ${styles.portableText}`)}>
      {heading &&
        <h2 onClick={() => copyLinkToHeading(anchor.current)} id={anchor.current}
            className={cn('transition-all ease-in-out cursor-grab', { 'text-green-700': isLinkToHeadingCopied })}>{heading}</h2>}
      <SanePortableText content={body} />
      {sectionImage &&
        <BlogImage title={sectionImage.alt} image={sectionImage} width={480} height={320} priority={index <= 1}
                   alwaysShowCaption={true} />
      }
    </section>
  )
}
