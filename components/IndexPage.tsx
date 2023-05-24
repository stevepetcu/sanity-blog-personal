import { ArrowLeftIcon } from '@sanity/icons';
import cn from 'classnames';
import Container from 'components/BlogContainer';
import BlogHeader from 'components/BlogHeader';
import Layout from 'components/BlogLayout';
import IndexPageHead from 'components/IndexPageHead';
import PostPins from 'components/PostPins';
import type { PostPin, PostSummary, Settings } from 'lib/sanity.queries';
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
  allPostTags: string[]
  settings: Settings
  showPins: boolean
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, postPins, postSummaries, allPostTags, settings, showPins } =
    props;
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
          {showPins && postPins.length > 0 && <PostPins pins={postPins} />}
          {!showPins && (
            <Link
              href={`${POSTS_PAGE_PATH}`}
              className="inline-flex items-center"
            >
              <ArrowLeftIcon className={cn('text-3xl')} />
              <span>Back to all the posts</span>
            </Link>
          )}
          <SectionSeparator classNames={'mb-5'}/>
          <div className={cn('grid grid-cols-1 lg:grid-cols-10 gap-x-10 mb-14 order-last lg:order-first')}>
            <div className={'col-span-1 lg:col-span-6'}>
              {postSummaries.length > 0 && (
                <PostSummaries summaries={postSummaries} />
              )}
            </div>
            <div className={'col-span-1 lg:col-span-4 order-first lg:order-last'}>
              <IndexAside tags={allPostTags} admin={admin} />
            </div>
          </div>
          <BlogFooter admin={settings.admin} classNames={'flex lg:hidden'} />
        </Container>
      </Layout>
    </>
  );
}
