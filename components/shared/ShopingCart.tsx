'use client'
import { useCartStore } from '@/lib/stores/useCartStore'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const ShopingCart = () => {
  const [mount, setMount] = useState(false)
  const totalItems = useCartStore((state) => state.totalItems())

  useEffect(() => {
    setMount(true)
  }, [])

  if (!mount) return null

  return (
    <Link
      href='/cart'
      className='relative flex items-center justify-center gap-2'
    >
      {totalItems > 0 && (
        <span className='absolute -top-2 -end-2 flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-800 rounded-full'>
          {totalItems}
        </span>
      )}
      <ShoppingBag className='w-6 h-6' />
    </Link>
  )
}

export default ShopingCart
