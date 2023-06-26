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

  const [windowOuterHeight, setWindowOuterHeight] = useState(1000);
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
    setWindowOuterHeight(window.outerHeight);
    setWindowInnerWidth(window.innerWidth);
    setWebsiteContainer(document.getElementById('website-container'));

    const setWindowWidthAndHeight = () => {
      setWindowOuterHeight(window.outerHeight);
      setWindowInnerWidth(window.innerWidth);
    };

    // TODO: align the approach used here and in the AboutPage component.
    if (screen && screen.orientation) {
      screen.orientation.onchange =  () => {
        setWindowWidthAndHeight();
      };
    } else {
      window.onresize = () => {
        setWindowWidthAndHeight();
      };
    }

    return () => {
      // Deregister event handlers:
      if (screen && screen.orientation) {
        screen.orientation.onchange = null;
      }
      window.onresize = null;
    };
  }, []);

  useEffect(() => {
    const isWindowInnerWidthSmallerThan = (screenSizeName: string) => {
      return windowInnerWidth < getNumericValueOfTailwindBreakpointFor(screenSizeName, twConfig);
    };

    let websiteDisplayHeight;
    if (isWindowInnerWidthSmallerThan('md')) {
      websiteDisplayHeight = windowOuterHeight * 0.75;
    } else {
      websiteDisplayHeight = websiteContainer?.offsetWidth * COVER_IMAGE_ASPECT_RATIO;
    }

    setWebsiteContainerHeight(websiteDisplayHeight);
  }, [windowOuterHeight, windowInnerWidth, websiteContainer, twConfig, COVER_IMAGE_ASPECT_RATIO]);

  return <div id='website-container'
    style={{
      height: `${websiteContainerHeight}px`,
    }}>
    {
      websiteContainer &&
      <iframe src={src} className={'w-full h-full'} />
    }
  </div>;
}
