import { PreviewSuspense } from '@sanity/preview-kit'
import PostPage from 'components/PostPage'
import {
  getAllPostsSlugs, getPostBySlug,
  getSettings
} from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { lazy } from 'react'

const PreviewPostPage = lazy(() => import('components/PreviewPostPage'))

interface PageProps {
  post: Post
  settings?: Settings
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
  const { settings, post, preview, token } = props

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <PostPage
            loading
            preview
            post={post}
            settings={settings}
          />
        }
      >
        <PreviewPostPage
          token={token}
          post={post}
          settings={settings}
        />
      </PreviewSuspense>
    )
  }

  return <PostPage post={post} settings={settings} />
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx

  const token = previewData.token

  const [settings, post] = await Promise.all([
    getSettings(),
    getPostBySlug(params.slug)
  ])

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post,
      settings,
      preview,
      token: previewData.token ?? null
    }
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllPostsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/posts/${slug}`) || [],
    fallback: 'blocking'
  }
}
