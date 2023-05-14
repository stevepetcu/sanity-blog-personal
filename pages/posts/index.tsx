import { PreviewSuspense } from '@sanity/preview-kit'
import IndexPage from 'components/IndexPage'
import {
  getPostPinsList,
  getPostSummariesList,
  getSettings
} from 'lib/sanity.client'
import { PostPin, PostSummary, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { lazy } from 'react'

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
  const { pins, summaries, settings, preview, token } = props

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <IndexPage loading preview postPins={pins} postSummaries={summaries} settings={settings} />
        }
      >
        <PreviewIndexPage token={token} />
      </PreviewSuspense>
    )
  }

  return <IndexPage postPins={pins} postSummaries={summaries} settings={settings} />
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
