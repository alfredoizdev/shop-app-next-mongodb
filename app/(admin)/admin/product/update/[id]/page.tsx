import UpdateForm from '@/components/admin/forms/UpdateForm'
import { Button } from '@/components/ui/button'
import { fetchProductByIdAction } from '@/lib/actions/product.action'
import Link from 'next/link'

type Props = {
  params: Promise<{ id: string }>
}

const UpdatePage = async ({ params }: Props) => {
  const { id } = await params

  const { result } = await fetchProductByIdAction(id)

  if (!result) {
    return <div>Product not found</div>
  }

  return (
    <main className='px-4 md:px-8 bg-gray-50 pb-8'>
      <div className='w-full'>
        <h2 className='font-semibold pt-8 text-xl md:text-2xl'>Edit Product</h2>
        <Button asChild className='rounded-none cursor-pointer mt-5'>
          <Link href='/admin/products'>Back to Products</Link>
        </Button>
      </div>
      <section>
        <UpdateForm product={result} />
      </section>
    </main>
  )
}

export default UpdatePage
