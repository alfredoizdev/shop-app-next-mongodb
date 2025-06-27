import UpdateBannerForm from '@/components/admin/forms/UpdateBannerForm'
import { Button } from '@/components/ui/button'
import { getBannerByIdAction } from '@/lib/actions/media.action'
import Link from 'next/link'

type Props = {
  params: Promise<{ id: string }>
}

const UpdatePage = async ({ params }: Props) => {
  const { id } = await params

  const { results } = await getBannerByIdAction(id)

  if (!results) {
    return <div>Banner not found</div>
  }

  return (
    <main className='px-4 md:px-8 bg-gray-50 pb-8'>
      <div className='w-full'>
        <h2 className='font-semibold pt-8 text-xl md:text-2xl'>Edit Banner</h2>
        <Button asChild className='rounded-none cursor-pointer mt-5'>
          <Link href='/admin/banners'>Back to Banners</Link>
        </Button>
      </div>
      <section>
        <UpdateBannerForm banner={results} />
      </section>
    </main>
  )
}

export default UpdatePage
