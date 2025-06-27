import Image from 'next/image'

type Props = {
  src: string
  alt?: string
  size?: number
}

export default function ImagePreview({
  src,
  alt = 'Preview',
  size = 200,
}: Props) {
  return (
    <div className='flex justify-center items-center mb-4'>
      <div className='w-52 h-52 md:w-64 md:h-64 bg-gray-100 border border-gray-300 rounded-none flex justify-center items-center relative'>
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className='w-full h-auto rounded-none mb-4'
        />
      </div>
    </div>
  )
}
