import { Button } from '@/components/ui/button'
import { getTheme } from '@/lib/actions/theme'
import { Edit } from 'lucide-react'
import Link from 'next/link'

const CopySite = async () => {
  const { result } = await getTheme()

  return (
    <div className='flex flex-col gap-4 p-4 shadow-md bg-white'>
      <div className='flex justify-between items-center'>
        <h2>Site Copy</h2>
        <Button asChild className='rounded-none cursor-pointer'>
          <Link href='/admin/theme/copy-site/edit'>
            <Edit /> Edit Site
          </Link>
        </Button>
      </div>
      <p>{result?.title || 'Title of you site'}</p>
      <p>{result?.slogan || 'Slogan for you site here'}</p>
    </div>
  )
}

export default CopySite
