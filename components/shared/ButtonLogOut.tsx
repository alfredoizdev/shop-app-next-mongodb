'use client'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

const ButtonLogOut = () => {
  return (
    <Button
      className='cursor-pointer rounded-none hidden md:inline-block'
      onClick={() => signOut()}
    >
      Logout
    </Button>
  )
}

export default ButtonLogOut
