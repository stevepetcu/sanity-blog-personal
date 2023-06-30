import { GetStaticProps } from 'next';

import AboutPage from '../../components/AboutPage';
import { getAllAboutIntroPhotos, getSettings } from '../../lib/sanity.client';
import { AboutIntroPhoto, Settings } from '../../lib/sanity.queries';

export const PAGE_ABOUT_PATH = '/about';

interface PageProps {
  settings: Settings
  aboutIntroPhotos: AboutIntroPhoto[],
  preview: boolean
}

export default function Page(props: PageProps) {
  const { settings, aboutIntroPhotos, preview } = props;

  return <AboutPage settings={settings} aboutIntroPhotos={aboutIntroPhotos} preview={preview} />;
}

export const getStaticProps: GetStaticProps<PageProps>
  = async (ctx) => {
    const { preview = false } = ctx;

    const [settings, aboutIntroPhotos = []] = await Promise.all([
      getSettings(),
      getAllAboutIntroPhotos(),
    ]);

    return {
      props: {
        settings,
        aboutIntroPhotos,
        preview,
      },
    };
  };
