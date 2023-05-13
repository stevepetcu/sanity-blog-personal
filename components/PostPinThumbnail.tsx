import cn from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'

interface PostPinThumbnailProps {
  title: string
  slug?: string
  image: any
  priority?: boolean
  width: number
  height: number
}

export default function PostPinThumbnail(props: PostPinThumbnailProps) {
  const { title, slug, image: source, priority, height, width } = props
  const image = source?.asset?._ref ? (
    <div
      className={cn('shadow-small', {
        'transition-shadow duration-200 hover:shadow-medium': slug,
      })}
    >
      <Image
        className="h-auto w-full"
        width={width}
        height={height}
        alt={`Cover Image for ${title}`}
        src={urlForImage(source).width(width * 4).height(height * 4).url()}
        sizes="100vw"
        priority={priority}
      />
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
