import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faPencil,
  faRulerHorizontal,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Author, Post } from '../lib/sanity.queries';
import { AuthorLinksProps } from './AuthorLinks';
import BlogFooter from './BlogFooter';
import TagList from './TagList';

interface IndexAsideProps {
  tags: Post['tags']
  admin: Author
  activeLink: AuthorLinksProps['activeLink']
}
export default function IndexAside({ tags, admin, activeLink }: IndexAsideProps) {
  const [offsetTop, setOffsetTop] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(0);

  const [offsetLeft, setOffsetLeft] = useState(0);
  const [offsetWidth, setOffsetWidth] = useState(0);

  const [isBounce, setIsBounce] = useState(false);

  useEffect(() => {
    const searchTopicsContainer = document.getElementById('search-topics-container');

    setOffsetTop(searchTopicsContainer.offsetTop);
    setOffsetHeight(searchTopicsContainer.offsetHeight);

    setOffsetLeft(searchTopicsContainer.offsetLeft);
    setOffsetWidth(searchTopicsContainer.offsetWidth);

    searchTopicsContainer.onmouseenter = () => {
      setIsBounce(true);
    };
    searchTopicsContainer.onmouseleave = () => {
      setIsBounce(false);
    };

    return () => {
      searchTopicsContainer.onmouseenter = null;
      searchTopicsContainer.onmouseleave = null;
    };
  }, []);

  return (
    <aside className={'static top-0 pt-0 md:pt-7 lg:sticky'}>
      <h2 className={cn('text-md mb-5 font-medium leading-snug')}>
        More topics you can explore
      </h2>
      <div className={cn('mb-8 flex flex-wrap gap-x-2 gap-y-4')}>
        <TagList tags={tags} />
      </div>
      <div id={'search-topics-container'}
        className={'border-x pt-1 -mt-1 w-fit pb-5 -mb-5 relative'}>
        <div className={'absolute -left-[1.65rem] top-4 rotate-90'}>
          <p className={'font-inspect'}>
              l: {offsetLeft}px
          </p>
        </div>
        <div className={'absolute right-0.5 -bottom-0.5'}>
          <p className={'font-inspect'}>
              w: {offsetWidth}px
          </p>
        </div>
        <div className={'border-y w-fit pl-1 -ml-1 pr-14 -mr-14 relative'}>
          <div className={'absolute -top-4 left-1'}>
            <p className={'font-inspect'}>
                t: {offsetTop}px
            </p>
          </div>
          <div className={'absolute right-0.5 bottom-0'}>
            <p className={'font-inspect'}>
                h: {offsetHeight}px
            </p>
          </div>
          <div className={'bg-stripes'}>
            <Link
              className={'text-sm text-sky-500 hover:text-sky-700'}
              href={'#under-construction-search-and-topics-page'}
            >
              Find more topics
            </Link>
          </div>
          <div className={'grid grid-cols-1 grid-rows-2 justify-items-center ' +
            'absolute bottom-0 right-[2.875rem] text-xxs h-full'}>
            <div className={'col-start-1 row-start-1 row-span-1 ' +
              '-mt-[2px] h-[5px] leading-[0px] self-start pr-[1px]'}>
              <FontAwesomeIcon
                icon={faAngleUp}
                width={7}
                height={7}
                className={cn('text-slate-300')}
              />
            </div>
            <div className={'col-start-1 row-start-1 row-span-2 self-center ' +
              'w-0 h-[85%] border-l border-dotted border-slate-300 '}/>
            <div className={'col-start-1 row-start-2 row-span-1 ' +
              'h-[5px] leading-[0px] self-end pr-[1px]'}>
              <FontAwesomeIcon
                icon={faAngleDown}
                width={7}
                height={7}
                className={cn('text-slate-300')}
              />
            </div>
          </div>
        </div>
        <div className={'grid grid-cols-2 grid-rows-1 items-center ' +
          'absolute bottom-3 left-0 text-xxs w-full'}>
          <div className={'col-start-1 row-start-1 col-span-1 justify-self-start leading-[0px]'}>
            <FontAwesomeIcon
              icon={faAngleLeft}
              width={5}
              height={5}
              className={cn('text-slate-300')}
            />
          </div>
          <div className={'col-start-1 row-start-1 col-span-2 justify-self-center ' +
            'w-[95%] h-0 border-b border-dotted border-slate-300'}/>
          <div className={'col-start-2 row-start-1 col-span-1 justify-self-end leading-[0px]'}>
            <FontAwesomeIcon
              icon={faAngleRight}
              width={5}
              height={5}
              className={cn('text-slate-300')}
            />
          </div>
        </div>
        <div className={'absolute -right-9 -bottom-0.5 scale-x-150'}>
          <FontAwesomeIcon
            icon={faRulerHorizontal}
            width={16}
            height={16}
            className={cn('text-slate-300')}
            title={'Section under construction'}
            aria-label={'An icon of a desk ruler'}
          />
        </div>
        <div className={'absolute -right-9 -bottom-[0.3rem] rotate-90'}>
          <FontAwesomeIcon
            icon={faPencil}
            width={14}
            height={14}
            className={cn('text-slate-600')}
            title={'Section under construction'}
            aria-label={'An icon of a pencil'}
            bounce={isBounce}
          />
        </div>
      </div>
      <BlogFooter
        admin={admin}
        classNames={'hidden lg:flex'}
        activeLink={activeLink}
      />
    </aside>
  );
}
