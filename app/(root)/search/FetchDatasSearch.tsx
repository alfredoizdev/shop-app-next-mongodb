import Card from '@/components/Card'
import { fetchProductFilteredSearchParamsAction } from '@/lib/actions/product.action'

const FetchDataSearch = async ({ search }: { search: string }) => {
  const { results } = await fetchProductFilteredSearchParamsAction(search)

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
    <div className='max-w-7xl mx-auto'>
      <main className='w-auto flex flex-wrap justify-center gap-6 px-6 sm:px-10 lg:px-15 xl:px-5 py-10'>
        <h2 className='font-semibold text-center text-2xl my-4 md:my-8 md:text-4xl w-full'>
          {search ? `Search results for "${search}"` : 'Search results'}
        </h2>
        {results.map((product) => (
          <Card product={product} key={product.id} />
        ))}
      </main>
    </div>
  )
}

export default FetchDataSearch
