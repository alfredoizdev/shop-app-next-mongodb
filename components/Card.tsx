import { ProductType } from '@/types/Products'
import Image from 'next/image'
import Link from 'next/link'

const Card = ({ product }: { product: ProductType }) => {
  return (
    <Link href={`/product/${product.id}`} key={product.id}>
      <Image
        src={product.imageUrl}
        alt={product.name}
        className='max-w-[17rem] h-72 object-cover object-center'
        width={1000}
        height={1000}
      />
      <div className='mt-4'>
        <h2 className='font-semibold text-lg'>{product.name}</h2>
        <p className='font-medium text-sm mt-1'>${product.price}</p>
      </div>
    </Link>
  )
}

export default Card
