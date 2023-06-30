import { Card } from '@sanity/ui';
import cn from 'classnames';
import type { AboutIntroPhoto } from 'lib/sanity.queries';
import Image from 'next/image';

import { urlForImage } from '../../lib/sanity.image';

interface AboutIntroPhotoPreviewPaneProps {
  photo: AboutIntroPhoto['image']
}

export default function AboutIntroPhotoPreviewPane(props: AboutIntroPhotoPreviewPaneProps) {
  const { photo } = props;
  // TODO: finalise/fix this:
  return (
    <Card padding={6}>
      <div className={'grid grid-cols-1 place-items-center'}>
        <div>
          {photo.asset?._ref && (
            <Image
              src={urlForImage(photo).width(400).height(600).fit('crop').url()}
              className={cn('rounded')}
              width={400}
              height={600}
              alt={photo.alt}
              title={photo.alt}
            />
          )}
        </div>
        <div>
          <small>{photo.alt}</small>
        </div>
      </div>
    </Card>
  );
}
