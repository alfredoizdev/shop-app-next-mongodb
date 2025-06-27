import { listMediaAction } from '@/lib/actions/media.action'
import Gallery from './Gallery'

const FetchMedia = async () => {
  const { result } = await listMediaAction()

  if (!result || result.length === 0) {
    return (
      <main className='px-4 md:px-8 bg-gray-50 pb-8'>
        <h2 className='font-semibold pt-8 text-xl md:text-2xl'>
          Media Gallery
        </h2>
        <p className='mt-5'>No media found.</p>
      </main>
    )
  }

  return <Gallery gallery={result} />
}

export default FetchMedia
