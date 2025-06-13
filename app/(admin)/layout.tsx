import { auth } from '@/auth'
import Header from '@/components/admin/Header'
import Sidebar from '@/components/admin/Sidebar'
import { redirect } from 'next/navigation'

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (!session?.user?.id || session?.user?.role !== 'admin') {
    redirect('/signin')
  }

  return (
    <main className='flex min-h-screen w-full flex-row'>
      <Sidebar session={session} />
      <div className='w-full bg-gray-50 ml-[80px] md:ml-[250px]'>
        <Header session={session} />
        <div className='px-2'>{children}</div>
      </div>
    </main>
  )
}

export default AdminLayout
