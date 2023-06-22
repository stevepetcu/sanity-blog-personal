import { PreviewSuspense } from '@sanity/preview-kit';
import {
  getLatestTags,
  getPostPinsList,
  getPostSummariesList,
  getSettings,
} from 'lib/sanity.client';
import { Post, PostPin, PostSummary, Settings } from 'lib/sanity.queries';
import { GetServerSideProps } from 'next';
import { lazy } from 'react';

import IndexPage from '../../components/IndexPage';

const PreviewIndexPage = lazy(() => import('components/PreviewIndexPage'));

interface PageProps {
  pins: PostPin[]
  summaries: PostSummary[]
  settings: Settings
  allPostTags: Post['tags']
  preview: boolean
  token: string | null
  tagsQuery: string[]
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export const PAGE_POSTS_PATH = '/posts';

export default function Page(props: PageProps) {
  const { pins, summaries, settings, allPostTags, preview, token, tagsQuery } =
    props;

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <IndexPage
            loading
            preview
            postPins={pins}
            postSummaries={summaries}
            allPostTags={allPostTags}
            settings={settings}
            tagsQuery={tagsQuery}
          />
        }
      >
        <PreviewIndexPage
          token={token}
          tagsQuery={tagsQuery}
          allPostTags={allPostTags}
        />
      </PreviewSuspense>
    );
  }

  return (
    <IndexPage
      postPins={pins}
      postSummaries={summaries}
      allPostTags={allPostTags}
      settings={settings}
      tagsQuery={tagsQuery}
    />
  );
}

export const getServerSideProps: GetServerSideProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, query } = ctx;

  const tagsQuery =
    typeof query.tag === undefined
      ? []
      : typeof query.tag === 'string'
        ? [query.tag]
        : Array.isArray(query.tag)
          ? query.tag
          : [];

  const [settings, summaries, allPostTags = []] = await Promise.all([
    getSettings(),
    getPostSummariesList(tagsQuery),
    getLatestTags(9, tagsQuery),
  ]);

  const pins = tagsQuery.length === 0 ? await getPostPinsList() : [];

  return {
    props: {
      pins,
      summaries,
      settings,
      allPostTags,
      preview,
      token: previewData.token ?? null,
      tagsQuery,
    },
  };
};
