interface SectionSeparatorProps {
  classNames?: string
}

export default function SectionSeparator({
  classNames,
}: SectionSeparatorProps) {
  return <hr className={'mb-16 mt-8 border-accent-2 ' + classNames} />;
}
