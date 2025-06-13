import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (session) {
    return redirect('/')
  }

  // Si hay sesión, redirige a la página de inicio

  return (
    <>
      <div className='w-full flex items-center justify-between px-4 py-2'>
        <Link href={'/'} prefetch={false}>
          <Button className='rounded-none cursor-pointer'>
            <ArrowLeft /> Home
          </Button>
        </Link>
      </div>
      {children}
    </>
  )
}

export default AuthLayout
