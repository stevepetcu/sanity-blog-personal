import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

import { Settings } from '../lib/sanity.queries'
import { AuthorLinkedHandleWebsiteKeys } from '../schemas/author'
import SectionSeparator from './SectionSeparator'

export default function BlogFooter({ admin }: Pick<Settings, 'admin'>) {
  const gitHubHandle = admin.handles.find(handle => handle.website === AuthorLinkedHandleWebsiteKeys.GITHUB)
  const linkedInHandle = admin.handles.find(handle => handle.website === AuthorLinkedHandleWebsiteKeys.LINKEDIN)

  return (
    <footer>
      <SectionSeparator />
      <div className='mx-auto w-full max-w-screen-xl'>
        <div className='px-4 pb-5 flex sm:items-center sm:justify-between font-light'>
          <span className='text-slate-600 grow'>🧑‍💻 by {admin.firstName} {admin.lastName}</span>
            <Link href='#' className='text-slate-600 hover:text-slate-900 shrink ml-2.5'>About</Link>
            <Link href='#' className='text-slate-600 hover:text-slate-900 shrink ml-2.5'>CV</Link>
            {
              gitHubHandle &&
              (
                <Link href={`https://github.com/${gitHubHandle.name}`} target='_blank'
                      className='text-slate-600 hover:text-slate-900 shrink ml-2.5'>
                  <FontAwesomeIcon
                    icon={faGithubSquare}
                    aria-label={`${admin.firstName}'s GitHub account`}
                    className={'w-7 h-7'}/>
                </Link>
              )
            }
            {
              linkedInHandle &&
              (
                <Link href={`https://linkedin.com/in/${linkedInHandle.name}`} target='_blank'
                      className='text-slate-600 hover:text-slate-900 shrink ml-2.5'>
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    aria-label={`${admin.firstName}'s LinkedIn account`}
                    className={'w-7 h-7'}/>
                </Link>
              )
            }
          </div>
        </div>
      {/*</div>*/}
    </footer>
  )
}
