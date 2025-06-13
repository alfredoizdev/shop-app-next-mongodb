import { fetchProductsAction } from '@/lib/actions/product.action'
import ProductsDataTable from './ProductsDataTable'
import { columns } from './columns'

const FetchProducts = async () => {
  // const { error, message, results } = await fetchProductsListAction()
  const { results } = await fetchProductsAction()

  if (!results) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <h1 className='text-2xl font-bold'>No products found</h1>
      </div>
    )
  }

  return (
    <>
      <ProductsDataTable columns={columns} data={results} />
    </>
  )
}

export default FetchProducts
