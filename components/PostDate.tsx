import cn from 'classnames';
import { format, getYear, parseISO } from 'date-fns';

export default function PostDate({
  dateString,
  classNames,
}: {
  dateString: string
  classNames?: string
}) {
  if (!dateString) return null;

  const date = parseISO(dateString);
  const formattedDate =
    date.getFullYear() === getYear(Date.now())
      ? format(date, 'd LLL')
      : format(date, 'd LLL, `yy');
  return (
    <time dateTime={dateString} className={cn(classNames || '')}>
      {formattedDate}
    </time>
  );
}
