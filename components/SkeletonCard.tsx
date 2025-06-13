import { Skeleton } from '@/components/ui/skeleton'

const SkeletonCard = ({ howMany }: { howMany: number }) => {
  return (
    <div className='flex flex-col flex-wrap mx-auto justify-center items-center space-x-4 my-8 md:flex-row gap-4'>
      {Array.from({ length: howMany }, (_, index) => (
        <div className='flex flex-col space-y-3' key={index}>
          <Skeleton className='h-[250px] w-[250px] rounded-xl bg-gray-600' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px] bg-gray-600' />
            <Skeleton className='h-4 w-[200px] bg-gray-600' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonCard
