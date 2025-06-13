import AddForm from '@/components/admin/forms/AddForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const AddProductPage = () => {
  return (
    <main className='px-4 md:px-8 bg-gray-50 pb-8'>
      <div className='w-full'>
        <h2 className='font-semibold pt-8 text-xl md:text-2xl'>
          Add a new Product
        </h2>
        <Button asChild className='rounded-none cursor-pointer mt-5'>
          <Link href='/admin/products'>Back to Products</Link>
        </Button>
      </div>
      <section>
        <AddForm />
      </section>
    </main>
  )
}

export default AddProductPage
