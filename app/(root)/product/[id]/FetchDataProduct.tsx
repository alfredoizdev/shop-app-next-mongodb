import { fetchProductByIdAction } from '@/lib/actions/product.action'
import ProductDetail from './ProductDetail'

const FetchDataProduct = async ({ id }: { id: string }) => {
  const { result } = await fetchProductByIdAction(id)

  if (!result) {
    return (
      <main className='flex justify-center items-center h-screen bg-gray-50'>
        <h2 className='font-semibold text-center text-2xl my-4 md:my-8 md:text-4xl w-full'>
          No Products Found
        </h2>
      </main>
    )
  }

  return <ProductDetail product={result} />
}

export default FetchDataProduct
