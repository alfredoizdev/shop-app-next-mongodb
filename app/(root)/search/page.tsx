import { Suspense } from 'react'
import FetchDataSearch from './FetchDatasSearch'
import SkeletonCard from '@/components/SkeletonCard'
import { getTheme } from '@/lib/actions/theme'
import { Metadata } from 'next'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export const generateMetadata = async (): Promise<Metadata> => {
  const { result } = await getTheme()

  return {
    title: `${result?.title || 'Shop App'} | Search`,
    description: `${result?.slogan || 'Shop App'} Search`,
    keywords: `${result?.title || 'Shop app'}, Search`,
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
      title: `${result?.title || 'Shop App'} | Search`,
      description: `${result?.title || 'Shop App'} Search`,
      url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/Search`,
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
const SearchPage = async (props: { searchParams: SearchParams }) => {
  const { query } = await props.searchParams
  const search = query?.toString() || ''

  return (
    <div className='w-full h-full bg-gray-50'>
      <Suspense key={search} fallback={<SkeletonCard howMany={6} />}>
        <FetchDataSearch search={search} />
      </Suspense>
    </div>
  )
}

export default SearchPage
