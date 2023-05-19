import cn from 'classnames'
import PostSummaryComponent from 'components/PostSummary'
import type { PostSummary } from 'lib/sanity.queries'

export default function PostSummaries({ summaries }: { summaries: PostSummary[] }) {
  return (
    <section>
      <div className='mb-32 grid grid-cols-1 gap-y-16 md:gap-x-16 md:gap-y-24 lg:gap-x-32'>
        {summaries.map((summary, index) => (
          <PostSummaryComponent
            index={index}
            key={summary._id}
            title={summary.title}
            slug={summary.slug}
            summary={summary.summary}
            coverImage={summary.coverImage}
            tags={summary.tags}
            author={summary.author}
            publishedAt={summary.publishedAt}
          />
        ))}
      </div>
    </section>
  )
}
