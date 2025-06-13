'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/lib/stores/useCartStore'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const CartDetail = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCartStore(
    (state) => state
  )

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  if (cart.length === 0) {
    return (
      <main className='flex flex-col items-center justify-center h-full py-20 px-4'>
        <h1 className='text-3xl font-bold mb-4'>Your cart is empty</h1>
        <Link href='/products'>
          <Button className='rounded-none'>Go to Products</Button>
        </Link>
        <p className='mt-4 text-gray-500'>
          Browse our collection and add items to your cart.
        </p>
      </main>
    )
  }

  return (
    <main className='max-w-7xl mx-auto px-6 py-12'>
      <h1 className='text-3xl font-bold mb-8'>Your Cart</h1>
      <div className='grid gap-8'>
        {cart.map(({ item, quantity }) => (
          <div
            key={item.id}
            className='flex flex-col md:flex-row items-center gap-6 border-b pb-6'
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={150}
              height={150}
              className='rounded-lg object-cover'
            />
            <div className='flex-1 space-y-2'>
              <h2 className='text-xl font-semibold'>{item.name}</h2>
              <p className='text-gray-600'>{item.description}</p>
              <p className='font-medium text-black'>
                ${item.price.toLocaleString()}
              </p>
              <div className='flex items-center gap-3 mt-2'>
                <label htmlFor={`qty-${item.id}`}>Qty:</label>
                <div className='flex items-center border rounded'>
                  <button
                    type='button'
                    onClick={() => updateQuantity(item.id, quantity - 1)}
                    className='px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200'
                  >
                    –
                  </button>
                  <input
                    id={`qty-${item.id}`}
                    type='text'
                    value={quantity}
                    readOnly
                    className='w-10 text-center border-x border-gray-300 py-1 focus:outline-none'
                  />
                  <button
                    type='button'
                    onClick={() => updateQuantity(item.id, quantity + 1)}
                    className='px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200'
                  >
                    +
                  </button>
                </div>
                <Button
                  size='sm'
                  onClick={() => removeFromCart(item.id)}
                  className='ml-4 rounded-none cursor-pointer bg-red-800 text-white hover:bg-red-700'
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-10 text-right'>
        <h2 className='text-2xl font-bold'>
          Total: ${totalPrice().toLocaleString()}
        </h2>
        <Button className='mt-4 rounded-none cursor-pointer'>Checkout</Button>
      </div>
    </main>
  )
}

export default CartDetail
