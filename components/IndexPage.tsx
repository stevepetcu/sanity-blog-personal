import { ArrowLeftIcon } from '@sanity/icons'
import { Button } from '@sanity/ui'
import cn from 'classnames'
import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import PostPins from 'components/PostPins'
import type { PostPin, PostSummary, Settings } from 'lib/sanity.queries'
import Link from 'next/link'

import { POSTS_PAGE_PATH } from '../pages/posts'
import BlogFooter from './BlogFooter'
import PostSummaries from './PostSummaries'
import SectionSeparator from './SectionSeparator'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  postPins: PostPin[]
  postSummaries: PostSummary[]
  settings: Settings
  showPins: boolean // TODO: see how extracting pins affects this.
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, postPins, postSummaries, settings, showPins } = props
  const { title, description } = settings

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader title={title} description={description} level={1} />
          {showPins && postPins.length > 0 && <PostPins pins={postPins} />}
          {!showPins && (
            <Link href={`${POSTS_PAGE_PATH}`}
              className="inline-flex items-center">
              <ArrowLeftIcon className={cn('text-3xl')}/>
              <span>Back to all the posts</span>
            </Link>
          )}
          <SectionSeparator />
          {postSummaries.length > 0 && <PostSummaries summaries={postSummaries} />}
          <BlogFooter/>
        </Container>
      </Layout>
    </>
  )
}
