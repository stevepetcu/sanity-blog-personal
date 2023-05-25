import { usePreview } from 'lib/sanity.preview';
import {
  Post,
  type PostPin,
  postPinsListQuery,
  postSummariesListQuery,
  PostSummary,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries';

import IndexPage from './IndexPage';

export default function PreviewIndexPage({
  token,
  tagsQuery,
  allPostTags,
}: {
  token: null | string
  tagsQuery: string[]
  allPostTags: Post['tags']
}) {
  const pins: PostPin[] = usePreview(token, postPinsListQuery) || [];
  const summaries: PostSummary[] =
    usePreview(token, postSummariesListQuery) || [];
  const settings: Settings = usePreview(token, settingsQuery) || {};

  return (
    <IndexPage
      preview
      postPins={pins}
      postSummaries={summaries}
      settings={settings}
      tagsQuery={tagsQuery}
      allPostTags={allPostTags}
    />
  );
}
