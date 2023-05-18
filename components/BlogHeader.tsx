import { PortableText } from '@portabletext/react'
import cn from 'classnames'
import Link from 'next/link'

import { POSTS_PAGE_PATH } from '../pages/posts'
import styles from './BlogHeader.module.css'
import SectionSeparator from './SectionSeparator'

export default function BlogHeader({
                                     title,
                                     description,
                                     level
                                   }: {
  title: string
  description?: any[]
  level: 1 | 2
}) {
  if (![1, 2].includes(level)) {
    throw new Error(`Invalid level: ${
      JSON.stringify(level) || typeof level
    }, only 1 or 2 are allowed`)
  }
  let fontSize = 1 === level ? 'md:text-2xl' : 'md:text-xl'
  return (
    <>
      <header
        className={cn('mt-5 flex flex-row items-center tracking-tight justify-between')}>
        <h1 className={cn(`text-sm ${fontSize} font-bold leading-tight tracking-tighter md:pr-8`)}>
          <Link href={POSTS_PAGE_PATH} className='hover:underline'>
            {title}
          </Link>
        </h1>
        <span className={cn(`text-sm ${fontSize} text-right ${styles.portableText}`)}>
        <PortableText value={description} />
      </span>
      </header>
      <SectionSeparator mt={'mt-2'} mb={'mb-8'} />
    </>
  )
}
