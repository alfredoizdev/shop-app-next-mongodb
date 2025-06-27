'use client'
import ImagePreview from '@/components/ImagePreview'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { BannerType } from '@/types/Media'

import MediaDialog from '../dialog/MediaDialog'
import { ImageIcon, Upload } from 'lucide-react'
import { useImageUpload } from '@/hooks/useImageUpload'
import { useRef, useState } from 'react'
import useProductStore from '@/lib/stores/useProductStore'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { updateBannerAction } from '@/lib/actions/media.action'

const UpdateBannerForm = ({ banner }: { banner: BannerType }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const { urlImage, addImageUrl } = useProductStore((state) => state)

  const {
    imageURL,
    errors: imageErrors,
    handleImageChange,
    resetImage,
  } = useImageUpload()

  const {
    submit: updateBanner,
    pending,
    errors: fieldErrors,
  } = useFormSubmit(
    (formData) =>
      updateBannerAction(banner.id, formData, urlImage || banner.image),
    {
      // onSuccessRedirect: '/admin/banners',
      onSuccessMessage: 'Category updated successfully',
      onErrorMessage: 'Error updating category',
      resetImageUrl: () => {
        resetImage()
        addImageUrl('')
      },
    }
  )

  const handleGallerySelect = (url: string) => {
    resetImage()
    addImageUrl(url)
    setOpen(false)
  }

  console.log('category:', banner.image)
  console.log('urlImage:', urlImage)

  return (
    <form
      action={updateBanner}
      className='w-full flex flex-col gap-4 justify-center space-y-4 mt-3 md:mt-5'
    >
      <div className='flex gap-4 items-center'>
        <Button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-none'
          disabled={pending}
        >
          <Upload className='w-5 h-5' />
          Upload
        </Button>

        {imageErrors.image && (
          <p className='text-red-500 text-sm'>{imageErrors.image[0]}</p>
        )}

        <Button
          type='button'
          onClick={() => setOpen(true)}
          className='flex items-center gap-2 px-4 py-2 bg-gray-700 text-white hover:bg-gray-800 rounded-none'
        >
          <ImageIcon className='w-5 h-5' />
          Open Media
        </Button>

        <MediaDialog
          open={open}
          setOpen={setOpen}
          onSelect={handleGallerySelect}
        />
      </div>

      {imageURL && <ImagePreview src={imageURL} alt={'image'} />}

      {urlImage && <ImagePreview src={urlImage} alt={'image'} />}

      {!imageURL && !urlImage && banner.image && (
        <ImagePreview src={banner.image} alt={'image'} />
      )}

      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label htmlFor='title' className='text-gray-900 font-semibold py-2'>
          Title
        </Label>
        <Input
          type='text'
          name='title'
          id='title'
          defaultValue={banner.title || ''}
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        />
        {fieldErrors.title && (
          <p className='text-red-500 text-sm mt-1'>{fieldErrors.title[0]}</p>
        )}
      </div>
      <input
        type='file'
        accept='image/*'
        name='image'
        id='image'
        ref={fileInputRef}
        onChange={handleImageChange}
        className='hidden'
      />
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label htmlFor='alt' className='text-gray-900 font-semibold py-2'>
          Alt Text
        </Label>
        <Input
          type='text'
          name='alt'
          id='alt'
          defaultValue={banner.alt || ''}
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        />
        {fieldErrors.alt && (
          <p className='text-red-500 text-sm mt-1'>{fieldErrors.alt[0]}</p>
        )}
      </div>
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label
          htmlFor='description'
          className='text-gray-900 font-semibold py-2'
        >
          Description
        </Label>
        <Textarea
          name='description'
          id='description'
          defaultValue={banner.description || ''}
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        ></Textarea>
        {fieldErrors.description && (
          <p className='text-red-500 text-sm mt-1'>
            {fieldErrors.description[0]}
          </p>
        )}
      </div>
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label
          htmlFor='buttonText'
          className='text-gray-900 font-semibold py-2'
        >
          Button Text
        </Label>
        <Input
          type='text'
          name='buttonText'
          id='buttonText'
          defaultValue={banner.buttonText || ''}
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        />
        {fieldErrors.buttonText && (
          <p className='text-red-500 text-sm mt-1'>
            {fieldErrors.buttonText[0]}
          </p>
        )}
      </div>
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label
          htmlFor='buttonLink'
          className='text-gray-900 font-semibold py-2'
        >
          Button Link
        </Label>
        <Input
          type='text'
          name='buttonLink'
          id='buttonLink'
          defaultValue={banner.buttonLink || ''}
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        />
        {fieldErrors.buttonLink && (
          <p className='text-red-500 text-sm mt-1'>
            {fieldErrors.buttonLink[0]}
          </p>
        )}
      </div>
      <Button
        type='submit'
        disabled={pending}
        className='w-full mt-4 cursor-pointer'
      >
        {pending ? 'Updeting ...' : 'Update Banner'}
      </Button>
    </form>
  )
}

export default UpdateBannerForm
