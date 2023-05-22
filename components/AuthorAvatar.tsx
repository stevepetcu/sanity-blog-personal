import cn from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import type { Author } from 'lib/sanity.queries'
import Image from 'next/image'

export default function AuthorAvatar({ firstName, picture }: Pick<Author, 'firstName' | 'picture'>) {
  return (
    <div className='flex items-center'>
      <div className={cn('mr-2 mb-2 sm:mb-0')}>
        {
          picture?.asset?._ref &&
          (
            <Image
              src={urlForImage(picture).height(100).width(100).fit('crop').url()}
              className={cn('rounded-full')}
              height={35}
              width={35}
              alt={`Author's avatar: ${firstName}`}
              title={`Author's avatar: ${firstName}`}
            />
          )
        }
      </div>
      <div className={cn('text-xs sm:text-sm lg:text-base font-light')}>{firstName}</div>
    </div>
  )
}
