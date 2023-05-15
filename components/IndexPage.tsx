import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import PostPins from 'components/PostPins'
import type { PostPin, PostSummary, Settings } from 'lib/sanity.queries'

import PostSummaries from './PostSummaries'

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
          {/* TODO: extract post pins so that they can be rendered statically */}
          {showPins && postPins.length > 0 && <PostPins pins={postPins} />}
          {postSummaries.length > 0 && <PostSummaries summaries={postSummaries} />}
        </Container>
      </Layout>
    </>
  )
}
