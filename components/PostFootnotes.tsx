import { PortableText } from '@portabletext/react';

import styles from './PostFootnotes.module.css';
import SectionSeparator from './SectionSeparator';

export default function PostFootnotes({ content }) {
  return (
    <section>
      <SectionSeparator />
      <div className={`mx-auto max-w-2xl ${styles.portableText}`}>
        <PortableText value={content} />
      </div>
    </section>
  );
}
