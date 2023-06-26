import { GetServerSideProps } from 'next';

import AboutPage from '../../components/AboutPage';
import { getSettings } from '../../lib/sanity.client';
import { Settings } from '../../lib/sanity.queries';

export const PAGE_ABOUT_PATH = '/about';

interface PageProps {
  settings: Settings
  preview: boolean
}

export default function Page(props: PageProps) {
  const { settings, preview } = props;

  return <AboutPage settings={settings} preview={preview} />;
}

export const getServerSideProps: GetServerSideProps<PageProps>
  = async (ctx) => {
    const { preview = false } = ctx;

    const settings = await getSettings();

    return {
      props: {
        settings,
        preview,
      },
    };
  };
