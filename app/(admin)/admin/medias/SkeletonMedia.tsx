import { Skeleton } from '@/components/ui/skeleton'

const SkeletonMedia = () => {
  return (
    <section className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className='relative group cursor-pointer'>
          <Skeleton className='w-full h-[200px] bg-gray-600' />
        </div>
      ))}
    </section>
  )
}

export default SkeletonMedia
