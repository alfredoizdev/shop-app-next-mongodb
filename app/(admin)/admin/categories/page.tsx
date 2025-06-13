import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import FetchCategories from './FetchCategories'

const CategoriesPage = () => {
  return (
    <section>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold'>Categories</h2>
        <Button asChild className='rounded-none cursor-pointer'>
          <Link href='/admin/new/category'>
            <Plus />{' '}
            <span className='hidden md:inline-block'>Create category</span>
          </Link>
        </Button>
      </div>
      <FetchCategories />
    </section>
  )
}

export default CategoriesPage
