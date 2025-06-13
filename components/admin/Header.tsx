import { Session } from 'next-auth'

const Header = ({ session }: { session: Session }) => {
  return (
    <header className='w-full py-4 px-2'>
      <h2 className='text-1xl font-semibold text-gray-900'>
        {session?.user?.name}
      </h2>
      <p className='text-base text-gray-500'>
        Monitoring all products orders and more
      </p>
    </header>
  )
}

export default Header
