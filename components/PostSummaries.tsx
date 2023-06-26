import PostSummaryComponent from 'components/PostSummary';
import type { PostSummary } from 'lib/sanity.queries';

export default function PostSummaries({
  summaries,
}: {
  summaries: PostSummary[]
}) {
  return (
    <div>
      {summaries.map((summary, index) => (
        <PostSummaryComponent
          key={summary._id}
          postSummary={summary}
          index={index}
        />
      ))}
    </div>
  );
}
