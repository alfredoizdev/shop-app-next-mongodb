import { Suspense } from 'react'
import CartDetail from './CartDetail'
import SkeletonCard from '@/components/SkeletonCard'
import ProductList from '@/components/ProductList'
import { getTheme } from '@/lib/actions/theme'
import { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const { result } = await getTheme()

  return {
    title: `${result?.title || 'Shop App'} | Cart`,
    description: `${result?.slogan || 'Shop App'} Cart`,
    keywords: `${result?.title || 'Shop app'}, Cart`,
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
      title: `${result?.title || 'Shop App'} | Cart`,
      description: `${result?.title || 'Shop App'} Cart`,
      url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/cart`,
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

const CartPage = () => {
  return (
    <>
      <CartDetail />
      <section>
        <Suspense fallback={<SkeletonCard howMany={4} />}>
          <ProductList title={'Top Selection'} />
        </Suspense>
      </section>
    </>
  )
}

export default CartPage
