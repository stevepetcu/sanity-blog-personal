import PostSummaryComponent from 'components/PostSummary';
import type { PostSummary } from 'lib/sanity.queries';

export default function PostSummaries({
  summaries,
}: {
  summaries: PostSummary[]
}) {
  return (
    <section>
      {summaries.map((summary, index) => (
        <PostSummaryComponent
          key={summary._id}
          postSummary={summary}
          index={index}
        />
      ))}
    </section>
  );
}
