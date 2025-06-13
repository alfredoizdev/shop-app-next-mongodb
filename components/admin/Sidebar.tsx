'use client'
import {
  Boxes,
  CircleDollarSign,
  Columns3Cog,
  Film,
  Images,
  LayoutDashboard,
  PackageOpen,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { getInitials } from '@/lib/utils'
import { Session } from 'next-auth'

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? 'bg-gray-300' : ''
  }

  return (
    <aside className='flex h-[100vh] fixed top-0 left-0 flex-col items-center z-10 justify-between w-[80px] md:w-[250px] bg-white border-r border-gray-200 shadow-md'>
      {/* Parte superior y central */}
      <div className='flex flex-col items-center justify-start w-full flex-grow'>
        <Link href='/admin/dashboard'>
          <h1 className='text-2xl font-bold p-5 hidden md:block'>Dashboard</h1>
          <h1 className='text-1xl font-bold p-4 block md:hidden'>Das</h1>
        </Link>
        <div className='w-full border-b border-b-solid'></div>

        <div className='mt-10 flex flex-col gap-5 w-full px-5'>
          <Link
            href='/admin/dashboard'
            className={`text-md text-gray-900 p-2 font-medium flex items-center gap-2 ${isActive(
              '/admin/dashboard'
            )}`}
          >
            <LayoutDashboard />{' '}
            <span className='hidden md:block'>Dashboard</span>
          </Link>
          <Link
            href='/admin/products'
            className={`text-md text-gray-900 p-2 font-medium flex items-center gap-2 ${isActive(
              '/admin/products'
            )}`}
          >
            <PackageOpen /> <span className='hidden md:block'>Products</span>
          </Link>
          <Link
            href='/admin/categories'
            className={`text-md p-2 font-medium flex items-center gap-2 ${isActive(
              '/admin/categories'
            )}`}
          >
            <Boxes /> <span className='hidden md:block'>Categories</span>
          </Link>
          <Link
            href='/admin/orders'
            className={`text-md p-2 font-medium flex items-center gap-2 ${isActive(
              '/admin/orders'
            )}`}
          >
            <CircleDollarSign /> <span className='hidden md:block'>Orders</span>
          </Link>
          <Link
            href='/admin/customers'
            className={`text-md p-2 font-medium flex items-center gap-2 ${isActive(
              '/admin/customers'
            )}`}
          >
            <Users /> <span className='hidden md:block'>Customers</span>
          </Link>
          <Link
            href='/admin/banners'
            className={`text-md p-2 font-medium flex items-center gap-2 ${isActive(
              '/admin/banners'
            )}`}
          >
            <Images />
            <span className='hidden md:block'>Banners</span>
          </Link>
          <Link
            href='/admin/theme'
            className={`text-md p-2 font-medium flex items-center gap-2 ${isActive(
              '/admin/theme'
            )}`}
          >
            <Columns3Cog />
            <span className='hidden md:block'>Theme</span>
          </Link>
          <Link
            href='/admin/medias'
            className={`text-md p-2 font-medium flex items-center gap-2 ${isActive(
              '/admin/medias'
            )}`}
          >
            <Film />
            <span className='hidden md:block'>Medias</span>
          </Link>
        </div>
      </div>

      {/* Avatar en el fondo */}
      <div className='p-5 flex flex-row items-center gap-4 w-full border-t border-t-solid'>
        {session?.user && (
          <Avatar>
            <AvatarFallback className='bg-gray-950 text-white'>
              {getInitials(session?.user.name) || 'IN'}
            </AvatarFallback>
          </Avatar>
        )}
        <div className='hidden md:flex flex-col justify-center items-start'>
          <p className='font-semibold text-gray-900'>{session?.user?.name}</p>
          <p className='text-xs font-light'>{session?.user?.email}</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
