import { ImageResponse } from '@vercel/og';
import { height, OpenGraphImage, width } from 'components/OpenGraphImage';
import { apiVersion, dataset, projectId } from 'lib/sanity.api';
import { Settings, settingsQuery } from 'lib/sanity.queries';
import type { NextRequest, NextResponse } from 'next/server';
import type { PageConfig } from 'next/types';
import { createClient } from 'next-sanity';

export const config: PageConfig = { runtime: 'edge' };

export default async function og(req: NextRequest, _res: NextResponse) {
  const font = fetch(new URL('public/Inter-Bold.woff', import.meta.url)).then(
    (res) => res.arrayBuffer()
  );
  const { searchParams } = new URL(req.url);

  // TODO: why would I want to get this from the query params? Maybe to dynamically generate this image?
  //  Also, should this not be in the sanity client?
  let title = searchParams.get('title');
  if (!title) {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    });
    const settings = (await client.fetch<Settings>(settingsQuery)) || {};
    title = settings?.ogImage?.title;
  }

  return new ImageResponse(<OpenGraphImage title={title} />, {
    width,
    height,
    fonts: [
      {
        name: 'Inter',
        data: await font,
        style: 'normal',
        weight: 700,
      },
    ],
  });
}
