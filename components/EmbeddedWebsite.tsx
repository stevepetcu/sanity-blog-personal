import { useEffect, useState } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../tailwind.config.js';
interface EmbeddedWebsiteProps {
  src: string;
}

export default function EmbeddedWebsite({
  src,
}: EmbeddedWebsiteProps) {
  const COVER_IMAGE_ASPECT_RATIO = 720/1280;

  const [windowInnerHeight, setWindowInnerHeight] = useState(1000);
  const [windowInnerWidth, setWindowInnerWidth] = useState(1000);
  const [websiteContainer, setWebsiteContainer] = useState<HTMLElement>();
  const [websiteContainerHeight, setWebsiteContainerHeight] = useState(500);

  const twConfig = resolveConfig(tailwindConfig);
  const getNumericValueOfTailwindBreakpointFor = (screenSizeName: string, twConfig): number => {
    const twSmallScreenWidthBreakpointAsString = twConfig.theme.container.screens[screenSizeName] || '728px';
    return twSmallScreenWidthBreakpointAsString.slice(
      0,
      twSmallScreenWidthBreakpointAsString.indexOf('px')
    );
  };

  useEffect(() => {
    setWindowInnerHeight(window.innerHeight);
    setWindowInnerWidth(window.innerWidth);
    setWebsiteContainer(document.getElementById('website-container'));

    window.onresize = () => {
      setWindowInnerHeight(window.innerHeight);
      setWindowInnerWidth(window.innerWidth);
    };
  }, []);

  useEffect(() => {
    const websiteDisplayHeight = windowInnerWidth <=
    getNumericValueOfTailwindBreakpointFor('sm', twConfig) ?
      windowInnerHeight :
      windowInnerWidth <= getNumericValueOfTailwindBreakpointFor('lg', twConfig) ?
        2*(windowInnerHeight/3) :
        websiteContainer ?
          websiteContainer.offsetWidth * COVER_IMAGE_ASPECT_RATIO :
          windowInnerHeight/3;

    setWebsiteContainerHeight(websiteDisplayHeight);
  }, [windowInnerHeight, windowInnerWidth, websiteContainer, twConfig, COVER_IMAGE_ASPECT_RATIO]);

  return <div id='website-container'
    style={{
      height: `${websiteContainerHeight}px`,
    }}>
    <iframe src={src} className={'w-full h-full'} />
  </div>;
}
