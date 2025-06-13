import { Suspense } from 'react'
import FetchMedia from './fetchMedia'
import SkeletonMedia from './SkeletonMedia'

const MediaPage = () => {
  return (
    <main>
      <div className='px-4 md:px-8 bg-gray-50 pb-8'>
        <h2 className='font-semibold pt-8 text-xl md:text-2xl'>
          Media Gallery
        </h2>
        <Suspense fallback={<SkeletonMedia />}>
          <FetchMedia />
        </Suspense>
      </div>
    </main>
  )
}

export default MediaPage
