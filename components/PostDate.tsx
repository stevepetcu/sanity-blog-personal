import cn from 'classnames';
import { format, parseISO } from 'date-fns';

export default function PostDate({
  dateString,
  classNames,
}: {
  dateString: string
  classNames?: string
}) {
  if (!dateString) return null;

  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className={cn(classNames || '')}>
      {format(date, 'd LLL, yyyy')}
    </time>
  );
}
