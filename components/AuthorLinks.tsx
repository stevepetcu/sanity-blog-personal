import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {
  faFlaskVial,
  faIdBadge
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import Link from 'next/link'

import { Author } from '../lib/sanity.queries'
import { AuthorLinkedHandleWebsiteKeys } from '../schemas/author'
import styles from './AuthorLinks.module.css'

interface AuthorLinksProps {
  admin: Author
  placement: 'header' | 'footer'
  linkClassNames?: string
}

export default function AuthorLinks({ admin, placement, linkClassNames }: AuthorLinksProps) {
  const { firstName, lastName, handles } = admin
  const gitHubHandle = handles.find(handle => handle.website === AuthorLinkedHandleWebsiteKeys.GITHUB)
  const linkedInHandle = handles.find(handle => handle.website === AuthorLinkedHandleWebsiteKeys.LINKEDIN)
  const linkTransformOriginLeft = placement === 'footer' ? 'origin-bottom-left' : 'origin-top-right'
  const linkTransformOriginRight = placement === 'footer' ? 'origin-bottom-right' : 'origin-top-left'

  return (
    <>
      <Link href='#'
            className={cn(`group shrink ${styles.rotate9} hover:rotate-0 transition-all ease-in-out ${linkTransformOriginLeft} ${linkClassNames}`)}
            title={`${firstName}'s about page and resume`}
            aria-label={`${firstName}'s about page and resume`}>
        <FontAwesomeIcon
          icon={faIdBadge}
          className={cn('w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7')} />
      </Link>
      <Link href='#'
            className={cn(`shrink ml-5 -rotate-12 hover:rotate-0 transition-all ease-in-out ${linkTransformOriginRight} ${linkClassNames}`)}
            title={`${firstName}'s live code experiments`}
            aria-label={`${firstName}'s live code experiments`}>
        <FontAwesomeIcon
          icon={faFlaskVial}
          className={cn('w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7')} />
      </Link>
      {
        gitHubHandle &&
        (
          <Link href={`https://github.com/${gitHubHandle.name}`} target='_blank' rel='noopener'
                className={cn(`shrink ml-5 rotate-3 hover:rotate-0 transition-all ease-in-out ${linkTransformOriginLeft} ${linkClassNames}`)}
                title={`${firstName}'s GitHub account`}
                aria-label={`${firstName}'s GitHub account`}>
            <FontAwesomeIcon
              icon={faGithubSquare}
              className={cn('w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7')} />
          </Link>
        )
      }
      {
        linkedInHandle &&
        (
          <Link href={`https://linkedin.com/in/${linkedInHandle.name}`} target='_blank' rel='noopener'
                className={cn(`shrink ml-5 ${styles.rotateMinus9} hover:rotate-0 transition-all ease-in-out ${linkTransformOriginRight} ${linkClassNames}`)}
                title={`${firstName}'s LinkedIn account`}
                aria-label={`${firstName}'s LinkedIn account`}>
            <FontAwesomeIcon
              icon={faLinkedin}
              className={cn('w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7')} />
          </Link>
        )
      }
    </>
  )
}
