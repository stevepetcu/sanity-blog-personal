import PostSummaryComponent from 'components/PostSummary';
import type { PostSummary } from 'lib/sanity.queries';

export default function PostSummaries({
  summaries,
}: {
  summaries: PostSummary[]
}) {
  return (
    <section>
      <div className="mb-32 grid grid-cols-1 gap-y-16 md:gap-x-16 md:gap-y-24 lg:gap-x-32">
        {summaries.map((summary, index) => (
          <PostSummaryComponent
            key={summary._id}
            postSummary={summary}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
