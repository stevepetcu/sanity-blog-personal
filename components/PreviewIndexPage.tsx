import { usePreview } from 'lib/sanity.preview';
import {
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
  showPins,
}: {
  token: null | string
  showPins: boolean
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
      showPins={showPins}
    />
  );
}
