import cn from 'classnames';
import { urlForImage } from 'lib/sanity.image';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { PixelRatioContext } from '../contexts/PixelRatioContext';
import { BlogImage } from '../lib/sanity.queries';
import { POSTS_PAGE_PATH } from '../pages/posts';
import styles from './BlogImage.module.css';
import SanePortableText from './SanePortableText';

interface BlogImageProps {
  title: string
  slug?: string
  image: BlogImage
  priority?: boolean
  width: number
  height: number
  imageClassNames?: string
}

export default function BlogImage(props: BlogImageProps) {
  const pixelRatio = React.useContext(PixelRatioContext);

  const { title, slug, image, width, height, priority, imageClassNames } = props;
  const scaledWidth = pixelRatio * width;
  const scaledHeight = pixelRatio * height;

  const imageComponent = (
    <div
      className={cn(
        'relative bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] ' +
          'from-indigo-50 from-35% via-sky-100 via-50% to-emerald-50 to-75%'
      )}
    >
      <Image
        className={cn(`h-auto w-full rounded ${imageClassNames || ''}`)}
        width={scaledWidth}
        height={scaledHeight}
        alt={image.alt}
        title={image.alt}
        src={urlForImage(image).height(scaledHeight).width(scaledWidth).url()}
        sizes="100vw"
        priority={priority}
      />
    </div>
  );

  return (
    <figure
      className={cn(
        'relative overflow-clip drop-shadow-sm @container/blogImage',
        {
          'transition-all duration-200 hover:drop-shadow-lg': slug,
        }
      )}
    >
      {slug ? (
        <Link href={`${POSTS_PAGE_PATH}/${slug}`} aria-label={title}>
          {imageComponent}
        </Link>
      ) : (
        imageComponent
      )}
      <figcaption
        className={cn(`${styles.portableText} absolute
        bottom-0 left-0 w-full 
        whitespace-nowrap rounded-b bg-white/10
        p-1 text-center
        text-xs text-slate-700
        backdrop-blur-sm
        @[50px]/blogImage:text-[0.5rem] @[50px]/blogImage:leading-[0.5rem] 
        @[350px]/blogImage:text-xs`)}
      >
        <SanePortableText content={image.caption} />
      </figcaption>
    </figure>
  );
}
