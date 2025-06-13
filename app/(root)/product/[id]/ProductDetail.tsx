'use client'
import Image from 'next/image'
import { useState } from 'react'
import { ProductType } from '@/types/Products'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/stores/useCartStore'

const ProductDetail = ({ product }: { product: ProductType }) => {
  const [quantity, setQuantity] = useState(1)
  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = () => {
    console.log('Adding to cart:', product)
    // Aquí deberías integrar tu lógica de carrito (context, store o API)
    addToCart(product, quantity)
    console.log(`Added ${quantity} x ${product.name} to cart`)
  }

  const total = quantity * product.price

  return (
    <main className='flex flex-col items-center justify-center bg-gray-50'>
      <section className='max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
        <div>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className='rounded-lg object-cover w-full h-auto'
          />
        </div>

        <div className='space-y-6'>
          <h1 className='text-3xl font-bold'>{product.name}</h1>
          <p className='text-gray-600 text-lg'>{product.description}</p>
          <p className='text-xl font-semibold text-black'>
            ${product.price.toLocaleString()}
          </p>
          <p className='text-sm text-gray-500'>Category: {product.category}</p>

          <div className='flex items-center gap-4 mt-4'>
            <label htmlFor='quantity' className='font-medium'>
              Quantity:
            </label>
            <div className='flex items-center border rounded'>
              <button
                type='button'
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className='px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200'
              >
                –
              </button>
              <input
                id='quantity'
                type='text'
                value={quantity}
                readOnly
                className='w-12 text-center border-x border-gray-300 py-1 focus:outline-none'
              />
              <button
                type='button'
                onClick={() => setQuantity((q) => q + 1)}
                className='px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200'
              >
                +
              </button>
            </div>
          </div>

          <p className='text-lg font-semibold mt-2'>
            Total: ${total.toLocaleString()}
          </p>

          <Button
            onClick={handleAddToCart}
            className='cursor-pointer rounded-none'
          >
            Add to Cart
          </Button>
        </div>
      </section>
    </main>
  )
}

export default ProductDetail
