import { Author } from '../lib/sanity.queries'
import AuthorLinks from './AuthorLinks'
import SectionSeparator from './SectionSeparator'

interface BlogFooterProps {
  admin: Author
}

export default function BlogFooter(props: BlogFooterProps) {
  const { firstName, lastName } = props.admin

  return (
    <footer>
      <SectionSeparator />
      <div className='mx-auto w-full max-w-screen-xl px-4 pb-5 flex sm:items-center sm:justify-between font-light
      text-slate-600 hover:text-slate-900'>
        <span className='text-slate-600 grow'>🧑‍💻 by {firstName} {lastName}</span>
        <AuthorLinks admin={props.admin} placement={'footer'} />
      </div>
    </footer>
  )
}
