import cn from 'classnames'
import { format, parseISO } from 'date-fns'

export default function PostDate({ dateString }: { dateString: string }) {
  if (!dateString) return null

  const date = parseISO(dateString)
  return <time dateTime={dateString} className={cn('text-xs sm:text-sm lg:text-base font-light')}>{format(date, 'd LLL, yyyy')}</time>
}
