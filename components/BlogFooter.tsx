import { Settings } from '../lib/sanity.queries'
import AuthorLinks from './AuthorLinks'
import SectionSeparator from './SectionSeparator'

export default function BlogFooter({ admin }: Pick<Settings, 'admin'>) {
  return (
    <footer>
      <SectionSeparator />
      <div className='mx-auto w-full max-w-screen-xl px-4 pb-5 flex sm:items-center sm:justify-between font-light
      text-slate-600 hover:text-slate-900'>
        <span className='text-slate-600 grow'>🧑‍💻 by {admin.firstName} {admin.lastName}</span>
        <AuthorLinks admin={admin} />
      </div>
    </footer>
  )
}
