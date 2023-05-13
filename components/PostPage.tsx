import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import PostHeader from 'components/PostHeader'
import PostPageHead from 'components/PostPageHead'
import PostSection from 'components/PostSection'
import PostTitle from 'components/PostTitle'
import SectionSeparator from 'components/SectionSeparator'
import type { Post, Settings } from 'lib/sanity.queries'
import { notFound } from 'next/navigation'

import PostFootnotes from './PostFootnotes'

export interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: Post
  settings: Settings
}

export default function PostPage(props: PostPageProps) {
  const { preview, loading, post, settings } = props
  const { title } = settings

  const slug = post?.slug

  if (!slug && !preview) {
    notFound()
  }

  return (
    <>
      <PostPageHead settings={settings} post={post} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader title={title} level={2} />
          {preview && !post ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article>
                <PostHeader
                  title={post.title}
                  slug={post.slug}
                  coverImage={post.coverImage}
                  publishedAt={post.publishedAt}
                  author={post.author}
                />
                {
                  post.content.map((section, index) =>
                    <PostSection key={section._id} index={index} heading={section.heading} anchor={section.anchor}
                                 body={section.body} sectionImage={section.sectionImage}/>)
                }
                {post.footnotes && <PostFootnotes content={post.footnotes} />}
              </article>
            </>
          )}
        </Container>
      </Layout>
    </>
  )
}
