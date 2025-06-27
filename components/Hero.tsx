'use client'
import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image'
import { useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { BannerType } from '@/types/Media'

const Hero = ({ banners }: { banners: BannerType[] }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Carousel className='w-full min-h-[90vh] relative bg-white'>
      <CarouselContent className='h-full'>
        {banners.map((item, index) => (
          <CarouselItem
            key={index}
            className='h-full min-h-[90vh] flex items-center justify-center'
          >
            <div className='flex flex-col md:flex-row items-center justify-center h-full px-6 md:px-12 gap-6 max-w-7xl mx-auto'>
              <div className='max-w-2xl text-center md:text-left animate-fade-in-up delay-200'>
                <h1 className='text-5xl md:text-7xl font-bold leading-tight'>
                  {item.title}
                </h1>
                <p className='text-gray-600 my-4'>{item.description}</p>
                <Link href={item.buttonLink}>
                  <Button className='rounded-none cursor-pointer'>
                    {item.buttonText}
                  </Button>
                </Link>
              </div>
              <div
                className={`transition-opacity duration-700 ${
                  imageLoaded
                    ? 'opacity-100 animate-fade-in delay-500'
                    : 'opacity-0'
                }`}
              >
                <Image
                  src={item.image}
                  width={500}
                  height={500}
                  alt='Hero'
                  priority
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {banners.length > 1 && (
        <>
          <CarouselPrevious className='cursor-pointer absolute top-1/2 left-5 -translate-y-1/2 w-10 h-10 bg-gray-950 text-white rounded-none shadow-md hover:bg-gray-900 hover:text-white' />
          <CarouselNext className='cursor-pointer absolute top-1/2 right-5 -translate-y-1/2 w-10 h-10 bg-gray-950 text-white rounded-none shadow-md hover:bg-gray-900 hover:text-white' />
        </>
      )}
    </Carousel>
  )
}

export default Hero
