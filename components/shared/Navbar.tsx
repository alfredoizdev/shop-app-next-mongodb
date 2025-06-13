import { ArrowRight, LayoutDashboard, Search } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import SearchInput from '../SearchInput'
import MobileMenu from './MobileMenu'
import { Session } from 'next-auth'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'
import MenuLinks from './MenuLinks'
import ToogleMenu from './ToogleMenu'
import ShopingCart from './ShopingCart'
import ButtonLogOut from './ButtonLogOut'
import { getTheme } from '@/lib/actions/theme'

type Props = {
  session: Session | null
}

const Navbar = async ({ session }: Props) => {
  const { result } = await getTheme()

  return (
    <>
      <nav className='px-4 md:px-12 py-4 md:py-6 bg-white text-black z-10 fixed top-0 w-full'>
        <div className='w-full mx-auto'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4 md:gap-8'>
              <Link
                className='hidden md:inline-block text-lg font-semibold'
                href='/'
              >
                <h1 className='font-bold text-2xl'>
                  {result?.title || 'Shop App'}
                </h1>
              </Link>
              <MenuLinks />
            </div>

            <ToogleMenu />
            <div className='flex items-center gap-4 justify-end'>
              <div className='relative max-w-[300px] md:w-[400px]'>
                <div className='absolute inset-y-0 start-0 flex items-center text-gray-500 ps-3 pointer-events-none'>
                  <Search className='w-4 h-4' />
                </div>
                <div>
                  <SearchInput />
                </div>
              </div>
              <ShopingCart />
              {session?.user && (
                <Avatar>
                  <AvatarFallback className='bg-gray-950 text-white'>
                    {getInitials(session?.user.name) || 'IN'}
                  </AvatarFallback>
                </Avatar>
              )}
              {!session?.user && (
                <Link
                  href='/signin'
                  className='relative items-center justify-center gap-2 hidden md:flex'
                >
                  <Button className='cursor-pointer rounded-none'>
                    Sign In
                    <ArrowRight className='w-4 h-4' />
                  </Button>
                </Link>
              )}
              {session?.user && <ButtonLogOut />}
              {session?.user && session?.user.role === 'admin' && (
                <Link
                  href='/admin/dashboard'
                  className='hidden md:inline-block'
                >
                  <Button className='cursor-pointer rounded-none'>
                    <LayoutDashboard />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <MobileMenu session={session} />
    </>
  )
}

export default Navbar
