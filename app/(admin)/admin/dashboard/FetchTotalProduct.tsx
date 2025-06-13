import { fetchProductsAction } from '@/lib/actions/product.action'

const FetchTotalProduct = async () => {
  const { results } = await fetchProductsAction()

  return (
    <div className='bg-white shadow-md p-6 m-4'>
      <h1 className='text-2xl font-bold text-center py-4'>Total Products</h1>
      <div className='flex justify-center items-center'>
        <span className='text-4xl font-semibold'>{results.length}</span>
      </div>
      <p className='text-center text-gray-500 mt-2'>
        Total number of products available in the store.
      </p>
    </div>
  )
}

export default FetchTotalProduct
