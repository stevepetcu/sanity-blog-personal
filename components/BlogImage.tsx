import { PortableText } from '@portabletext/react'
import cn from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { PixelRatioContext } from '../contexts/PixelRatioContext'
import { BlogImage } from '../lib/sanity.queries'

interface BlogImageProps {
  title: string
  slug?: string
  image: BlogImage
  priority?: boolean
  width: number
  height: number
}

export default function BlogImage(props: BlogImageProps) {
  const pixelRatio = React.useContext(PixelRatioContext)

  const { title, slug, image, width, height, priority } = props
  const scaledWidth = pixelRatio * width
  const scaledHeight = pixelRatio * height

  const imageComponent = image?.asset?._ref ? (
    <>
      <div
        className={cn('relative shadow-small', {
          'transition-shadow duration-200 hover:shadow-medium': slug
        })}
      >
        <Image
          className='h-auto w-full'
          width={scaledWidth}
          height={scaledHeight}
          alt={image.alt}
          title={image.alt}
          src={urlForImage(image).height(scaledHeight).width(scaledWidth).url()}
          sizes='100vw'
          priority={priority}
        />
      </div>
      {image.caption && <PortableText value={image.caption} />}
    </>
  ) : null

  return (
    imageComponent ?
      <div className='sm:mx-0'>
        {slug ? (
          <Link href={`/posts/${slug}`} aria-label={title}>
            {imageComponent}
          </Link>
        ) : (
          imageComponent
        )}
      </div> :
      <></>
  )
}
