import { fetchCategoryProductsAction } from '@/lib/actions/product.action'
import Card from '@/components/Card'

const Categories = async ({ category }: { category: string }) => {
  const { results } = await fetchCategoryProductsAction(category)

  if (!results) {
    return (
      <div className='max-w-7xl mx-auto'>
        <main className='w-auto flex flex-wrap justify-center gap-6 px-6 sm:px-10 lg:px-3 xl:px-5 py-10'>
          <h2 className='text-2xl font-semibold'>No products found</h2>
        </main>
      </div>
    )
  }

  return (
    <main className='max-w-7xl mx-auto animate-fade-in py-7'>
      <div className='w-auto flex flex-wrap justify-center md:justify-start gap-6 px-6 sm:px-10 lg:px-15 xl:px-5 py-10 '>
        <h2 className='font-semibold text-center text-2xl my-4 md:my-8 md:text-4xl w-full'>
          {category.charAt(0).toUpperCase() + category.slice(1)} Products
        </h2>
        {results.map((product) => (
          <Card product={product} key={product._id} />
        ))}
      </div>
    </main>
  )
}

export default Categories
