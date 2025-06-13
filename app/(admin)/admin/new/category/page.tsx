import AddCategoryForm from '@/components/admin/forms/AddCategory'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const NewCategoryPage = () => {
  return (
    <main className='px-4 md:px-8 bg-gray-50 pb-8'>
      <div className='w-full'>
        <h2 className='font-semibold pt-8 text-xl md:text-2xl'>
          Add a new Category
        </h2>
        <Button asChild className='rounded-none cursor-pointer mt-5'>
          <Link href='/admin/categories'>Back to Categories</Link>
        </Button>
      </div>
      <section>
        <AddCategoryForm />
      </section>
    </main>
  )
}

export default NewCategoryPage
