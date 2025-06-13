import SigUpForm from '@/components/SigUpForm'
import { getTheme } from '@/lib/actions/theme'
import { Metadata } from 'next'

export const generateMetadata = async (): Promise<Metadata> => {
  const { result } = await getTheme()

  return {
    title: `${result?.title || 'Shop App'} | Sign Up`,
    description: `${result?.slogan || 'Shop App'} Sign Up`,
    keywords: `${result?.title || 'Shop app'}, Sign Up`,
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
      url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/signup`,
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

const SignUpPage = () => {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-background px-4'>
      <h2 className='mb-2 font-semibold text-5xl'>Only\Watch</h2>
      <p className='mb-4 text-gray-400'>
        Discover the finest collection of luxury watches
      </p>
      <SigUpForm />
    </main>
  )
}

export default SignUpPage
