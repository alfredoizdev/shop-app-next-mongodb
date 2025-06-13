'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from './ui/input'
import { useDebouncedCallback } from 'use-debounce'

const SearchInput = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const handleOnChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams)

      const searchValue = e.target.value

      if (searchValue) {
        params.set('query', searchValue)
      } else {
        params.delete('query')
      }

      if (pathname === '/search') {
        router.replace(`${pathname}?${params.toString()}`)
      }
      if (pathname !== '/search') {
        router.push(`/search/?${params.toString()}`)
      }
    },
    300
  )

  return (
    <Input
      className='relative h-[36px] pl-10 border-[1px] border-black[0.7] rounded-none focus:outline-none text-sm w-full py-2 ml-1 md:ml-0'
      type='text'
      placeholder='Search'
      onChange={handleOnChange}
      defaultValue={searchParams.get('query')?.toString() || ''}
    />
  )
}

export default SearchInput
