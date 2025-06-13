import CategoryWidget from '@/components/CategoryWidget'
import Hero from '@/components/Hero'
import ProductList from '@/components/ProductList'
import SkeletonCard from '@/components/SkeletonCard'
import { Suspense } from 'react'

import type { Metadata } from 'next'
import { fetchBannersAction } from '@/lib/actions/media.action'
import { getTheme } from '@/lib/actions/theme'

export const generateMetadata = async (): Promise<Metadata> => {
  const { result } = await getTheme()

  return {
    title: `${result?.title || 'Shop App'} | Home`,
    description: `${result?.slogan || 'Shop App'} Home`,
    keywords: `${result?.title || 'Shop app'}, Home`,
    authors: [{ name: 'Alfredo', url: 'https://onlywatch.com' }],
    creator: 'Alfredo',
    publisher: 'Alfredo',
    applicationName: `${result?.title || 'Shop App'}`,
    openGraph: {
      title: `${result?.title || 'Shop App'} | Home`,
      description: `${result?.title || 'Shop App'} Home`,
      url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/category`,
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

export default async function Home() {
  const { results } = await fetchBannersAction()

  return (
    <main className='bg-gray-50'>
      <Hero banners={results} />
      <Suspense fallback={<SkeletonCard howMany={4} />}>
        <ProductList title='Featured Products' />
      </Suspense>
      <CategoryWidget />
    </main>
  )
}
