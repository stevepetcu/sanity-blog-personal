import { faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowLeftIcon } from '@sanity/icons';
import cn from 'classnames';
import Container from 'components/BlogContainer';
import BlogHeader from 'components/BlogHeader';
import Layout from 'components/BlogLayout';
import IndexPageHead from 'components/IndexPageHead';
import PostPins from 'components/PostPins';
import type { PostPin, PostSummary, Settings } from 'lib/sanity.queries';
import { Post } from 'lib/sanity.queries';
import Link from 'next/link';

import { POSTS_PAGE_PATH } from '../pages/posts';
import BlogFooter from './BlogFooter';
import IndexAside from './IndexAside';
import PostSummaries from './PostSummaries';
import SectionSeparator from './SectionSeparator';

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  postPins: PostPin[]
  postSummaries: PostSummary[]
  allPostTags: Post['tags']
  settings: Settings
  tagsQuery: string[]
}

export default function IndexPage(props: IndexPageProps) {
  const {
    preview,
    loading,
    postPins,
    postSummaries,
    allPostTags,
    settings,
    tagsQuery,
  } = props;
  const { title, description, admin } = settings;

  return (
    <>
      <IndexPageHead settings={settings} />
      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader
            title={title}
            description={description}
            admin={admin}
            level={1}
          />
          {tagsQuery.length === 0 && postPins.length > 0 && (
            <PostPins pins={postPins} />
          )}
          {tagsQuery.length > 0 && (
            <>
              <Link
                href={`${POSTS_PAGE_PATH}`}
                className="inline-flex items-center text-sm"
              >
                <ArrowLeftIcon className={cn('text-xl')} />
                <span>Back to all the posts</span>
              </Link>
              <div className={'mt-5 flex items-center'}>
                <FontAwesomeIcon
                  icon={faTags}
                  className={cn('mr-2 h-5 w-5 rounded-full bg-slate-200 p-1.5')}
                />
                <h2
                  className={cn(
                    'ml-0.5 text-2xl font-medium leading-snug text-slate-800 sm:text-3xl'
                  )}
                >
                  <span className={'capitalize'}>{tagsQuery.join(', ')}</span>{' '}
                  posts
                </h2>
              </div>
            </>
          )}
          <SectionSeparator classNames={'mb-5'} />
          <div
            className={cn(
              'order-last mb-14 grid grid-cols-1 gap-x-10 lg:order-first lg:grid-cols-10'
            )}
          >
            <div className={'col-span-1 lg:col-span-6'}>
              {postSummaries.length > 0 && (
                <PostSummaries summaries={postSummaries} />
              )}
            </div>
            <div
              className={'order-first col-span-1 lg:order-last lg:col-span-4'}
            >
              <IndexAside
                tags={allPostTags.filter(
                  (tag) => !tagsQuery.includes(tag as unknown as string)
                )}
                admin={admin}
              />
            </div>
          </div>
          <BlogFooter admin={settings.admin} classNames={'flex lg:hidden'} />
        </Container>
      </Layout>
    </>
  );
}
