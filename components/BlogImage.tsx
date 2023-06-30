import cn from 'classnames';
import { urlForImage } from 'lib/sanity.image';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { PixelRatioContext } from '../contexts/PixelRatioContext';
import { BlogImage } from '../lib/sanity.queries';
import { PAGE_POSTS_PATH } from '../pages/posts';
import styles from './BlogImage.module.css';
import SanePortableText from './SanePortableText';

interface BlogImageProps {
  title: string;
  slug?: string;
  image: BlogImage;
  priority?: boolean;
  width: number;
  height: number;
  imageClassNames?: string;
}

export default function BlogImage(props: BlogImageProps) {
  const pixelRatio = React.useContext(PixelRatioContext);

  const { title, slug, image, width, height, priority, imageClassNames } =
    props;

  const imageComponent = (
    <div
      className={cn(
        'relative bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] ' +
          'from-indigo-50 from-35% via-sky-100 via-50% to-emerald-50 to-75%'
      )}
    >
      <Image
        className={cn(`h-auto w-full rounded ${imageClassNames || ''}`)}
        width={width}
        height={height}
        alt={image.alt}
        title={image.alt}
        src={urlForImage(image)
          .width(width)
          .height(height)
          .dpr(pixelRatio)
          .fit('crop')
          .crop('focalpoint')
          .url()}
        sizes="(max-width 600px) 600px, (max-width: 728px) 728px, (max-width: 905px) 905px, (max-width: 1200px) 1200px"
        priority={priority}
      />
    </div>
  );

  return (
    <figure
      className={cn('relative drop-shadow-sm @container/blogImage', {
        'transition-all duration-200 hover:drop-shadow-lg': slug,
      })}
    >
      {slug ? (
        <Link href={`${PAGE_POSTS_PATH}/${slug}`} aria-label={title}>
          {imageComponent}
        </Link>
      ) : (
        imageComponent
      )}
      <figcaption
        className={cn(`${styles.portableText} absolute
        @[50px]/blogImage:invisible @[275px]/blogImage:visible
        bottom-0 left-0 w-full whitespace-nowrap 
        rounded-b bg-white/10 px-1 py-0.5 @[275px]/blogImage:py-2
        text-center text-xs font-light text-slate-700 
        mix-blend-hard-light backdrop-blur-sm
        @[50px]/blogImage:text-[0.5rem] @[50px]/blogImage:leading-[1rem] 
        @[275px]/blogImage:text-xs`)}
      >
        <SanePortableText content={image.caption} />
      </figcaption>
    </figure>
  );
}
