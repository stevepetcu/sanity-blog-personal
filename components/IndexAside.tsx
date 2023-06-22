import cn from 'classnames';
import Link from 'next/link';

import { Author, Post } from '../lib/sanity.queries';
import BlogFooter from './BlogFooter';
import TagList from './TagList';

interface IndexAsideProps {
  tags: Post['tags']
  admin: Author
}
export default function IndexAside({ tags, admin }: IndexAsideProps) {
  return (
    <aside className={'static top-0 pt-0 md:pt-7 lg:sticky'}>
      <h2 className={cn('text-md mb-5 font-medium leading-snug')}>
        More topics you can explore
      </h2>
      <div className={cn('mb-8 flex flex-wrap gap-x-2 gap-y-4')}>
        <TagList tags={tags} />
      </div>
      { false &&
        <Link
          className={'text-sm text-sky-500 hover:text-sky-700'}
          href={'#to-do-search-page'}
        >
          See more topics
        </Link> // TODO: Implement the search page
      }
      <BlogFooter admin={admin} classNames={'hidden lg:flex'} />
    </aside>
  );
}
