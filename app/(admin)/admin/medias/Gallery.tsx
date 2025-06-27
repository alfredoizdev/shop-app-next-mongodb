'use client'

import { MediaImageType } from '@/lib/actions/media.action'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Trash, Upload } from 'lucide-react'
import { toast } from 'sonner'
import {
  deleteMediaAction,
  uploadMediaAction,
} from '@/lib/actions/media.action'
import { useState, useRef } from 'react'
import { useImageUpload } from '@/hooks/useImageUpload'
import ImagePreview from '@/components/ImagePreview'

const Gallery = ({ gallery }: { gallery: MediaImageType[] }) => {
  const [mediaList, setMediaList] = useState(gallery)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const {
    imageURL,
    errors: imageErrors,
    handleImageChange,
    resetImage,
  } = useImageUpload()

  const handleUpload = async () => {
    if (!fileInputRef.current?.files?.[0]) return
    setUploading(true)
    const formData = new FormData()
    formData.append('image', fileInputRef.current.files[0])
    const { error, errorMessage, result } = await uploadMediaAction(formData)
    if (error) {
      toast.error(errorMessage || 'Failed to upload image.')
    } else if (result) {
      setMediaList((prev) => [result, ...prev])
      toast.success('Media uploaded successfully.')
      resetImage()
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
    setUploading(false)
  }

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
    <>
      <div className='flex flex-col gap-4 mt-4'>
        <div className='flex gap-4 items-center'>
          <Button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-none'
          >
            <Upload className='w-5 h-5' />
            Choose Image
          </Button>
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleImageChange}
            className='hidden'
          />
          {imageURL && (
            <Button
              type='button'
              onClick={handleUpload}
              disabled={uploading}
              className='bg-green-600 text-white hover:bg-green-700 rounded-none'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          )}
        </div>
        {imageErrors.image && (
          <p className='text-red-500 text-sm'>{imageErrors.image[0]}</p>
        )}
        {imageURL && <ImagePreview src={imageURL} alt={'preview'} />}
      </div>

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
    </>
  )
}

export default Gallery
