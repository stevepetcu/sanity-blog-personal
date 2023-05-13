import IndexPage from 'components/IndexPage'
import { usePreview } from 'lib/sanity.preview'
import {
  type PostPin, postPinsListQuery, postSummariesListQuery, PostSummary,
  type Settings,
  settingsQuery
} from 'lib/sanity.queries'

export default function PreviewIndexPage({ token }: { token: null | string }) {
  const pins: PostPin[] = usePreview(token, postPinsListQuery) || []
  const summaries: PostSummary[] = usePreview(token, postSummariesListQuery) || []
  const settings: Settings = usePreview(token, settingsQuery) || {}

  return <IndexPage preview postPins={pins} postSummaries={summaries} settings={settings} />
}
