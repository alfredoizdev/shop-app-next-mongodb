import { getCategoriesAction } from '@/lib/actions/categories.action'
import CategoryDataTable from './CategoryDataTable'
import { columns } from './columns'

const FetchCategories = async () => {
  const { categories } = await getCategoriesAction()

  if (!categories || categories.length === 0) {
    return <div className='text-center text-gray-500'>No categories found.</div>
  }

  return (
    <div className='flex justify-start items-center flex-wrap'>
      <CategoryDataTable data={categories} columns={columns} />
    </div>
  )
}

export default FetchCategories
