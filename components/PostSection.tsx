import { CheckmarkIcon, LinkIcon } from '@sanity/icons';
import cn from 'classnames';
import { useState } from 'react';

import { PostSection } from '../lib/sanity.queries';
import BlogImage from './BlogImage';
import styles from './PostSection.module.css';
import SanePortableText from './SanePortableText';

interface PostSectionInterface {
  postSection: Omit<PostSection, '_key'>
  index: number
}

export default function PostSection({
  postSection,
  index,
}: PostSectionInterface) {
  const { sectionImage, body, heading, anchor } = postSection;

  const [isLinkToHeadingCopied, setIsLinkToHeadingCopied] = useState(false);

  const copyLinkToHeading = async (anchor: string) => {
    // We could generate the location statically, but we'd need to mess
    // with environment variables. Given the website domain has a few
    // aliases, we'll go with using the window object for now, since
    // this function only runs client-side anyway.
    const location = window?.location?.origin + window?.location?.pathname;

    try {
      await navigator.clipboard.writeText(`${location}#${anchor}`);
      setIsLinkToHeadingCopied(true);
      setTimeout(() => {
        setIsLinkToHeadingCopied(false);
      }, 1000);
    } catch (e) {
      console.error(
        `Failed to copy the anchor link to clipboard; ${e.message}.`
      );
    }
  };

  const imagePlacement = sectionImage
    ? sectionImage.placement || 'none'
    : 'none';
  const sectionHeading = (
    <>
      {heading && (
        <h2
          onClick={() => copyLinkToHeading(anchor.current)}
          id={anchor.current}
          className={cn('group')}
        >
          {!isLinkToHeadingCopied && (
            <LinkIcon className={cn(styles.sectionHeadingAnchorCopyIcon)} />
          )}
          {isLinkToHeadingCopied && (
            <CheckmarkIcon
              className={cn(`${styles.sectionHeadingAnchorCopyIcon}`)}
            />
          )}
          {heading}
        </h2>
      )}
    </>
  );
  const sectionBody = (
    <div className={styles.sectionBody}>
      <SanePortableText content={body} />
    </div>
  );

  switch (imagePlacement) {
  // TODO: extract these 'top' and 'bottom' values as constants.
  case 'top':
    return (
      <section className={cn(`mx-auto max-w-2xl ${styles.portableText}`)}>
        {sectionHeading}
        <BlogImage
          title={sectionImage.alt}
          image={sectionImage}
          width={480}
          height={270}
          priority={index <= 1}
        />
        {sectionBody}
      </section>
    );
  case 'bottom':
    return (
      <section className={cn(`mx-auto max-w-2xl ${styles.portableText}`)}>
        {sectionHeading}
        {sectionBody}
        <BlogImage
          title={sectionImage.alt}
          image={sectionImage}
          width={480}
          height={270}
          priority={index <= 1}
        />
      </section>
    );
  default:
    return (
      <section className={cn(`mx-auto max-w-2xl ${styles.portableText}`)}>
        {sectionHeading}
        {sectionBody}
      </section>
    );
  }
}
