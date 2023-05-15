import { PreviewSuspense } from '@sanity/preview-kit'
import IndexPage from 'components/IndexPage'
import {
  getPostPinsList,
  getPostSummariesList,
  getSettings
} from 'lib/sanity.client'
import { PostPin, PostSummary, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { useSearchParams } from 'next/navigation'
import { lazy, useEffect, useState } from 'react'

const PreviewIndexPage = lazy(() => import('components/PreviewIndexPage'))

interface PageProps {
  pins: PostPin[]
  summaries: PostSummary[]
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

export default function Page(props: PageProps) {
  // TODO: separate the post pins rendering as a static component
  //  See how to make the Post Summaries List static when no tag query parameters are there – and
  //  dynamic, when there are query parameters.
  //  See https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering
  const { pins, summaries, settings, preview, token } = props

  const queryParams = useSearchParams();
  const tag = queryParams.get('tag');

  const [taggedSummaries, setTaggedSummaries] = useState<PostSummary[]>([])

  useEffect(() => {
    console.log('Tag: ', tag);
    const setTaggedSummariesAsync = async () => {
      setTaggedSummaries(await getPostSummariesList(tag)); // TODO: error handling?
    }

    if (tag) {
      setTaggedSummariesAsync(); // TODO: error handling?
    }
  }, [tag])

  if (preview) {
    return tag ?
      (
        <PreviewSuspense
          fallback={
            <IndexPage loading preview postPins={pins} postSummaries={taggedSummaries} settings={settings} showPins={true} />
          }
        >
          <PreviewIndexPage token={token} />
        </PreviewSuspense>
      ) :
      (
      <PreviewSuspense
        fallback={
          <IndexPage loading preview postPins={pins} postSummaries={summaries} settings={settings} showPins={false} />
        }
      >
        <PreviewIndexPage token={token} />
      </PreviewSuspense>
    )
  }

  return tag?
    (
      <PreviewSuspense
        fallback={
          <IndexPage loading preview postPins={pins} postSummaries={summaries} settings={settings} showPins={true} />
        }
      >
        <IndexPage loading preview postPins={pins} postSummaries={taggedSummaries} settings={settings} showPins={false} />
      </PreviewSuspense>
    ) :
    <IndexPage postPins={pins} postSummaries={summaries} settings={settings} showPins={true} />
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx

  const [settings, pins = [], summaries = []] = await Promise.all([
    getSettings(),
    getPostPinsList(),
    getPostSummariesList()
  ])

  return {
    props: {
      pins,
      summaries,
      settings,
      preview,
      token: previewData.token ?? null
    }
  }
}
