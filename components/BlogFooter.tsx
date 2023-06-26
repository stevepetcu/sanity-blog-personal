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
          'mx-auto flex w-full max-w-screen-xl px-4 pb-5 ' +
          'font-light gap-x-4 sm:items-center sm:justify-between ' +
          classNames
        }
      >
        <span className="line-clamp-1 grow text-slate-600">
          🧑‍💻 Author&apos;s links:
        </span>
        <AuthorLinks admin={admin} placement={'footer'} />
      </footer>
    </>
  );
}
