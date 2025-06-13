import { fetchProductsAction } from '@/lib/actions/product.action'
import Card from './Card'

const ProductList = async ({ title }: { title: string }) => {
  const { results } = await fetchProductsAction()

  if (!results || results.length === 0) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h2 className='font-semibold text-center text-2xl my-4 md:my-8 md:text-4xl w-full'>
          No Products Found
        </h2>
      </div>
    )
  }

  return (
    <>
      <h2 className='font-semibold text-center text-2xl my-6 md:my-8 md:text-4xl w-full'>
        {title}
      </h2>
      <div
        id='products'
        className='px-4 md:px-12 py-5 md:py-10 flex justify-center items-center'
      >
        <section className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          {results.slice(0, 4).map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </section>
      </div>
    </>
  )
}

export default ProductList
