interface SectionSeparatorProps {
  classNames?: string
}

export default function SectionSeparator({ classNames }: SectionSeparatorProps) {
  return (
    <hr className={'mt-8 mb-16 border-accent-2 ' + classNames} />
  );
}
