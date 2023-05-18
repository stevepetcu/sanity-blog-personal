import cn from 'classnames'

interface SectionSeparatorProps {
  mt?: string
  mb?: string
}

export default function SectionSeparator({mt, mb}: SectionSeparatorProps) {
  return <hr className={cn(`${mt || 'mt-8'} ${mb || 'mb-16'} border-accent-2`)} />
}
