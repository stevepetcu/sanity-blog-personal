import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faFileCode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import Link from 'next/link'

import { Settings } from '../lib/sanity.queries'
import { AuthorLinkedHandleWebsiteKeys } from '../schemas/author'

export default function AuthorLinks({ admin, linkClassNames, placement }: Pick<Settings, 'admin'> & { linkClassNames?: string, placement: 'header' | 'footer' }) {
  const gitHubHandle = admin.handles.find(handle => handle.website === AuthorLinkedHandleWebsiteKeys.GITHUB)
  const linkedInHandle = admin.handles.find(handle => handle.website === AuthorLinkedHandleWebsiteKeys.LINKEDIN)

  return (
    <>
      <Link href='#' className={cn(`shrink ml-2.5 sm:ml-3.5 md:ml-5 ${linkClassNames}`)}>About</Link>
      <Link href='#' className={cn(`group shrink ml-2.5 sm:ml-3.5 md:ml-5 ${linkClassNames}`)}
            title={`${admin.firstName}'s resume`}>
        <FontAwesomeIcon
          icon={faFileCode}
          aria-label={`${admin.firstName}'s resume`}
          className={cn('w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 -rotate-12 hover:rotate-0 transition-all ease-in-out', {'origin-bottom-left': placement === 'header', 'origin-top-right': placement === 'footer'})} />
        </Link>
      {
        gitHubHandle &&
        (
          <Link href={`https://github.com/${gitHubHandle.name}`} target='_blank' rel='noopener'
                className={cn(`shrink ml-2.5 sm:ml-3.5 md:ml-5 ${linkClassNames}`)}
                title={`${admin.firstName}'s GitHub account`}>
            <FontAwesomeIcon
              icon={faGithubSquare}
              aria-label={`${admin.firstName}'s GitHub account`}
              className={cn('w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rotate-3 hover:rotate-0 transition-all ease-in-out', {'origin-bottom-right': placement === 'header', 'origin-top-left': placement === 'footer'})} />
          </Link>
        )
      }
      {
        linkedInHandle &&
        (
          <Link href={`https://linkedin.com/in/${linkedInHandle.name}`} target='_blank' rel='noopener'
                className={cn(`shrink ml-2.5 sm:ml-3.5 md:ml-5 ${linkClassNames}`)}
                title={`${admin.firstName}'s LinkedIn account`}>
            <FontAwesomeIcon
              icon={faLinkedin}
              aria-label={`${admin.firstName}'s LinkedIn account`}
              className={cn('w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 -rotate-6 hover:rotate-0 transition-all ease-in-out', {'origin-bottom-left': placement === 'header', 'origin-top-right': placement === 'footer'})} />
          </Link>
        )
      }
    </>
  )
}
