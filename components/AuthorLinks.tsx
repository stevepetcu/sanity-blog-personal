import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFlaskVial, faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import Link from 'next/link';

import { Author } from '../lib/sanity.queries';
import { AuthorLinkedHandleWebsiteKeys } from '../schemas/author';
import styles from './AuthorLinks.module.css';
import { POSTS_PAGE_PATH } from '../pages/posts';

interface AuthorLinksProps {
  admin: Author
  placement: 'header' | 'footer'
  linkClassNames?: string
}

export default function AuthorLinks({
  admin,
  placement,
  linkClassNames,
}: AuthorLinksProps) {
  const { firstName, handles } = admin;
  const gitHubHandle = handles.find(
    (handle) => handle.website === AuthorLinkedHandleWebsiteKeys.GITHUB
  );
  const linkedInHandle = handles.find(
    (handle) => handle.website === AuthorLinkedHandleWebsiteKeys.LINKEDIN
  );
  const linkTransformOriginLeft =
    placement === 'footer' ? 'origin-bottom-left' : 'origin-top-right';
  const linkTransformOriginRight =
    placement === 'footer' ? 'origin-bottom-right' : 'origin-top-left';

  return (
    <>
      <Link
        href="#"
        className={cn(
          `group shrink ${
            styles.rotate9
          } transition-all ease-in-out hover:rotate-0 ${linkTransformOriginLeft} ${
            linkClassNames || ''
          }`
        )}
        title={`${firstName}'s about page and resume`}
        aria-label={`${firstName}'s about page and resume`}
      >
        <FontAwesomeIcon
          icon={faIdBadge}
          className={cn('h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7')}
        />
      </Link>
      <Link
        href={`${POSTS_PAGE_PATH}?tag=experiment&tag=showcase`}
        className={cn(
          `ml-5 shrink -rotate-12 transition-all ease-in-out hover:rotate-0 ${linkTransformOriginRight} ${linkClassNames}`
        )}
        title={`${firstName}'s live code experiments`}
        aria-label={`${firstName}'s live code experiments`}
      >
        <FontAwesomeIcon
          icon={faFlaskVial}
          className={cn('h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7')}
        />
      </Link>
      {gitHubHandle && (
        <Link
          href={`https://github.com/${gitHubHandle.name}`}
          target="_blank"
          rel="noopener"
          className={cn(
            `ml-5 shrink rotate-3 transition-all ease-in-out hover:rotate-0 ${linkTransformOriginLeft} ${linkClassNames}`
          )}
          title={`${firstName}'s GitHub account`}
          aria-label={`${firstName}'s GitHub account`}
        >
          <FontAwesomeIcon
            icon={faGithubSquare}
            className={cn('h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7')}
          />
        </Link>
      )}
      {linkedInHandle && (
        <Link
          href={`https://linkedin.com/in/${linkedInHandle.name}`}
          target="_blank"
          rel="noopener"
          className={cn(
            `ml-5 shrink ${styles.rotateMinus9} transition-all ease-in-out hover:rotate-0 ${linkTransformOriginRight} ${linkClassNames}`
          )}
          title={`${firstName}'s LinkedIn account`}
          aria-label={`${firstName}'s LinkedIn account`}
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className={cn('h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7')}
          />
        </Link>
      )}
    </>
  );
}
