import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import FetchBanners from './FetchBanners'

const BannersPage = () => {
  return (
    <section>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold'>Products</h2>
        <Button asChild className='rounded-none cursor-pointer'>
          <Link href='/admin/new/banner'>
            <Plus />{' '}
            <span className='hidden md:inline-block'>Create banner</span>
          </Link>
        </Button>
      </div>
      <div className='mt-7 w-full overflow-hidden'>
        <FetchBanners />
      </div>
    </section>
  )
}

export default BannersPage
