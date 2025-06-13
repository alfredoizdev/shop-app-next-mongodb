import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import { auth } from '@/auth'

export default async function Rootlayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <>
      <Navbar session={session} />
      {children}
      <Footer />
    </>
  )
}
