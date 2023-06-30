import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

interface IconHrProps {
  icon: IconDefinition;
  iconWidth: number;
  iconHeight: number;
  iconClassNames?: string;
  hrClassNames?: string;
}

export function IconHr(props: IconHrProps) {
  return (
    <div className={'flex w-full items-center space-x-2.5 px-8'}>
      <div className={'flex-grow text-right'}>
        <hr
          className={`my-1 h-1 w-28 rounded border-0 bg-slate-200 inline-block ${props.hrClassNames}`}
        />
      </div>
      <div className={'text-center'}>
        <FontAwesomeIcon
          icon={props.icon}
          width={props.iconWidth}
          height={props.iconHeight}
          className={cn(`my-2 text-slate-300 ${props.iconClassNames || ''}`)}
        />
      </div>
      <div className={'flex-grow text-left'}>
        <hr
          className={`my-1 h-1 w-28 rounded border-0 bg-slate-200 inline-block ${props.hrClassNames || ''}`}
        />
      </div>
    </div>
  );
}
