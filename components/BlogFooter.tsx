import { Author } from '../lib/sanity.queries';
import AuthorLinks from './AuthorLinks';
import SectionSeparator from './SectionSeparator';

interface BlogFooterProps {
  admin: Author
  classNames?: string
}

export default function BlogFooter({ admin, classNames }: BlogFooterProps) {
  return (
    <>
      <SectionSeparator classNames={'mt-7 mb-7'} />
      <footer
        className={
          'mx-auto flex w-full max-w-screen-xl px-5 mb-5 ' +
          'font-light gap-x-7 items-end justify-around ' +
          classNames
        }
      >
        <AuthorLinks admin={admin} placement={'footer'} />
      </footer>
    </>
  );
}
