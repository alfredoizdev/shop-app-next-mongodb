'use client'
import Link from 'next/link'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import useUiStore from '@/lib/stores/useUiStore'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

type Props = {
  session: Session | null
}

const MobileMenu = ({ session }: Props) => {
  const { showMobileMenu, setStatusMobileMenu } = useUiStore((state) => state)

  if (!showMobileMenu) return null

  return (
    <section className='fixed top-0 left-0 w-full h-screen bg-gray-950 z-50 md:hidden'>
      <Button
        onClick={() => setStatusMobileMenu(false)}
        variant={'ghost'}
        className='cursor-pointer text-white absolute top-4 right-4'
      >
        <X className='w-9 h-9' />
      </Button>
      <div className='flex flex-col items-center justify-center h-full'>
        <Link href='/' onClick={() => setStatusMobileMenu(false)}>
          <h2 className='text-lg font-semibold text-center my-4 md:my-8 md:text-4xl w-full text-white'>
            Home
          </h2>
        </Link>
        <Link href='/category/men' onClick={() => setStatusMobileMenu(false)}>
          <h2 className='text-lg font-semibold text-center my-4 md:my-8 md:text-4xl w-full text-white'>
            Men
          </h2>
        </Link>
        <Link href='/category/women' onClick={() => setStatusMobileMenu(false)}>
          <h2 className='text-lg font-semibold text-center my-4 md:my-8 md:text-4xl w-full text-white'>
            Women
          </h2>
        </Link>
        <Link href='/products' onClick={() => setStatusMobileMenu(false)}>
          <h2 className='text-lg font-semibold text-center my-4 md:my-8 md:text-4xl w-full text-white'>
            All
          </h2>
        </Link>
        {!session?.user && (
          <Link
            href='/signin'
            className='text-lg font-semibold text-center my-4 md:my-8 md:text-4xl w-full text-white'
          >
            Sign In
          </Link>
        )}
        {session && (
          <Button
            variant='ghost'
            className='text-lg font-semibold text-center my-4 md:my-8 md:text-4xl w-full text-white'
            onClick={() => signOut()}
          >
            Logout
          </Button>
        )}
      </div>
    </section>
  )
}

export default MobileMenu
