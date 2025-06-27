import UpdateCategoryForm from '@/components/admin/forms/UpdateCategoryForm'
import { Button } from '@/components/ui/button'
import { getCategoryByIdAction } from '@/lib/actions/categories.action'
import Link from 'next/link'

type Props = {
  params: Promise<{ id: string }>
}

const UpdatePage = async ({ params }: Props) => {
  const { id } = await params

  const { category } = await getCategoryByIdAction(id)

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <main className='px-4 md:px-8 bg-gray-50 pb-8'>
      <div className='w-full'>
        <h2 className='font-semibold pt-8 text-xl md:text-2xl'>Edit Cetgory</h2>
        <Button asChild className='rounded-none cursor-pointer mt-5'>
          <Link href='/admin/categories'>Back to Categories</Link>
        </Button>
      </div>
      <section>
        <UpdateCategoryForm category={category} />
      </section>
    </main>
  )
}

export default UpdatePage
