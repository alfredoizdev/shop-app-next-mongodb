'use client'

import { MediaImageType } from '@/lib/actions/media.action'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import { deleteMediaAction } from '@/lib/actions/media.action'
import { useState } from 'react'

const Gallery = ({ gallery }: { gallery: MediaImageType[] }) => {
  const [mediaList, setMediaList] = useState(gallery)

  const handleDelete = async (publicId: string) => {
    const { error } = await deleteMediaAction(publicId)

    if (error) {
      toast.error('Failed to delete media. Please try again.')
      return
    }

    toast.success('Media deleted successfully.')
    setMediaList((prev) => prev.filter((media) => media.id !== publicId))
  }

  return (
    <section className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {mediaList.map((media) => (
        <div key={media.id} className='relative group cursor-pointer'>
          <Button
            onClick={() => handleDelete(media.id)}
            title='delete media'
            className='absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none'
          >
            <Trash className='h-4 w-4' />
          </Button>

          <Image
            src={media.url}
            alt={`Media ${media.id}`}
            className='w-full h-auto shadow-md'
            width={300}
            height={200}
            priority
          />
        </div>
      ))}
    </section>
  )
}

export default Gallery
