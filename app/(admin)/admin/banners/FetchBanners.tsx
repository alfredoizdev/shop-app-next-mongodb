import { columns } from './columns'
import BannersDataTable from './BannersDataTable'
import { fetchBannersAction } from '@/lib/actions/media.action'

const FetchBanners = async () => {
  // const { error, message, results } = await fetchProductsListAction()
  const { results } = await fetchBannersAction()

  if (!results) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <h1 className='text-2xl font-bold'>No products found</h1>
      </div>
    )
  }

  return (
    <>
      <BannersDataTable columns={columns} data={results} />
    </>
  )
}

export default FetchBanners
