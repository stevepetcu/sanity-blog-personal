import { PreviewSuspense } from '@sanity/preview-kit';
import PostPage from 'components/PostPage';
import { getAllPostSlugs, getPostBySlug, getSettings } from 'lib/sanity.client';
import { Post, Settings } from 'lib/sanity.queries';
import { GetStaticProps } from 'next';
import { lazy } from 'react';

import { PAGE_POSTS_PATH } from './index';

const PreviewPostPage = lazy(() => import('components/PreviewPostPage'));

interface PageProps {
  post: Post
  settings: Settings
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, post, preview, token } = props;

  if (preview) {
    return (
      <PreviewSuspense
        fallback={<PostPage loading preview post={post} settings={settings} />}
      >
        <PreviewPostPage token={token} post={post} settings={settings} />
      </PreviewSuspense>
    );
  }

  return <PostPage post={post} settings={settings} />;
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx;

  // TODO: I think we need to pass this token into the `getPostBySlug` fn, for previews.
  //  Check Git history to see how it was used before.
  const token = previewData.token ?? null;

  const [settings, post] = await Promise.all([
    getSettings(),
    getPostBySlug(params.slug),
  ]);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      settings,
      preview,
      token,
    },
  };
};

export const getStaticPaths = async () => {
  const slugs = await getAllPostSlugs();

  return {
    paths: slugs?.map(({ slug }) => `${PAGE_POSTS_PATH}/${slug}`) || [],
    fallback: 'blocking',
  };
};
