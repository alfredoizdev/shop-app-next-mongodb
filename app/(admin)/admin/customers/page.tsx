import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { Plus } from 'lucide-react'
import FetchUsers from './FetchUsers'

const ProductsPage = () => {
  return (
    <div className='w-full rounded-1xl bg-white p-5'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold'>Products</h2>
        <Button asChild className='rounded-none cursor-pointer'>
          <Link href='/admin/new/product'>
            <Plus />
            <span className='hidden md:inline-block'>Create Customer</span>
          </Link>
        </Button>
      </div>
      <div className='mt-7 w-full overflow-hidden'>
        <FetchUsers />
      </div>
    </div>
  )
}

export default ProductsPage
