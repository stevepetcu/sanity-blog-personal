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
  let fontSize = 1 === level ? 'text-2xl' : 'text-xl'
  return (
    <>
      <header
        className={cn('mt-5 flex flex-col items-center tracking-tight md:flex-row md:justify-between')}>
        <h1 className={cn(`${fontSize} font-bold leading-tight tracking-tighter md:pr-8`)}>
          <Link href={POSTS_PAGE_PATH} className='hover:underline'>
            {title}
          </Link>
        </h1>
        <span className={cn(`${fontSize} text-right ${styles.portableText}`)}>
        <PortableText value={description} />
      </span>
      </header>
      <SectionSeparator mt={2} mb={12}  />
    </>
  )
}
