import cn from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { PixelRatioContext } from '../contexts/PixelRatioContext'
import { BlogImage } from '../lib/sanity.queries'
import { POSTS_PAGE_PATH } from '../pages/posts'
import styles from './BlogImage.module.css'
import SanePortableText from './SanePortableText'

interface BlogImageProps {
  title: string
  slug?: string
  image: BlogImage
  priority?: boolean
  width: number
  height: number
  alwaysShowCaption: boolean
}

export default function BlogImage(props: BlogImageProps) {
  const pixelRatio = React.useContext(PixelRatioContext)

  const { title, slug, image, width, height, priority, alwaysShowCaption } = props
  const scaledWidth = pixelRatio * width
  const scaledHeight = pixelRatio * height

  const imageComponent =
    <div
      className={cn('relative')}
    >
      <Image
        className={cn('h-auto w-full rounded-tr-lg')}
        width={scaledWidth}
        height={scaledHeight}
        alt={image.alt}
        title={image.alt}
        src={urlForImage(image).height(scaledHeight).width(scaledWidth).url()}
        sizes='100vw'
        priority={priority}
      />
    </div>

  const captionClassName = alwaysShowCaption ?
    `text-xs absolute bottom-0 left-0 bg-white/75 p-1 ${styles.portableText}` :
    `translate-y-10 transition-all ease-in-out group-hover:-translate-y-0 text-xs absolute bottom-0 left-0 bg-white/75 p-1 ${styles.portableText}`


  return (
    <div className={cn('group relative overflow-clip drop-shadow-sm', { 'transition-all duration-200 hover:drop-shadow-lg': slug })}>
      {slug ? (
        <Link href={`${POSTS_PAGE_PATH}/${slug}`} aria-label={title}>
          {imageComponent}
        </Link>
      ) : (
        imageComponent
      )}
      <div
        className={cn(captionClassName)}>
        <SanePortableText content={image.caption} />
      </div>
    </div>
  )
}
