import cn from 'classnames';
import Link from 'next/link';

import { Author } from '../lib/sanity.queries';
import BlogFooter from './BlogFooter';
import TagList from './TagList';

interface IndexAsideProps {
  tags: string[]
  admin: Author
}
export default function IndexAside({ tags, admin }: IndexAsideProps) {
  return (
    <aside className={'static lg:sticky top-0 pt-0 md:pt-7'}>
      <h2 className={cn('text-md mb-5 font-medium leading-snug')}>More topics you can explore</h2>
      <div className={cn('flex flex-wrap gap-x-2 gap-y-4 mb-5')}>
        <TagList tags={tags} />
      </div>
      <Link className={'text-sm'} href={'#to-do-search-page'}>See all the topics</Link>
      <BlogFooter admin={admin} classNames={'hidden lg:flex'}/>
    </aside>
  );
}
