'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { useImageUpload } from '@/hooks/useImageUpload'
import { updateCategoryAction } from '@/lib/actions/categories.action'
import { ImageIcon, Upload } from 'lucide-react'
//import useProductStore from '@/lib/stores/useProductStore'
import { useRef, useState } from 'react'
import MediaDialog from '../dialog/MediaDialog'
import useProductStore from '@/lib/stores/useProductStore'
import ImagePreview from '@/components/ImagePreview'
import { TypeCategory } from '@/types/Category'

const UpdateCategoryForm = ({ category }: { category: TypeCategory }) => {
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
    submit: updateCategory,
    pending,
    errors: fieldErrors,
  } = useFormSubmit(
    (formData) => updateCategoryAction(category.id, formData, urlImage),
    {
      onSuccessRedirect: '/admin/categories',
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

  return (
    <form
      action={updateCategory}
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

      {!imageURL && !urlImage && category.image && (
        <ImagePreview src={category.image} alt={'image'} />
      )}

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
        <Label htmlFor='image' className='text-gray-900 font-semibold py-2'>
          Category Name
        </Label>
        <Input
          type='text'
          id='name'
          name='name'
          defaultValue={category.name || ''} // Set default value from category
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        />
        {fieldErrors.name && (
          <p className='text-red-500 text-sm mt-1'>{fieldErrors.name[0]}</p>
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
          defaultValue={category.description || ''} // Set default value from category
          placeholder='Type your description product'
          id='description'
          name='description'
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
          rows={4}
        />
        {fieldErrors.description && (
          <p className='text-red-500 text-sm mt-1'>
            {fieldErrors.description[0]}
          </p>
        )}
      </div>
      <Button
        disabled={pending}
        type='submit'
        className='cursor-pointer [disabled]:opacity-50'
      >
        {pending ? 'Updating...' : 'Update Category'}
      </Button>
    </form>
  )
}

export default UpdateCategoryForm
