import { Suspense } from 'react'
import FetchTotalOrder from './FetchTotalOrder'
import FetchTotalProduct from './FetchTotalProduct'
import FetchTotalUser from './FetchTotalUser'
import SkeletonLoading from './SkeletonLoading'

const DashboardPage = () => {
  return (
    <section>
      <h1>Admin Dashboard</h1>
      <div className='flex flex-wrap justify-start items-center'>
        <div className='w-full md:w-1/2 lg:w-1/3 p-4'>
          <Suspense fallback={<SkeletonLoading />}>
            <FetchTotalProduct />
          </Suspense>
        </div>
        <div className='w-full md:w-1/2 lg:w-1/3 p-4'>
          <FetchTotalUser />
        </div>
        <div className='w-full md:w-1/2 lg:w-1/3 p-4'>
          <FetchTotalOrder />
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
