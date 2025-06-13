import { listMediaAction } from '@/lib/actions/media.action'
import Image from 'next/image'

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

  return (
    <section className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {result.map((media) => (
        <div key={media.id} className='relative group cursor-pointer'>
          <Image
            src={media.url}
            alt={`Media ${media.id}`}
            className='w-full h-auto shadow-md'
            width={300}
            height={200}
            priority
          />
        </div>
      ))}
    </section>
  )
}

export default FetchMedia
