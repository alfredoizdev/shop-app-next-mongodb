import EditCopySiteForm from '@/components/admin/forms/EditCopySiteForm'
import { Button } from '@/components/ui/button'
import { getTheme } from '@/lib/actions/theme'
import Link from 'next/link'

const CopySiteEditPage = async () => {
  const { result } = await getTheme()

  return (
    <main className='px-4 md:px-8 bg-gray-50 pb-8'>
      <div className='w-full'>
        <h2 className='font-semibold pt-8 text-xl md:text-2xl'>
          Add a new Product
        </h2>
        <Button asChild className='rounded-none cursor-pointer mt-5'>
          <Link href='/admin/theme'>Back to Theme</Link>
        </Button>
      </div>
      <section>
        <div></div>
        <EditCopySiteForm {...result} />
      </section>
    </main>
  )
}

export default CopySiteEditPage
