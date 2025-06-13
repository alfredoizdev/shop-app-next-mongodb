import type { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getTheme } from '@/lib/actions/theme'
import FetchProductsData from './FetchProductsData'

export const generateMetadata = async (): Promise<Metadata> => {
  const { result } = await getTheme()

  return {
    title: `${result?.title || 'Shop App'} | Products`,
    description: `${result?.slogan || 'Shop App'} Products`,
    keywords: `${result?.title || 'Shop app'}, Products`,
    authors: [
      {
        name: 'Alfredo',
        url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}`,
      },
    ],
    creator: 'Alfredo',
    publisher: 'Alfredo',
    applicationName: `${result?.title || 'Shop App'}`,
    openGraph: {
      title: `${result?.title || 'Shop App'} | Products`,
      description: `${result?.title || 'Shop App'} Products`,
      url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/products`,
      siteName: result?.title || 'Shop App',
      // images: results.map((banner) => ({
      //   url: banner.image,
      //   width: 800,
      //   height: 600,
      //   alt: banner.title || 'Banner Image',
      // })),
      locale: 'en_US',
      type: 'website',
    },
  }
}

const CollectionPage = () => {
  return (
    <div className='w-full rounded-1xl bg-white p-5'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold'>Categories</h2>
        <Button asChild className='rounded-none cursor-pointer'>
          <Link href='/admin/new/category'>
            <Plus />{' '}
            <span className='hidden md:inline-block'>Create Categoy</span>
          </Link>
        </Button>
      </div>
      <div className='mt-7 w-full overflow-hidden'>
        <FetchProductsData />
      </div>
    </div>
  )
}

export default CollectionPage
