import type { Metadata } from 'next'
import Categories from './Categories'
import { getTheme } from '@/lib/actions/theme'

type Props = {
  params: Promise<{ cat: string }>
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { result } = await getTheme()
  const cat = (await params).cat

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
      title: `${result?.title || 'Shop App'} | Category`,
      description: `${result?.title || 'Shop App'} Category`,
      url: `${
        process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
      }/category/${cat}`,
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

const CategoryPage = async ({ params }: Props) => {
  const { cat } = await params

  return (
    <div className='w-full h-full bg-gray-50'>
      <Categories category={cat} />
    </div>
  )
}

export default CategoryPage
