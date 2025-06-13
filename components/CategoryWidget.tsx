import { getCategoriesAction } from '@/lib/actions/categories.action'
import Image from 'next/image'
import Link from 'next/link'

const CategoryWidget = async () => {
  const { categories } = await getCategoriesAction()

  if (!categories || categories.length === 0) {
    return (
      <div className='text-center my-8'>
        <p className='text-lg font-semibold'>No categories available</p>
      </div>
    )
  }

  return (
    <>
      <h2 className='font-semibold text-center text-2xl my-4 md:my-8 md:text-4xl w-full'>
        Categories
      </h2>
      <div
        id='category'
        className='flex flex-col md:flex-row justify-center items-center px-4 md:px-12 py-5 md:py-10 gap-4 md:gap-8 w-auto max-w-xl mx-auto '
      >
        {categories.map(({ id, name, slug, image }) => (
          <Link
            key={id}
            href={`/category/${slug}`}
            className='flex flex-col justify-center items-center my-4 md:my-8 md:flex-row relative w-full md:rounded-lg md:shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out'
          >
            <Image
              src={image}
              alt={name}
              width={1000}
              height={1000}
              className='max-w-[17rem] h-72 md:max-w-[20rem] lg:max-w-[25rem] md:h-100 object-cover object-center'
            />

            <span className='absolute inset-0 w-[30%] h-[2rem] flex justify-center items-center text-2xl text-white font-semibold capitalize border-white border-4 p-10 top-1/3 left-1/3 bg-gray-800/20'>
              {name}
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}

export default CategoryWidget
