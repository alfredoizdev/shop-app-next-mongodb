import Card from '@/components/Card'
import { fetchProductsListAction } from '@/lib/actions/product.action'

const FetchProductsData = async () => {
  const { results } = await fetchProductsListAction()

  if (!results || results.length === 0) {
    return (
      <div className='max-w-7xl mx-auto'>
        <main className='flex justify-center items-center h-screen'>
          <h2 className='font-semibold text-center text-2xl my-4 md:my-8 md:text-4xl w-full'>
            No Products Found
          </h2>
        </main>
      </div>
    )
  }
  return (
    <main className='max-w-7xl mx-auto animate-fade-in'>
      <div className='w-auto flex flex-wrap justify-center md:justify-start gap-6 px-6 sm:px-10 lg:px-15 xl:px-5 py-10 '>
        <h2 className='font-semibold text-center text-2xl my-4 md:my-8 md:text-4xl w-full'>
          All Products
        </h2>
        {results.map((product) => (
          <Card product={product} key={product.id} />
        ))}
      </div>
    </main>
  )
}

export default FetchProductsData
