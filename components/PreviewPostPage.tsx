import PostPage, { PostPageProps } from 'components/PostPage'
import { usePreview } from 'lib/sanity.preview'
import { type Post, postSummariesListQuery } from 'lib/sanity.queries'

export default function PreviewPostPage({
  token,
  post,
  settings,
}: {
  token: null | string
} & PostPageProps) {
  const { post: postPreview, morePosts }: { post: Post; morePosts: Post[] } =
    usePreview(token, postSummariesListQuery, {
      slug: post.slug,
    }) || { post: null, morePosts: [] }

  return (
    <PostPage
      preview
      post={postPreview}
      morePosts={morePosts}
      settings={settings}
    />
  )
}
