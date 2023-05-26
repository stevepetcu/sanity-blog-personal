import { PortableText } from '@portabletext/react';
import cn from 'classnames';
import Link from 'next/link';

import { Author } from '../lib/sanity.queries';
import { POSTS_PAGE_PATH } from '../pages/posts';
import AuthorLinks from './AuthorLinks';
import styles from './BlogHeader.module.css';
import SectionSeparator from './SectionSeparator';

export default function BlogHeader({
  title,
  description,
  admin,
  level,
}: {
  title: string
  description?: any[]
  admin: Author
  level: 1 | 2
}) {
  if (![1, 2].includes(level)) {
    throw new Error(
      `Invalid level: ${
        JSON.stringify(level) || typeof level
      }, only 1 or 2 are allowed`
    );
  }
  const headerFontSize = 1 === level ? 'md:text-2xl' : 'md:text-xl';
  const linksFontSize = 1 === level ? 'md:text-xl' : 'md:text-base';

  return (
    <>
      <header className={cn('mt-5 flex flex-row items-center tracking-tight')}>
        <h1
          className={cn(
            `grow basis-1/3 text-sm ${headerFontSize} font-bold leading-tight tracking-tighter md:pr-8`
          )}
        >
          <Link href={POSTS_PAGE_PATH} className="hover:underline">
            {title}
          </Link>
        </h1>
        <span
          className={cn(
            `${styles.portableText} hidden basis-1/3 text-sm 
            sm:inline-block ${headerFontSize} text-center lg:text-right`
          )}
        >
          <PortableText value={description} />
        </span>
        <div className={'flex basis-1/3 justify-end lg:hidden'}>
          <AuthorLinks
            admin={admin}
            placement={'header'}
            linkClassNames={`text-sm ${linksFontSize}`}
          />
        </div>
      </header>
      <SectionSeparator classNames={'mt-2 mb-8'} />
    </>
  );
}
