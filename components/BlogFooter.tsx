import { Author } from '../lib/sanity.queries';
import AuthorLinks from './AuthorLinks';
import SectionSeparator from './SectionSeparator';

interface BlogFooterProps {
  admin: Author
}

export default function BlogFooter(props: BlogFooterProps) {
  const { firstName, lastName } = props.admin;

  return (
    <footer>
      <SectionSeparator />
      <div
        className="mx-auto flex w-full max-w-screen-xl px-4 pb-5 font-light text-slate-600 hover:text-slate-900
      sm:items-center sm:justify-between"
      >
        <span className="grow text-slate-600">
          🧑‍💻 by {firstName} {lastName}
        </span>
        <AuthorLinks admin={props.admin} placement={'footer'} />
      </div>
    </footer>
  );
}
