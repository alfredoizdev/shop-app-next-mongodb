'use client'
import useUiStore from '@/lib/stores/useUiStore'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'

const ToogleMenu = () => {
  const { setStatusMobileMenu } = useUiStore((state) => state)
  return (
    <div>
      <Button
        className='md:hidden rounded-none'
        onClick={() => setStatusMobileMenu(true)}
      >
        <Menu />
      </Button>
    </div>
  )
}

export default ToogleMenu
