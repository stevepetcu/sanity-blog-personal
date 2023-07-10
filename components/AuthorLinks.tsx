import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFlaskVial, faIdBadge, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import Link from 'next/link';

import { Author } from '../lib/sanity.queries';
import { AuthorLinkedHandleWebsiteKeys } from '../schemas/author';
import { PAGE_POSTS_PATH } from '../pages/posts';
import { PAGE_ABOUT_PATH } from '../pages/about';

export interface AuthorLinksProps {
  admin: Author
  placement: 'header' | 'footer'
  linkClassNames?: string
  activeLink?: 'posts' | 'about' | 'experiments'
}

export default function AuthorLinks({
  admin,
  placement,
  linkClassNames,
  activeLink,
}: AuthorLinksProps) {
  const { firstName, handles } = admin;
  const gitHubHandle = handles.find(
    (handle) => handle.website === AuthorLinkedHandleWebsiteKeys.GITHUB
  );
  const linkedInHandle = handles.find(
    (handle) => handle.website === AuthorLinkedHandleWebsiteKeys.LINKEDIN
  );

  return (
    <>
      <Link
        href={PAGE_POSTS_PATH}
        className={cn(
          `shrink ${linkClassNames || ''} leading-none`,
          {
            'text-slate-600 hover:text-slate-900': activeLink !== 'posts',
            'text-sky-500': activeLink === 'posts',
          }
        )}
        title={'All blog posts'}
        aria-label={'All blog posts'}
      >
        <div className={'flex flex-col items-center space-y-1'}>
          <div>
            <FontAwesomeIcon
              icon={faNewspaper}
              className={cn('h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7')}
            />
          </div>
          <div className={cn({
            'hidden': placement === 'header',
            'sm:block': placement === 'header',
          })}>
            <p className={'text-xs'}>Posts</p>
          </div>
        </div>
      </Link>
      <Link
        href={PAGE_ABOUT_PATH}
        className={cn(
          `shrink ${linkClassNames || ''} leading-none`,
          {
            'text-slate-600 hover:text-slate-900': activeLink !== 'about',
            'text-sky-500': activeLink === 'about',
          }
        )}
        title={`${firstName}'s about page and CV`}
        aria-label={`${firstName}'s about page and CV`}
      >
        <div className={'flex flex-col items-center space-y-1'}>
          <div>
            <FontAwesomeIcon
              icon={faIdBadge}
              className={cn('h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7')}
            />
          </div>
          <div className={cn({
            'hidden': placement === 'header',
            'sm:block': placement === 'header',
          })}>
            <p className={'text-xs'}>About</p>
          </div>
        </div>
      </Link>
      <Link
        href={`${PAGE_POSTS_PATH}?tag=experiment&tag=showcase`}
        className={cn(
          `shrink ${linkClassNames || ''} leading-none`,
          {
            'text-slate-600 hover:text-slate-900': activeLink !== 'experiments',
            'text-sky-500': activeLink === 'experiments',
          }
        )}
        title={`${firstName}'s live code experiments`}
        aria-label={`${firstName}'s live code experiments`}
      >
        <div className={'flex flex-col items-center space-y-1'}>
          <div>
            <FontAwesomeIcon
              icon={faFlaskVial}
              className={cn('h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7')}
            />
          </div>
          <div className={cn({
            'hidden': placement === 'header',
            'sm:block': placement === 'header',
          })}>
            <p className={'text-xs'}>Expts</p>
          </div>
        </div>
      </Link>
      {gitHubHandle && (
        <Link
          href={`https://github.com/${gitHubHandle.name}`}
          target="_blank"
          rel="noopener"
          className={cn(
            `text-slate-600 hover:text-slate-900 shrink ${linkClassNames || ''} leading-none`
          )}
          title={`${firstName}'s GitHub account`}
          aria-label={`${firstName}'s GitHub account`}
        >
          <div className={'flex flex-col items-center space-y-1'}>
            <div>
              <FontAwesomeIcon
                icon={faGithubSquare}
                className={cn('h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7')}
              />
            </div>
            <div className={cn({
              'hidden': placement === 'header',
              'sm:block': placement === 'header',
            })}>
              <p className={'text-xs'}>GitHub</p>
            </div>
          </div>
        </Link>
      )}
      {linkedInHandle && (
        <Link
          href={`https://linkedin.com/in/${linkedInHandle.name}`}
          target="_blank"
          rel="noopener"
          className={cn(
            `text-slate-600 hover:text-slate-900 shrink ${linkClassNames || ''} leading-none`
          )}
          title={`${firstName}'s LinkedIn account`}
          aria-label={`${firstName}'s LinkedIn account`}
        >
          <div className={'flex flex-col items-center space-y-1'}>
            <div>
              <FontAwesomeIcon
                icon={faLinkedin}
                className={cn('h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7')}
              />
            </div>
            <div className={cn({
              'hidden': placement === 'header',
              'sm:block': placement === 'header',
            })}>
              <p className={'text-xs'}>LinkedIn</p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
