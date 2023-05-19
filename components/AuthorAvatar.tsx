import cn from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import type { Author } from 'lib/sanity.queries'
import Image from 'next/image'

export default function AuthorAvatar(props: Author) {
  const { name, picture } = props
  return (
    <div className='flex items-center'>
      <div className={cn('relative mr-4 h-12 w-12 mb-2 sm:mb-0 ml-2.5')}>
        {
          picture?.asset?._ref &&
          (
            <Image
              src={urlForImage(picture).height(100).width(100).fit('crop').url()}
              className={cn('rounded-full')}
              height={50}
              width={50}
              alt={`Author's avatar: ${name}`}
              title={`Author's avatar: ${name}`}
            />
          )
        }
      </div>
      <div className='text-xs sm:text-sm md:text-base font-semibold'>{name}</div>
    </div>
  )
}
