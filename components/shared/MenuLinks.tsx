import { getCategoriesAction } from '@/lib/actions/categories.action'
import Link from 'next/link'

const MenuLinks = async () => {
  const { categories } = await getCategoriesAction()

  return (
    <div className='items-center justify-center gap-6 hidden md:flex'>
      {categories.map(({ name, slug, id }) => (
        <Link
          key={id}
          className='inline-block text-lg font-semibold'
          href={`/category/${slug}`}
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Link>
      ))}
      <Link className='inline-block text-lg font-semibold' href='/products'>
        All Products
      </Link>
    </div>
  )
}

export default MenuLinks
