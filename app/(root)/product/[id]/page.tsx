import type { Metadata } from 'next'
import FetchDataProduct from './FetchDataProduct'
import { getTheme } from '@/lib/actions/theme'

type Props = {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { result } = await getTheme()
  const id = (await params).id

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
      url: `${
        process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
      }/product/${id}`,
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

const ProductPage = async ({ params }: Props) => {
  const { id } = await params

  return <FetchDataProduct id={id} />
}

export default ProductPage
