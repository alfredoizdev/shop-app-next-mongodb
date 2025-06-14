'use client'
import { Upload, Image as ImageIcon } from 'lucide-react'
import { Input } from '../../ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '../../ui/button'
import { addProductAction } from '@/lib/actions/product.action'
import { useState, useRef } from 'react'

import { CATEGORY_ENUM } from '@/lib/constants/categories'
import MediaDialog from '../dialog/MediaDialog'
import useProductStore from '@/lib/stores/useProductStore'
import { useImageUpload } from '@/hooks/useImageUpload'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import ImagePreview from '@/components/ImagePreview'

const AddForm = () => {
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
    submit: addProduct,
    pending,
    errors: fieldErrors,
  } = useFormSubmit((formData) => addProductAction(formData, urlImage), {
    onSuccessRedirect: '/admin/products',
    onSuccessMessage: 'Product added successfully',
    onErrorMessage: 'Error adding product',
    resetImageUrl: () => {
      resetImage()
      addImageUrl('')
    },
  })

  const handleGallerySelect = (url: string) => {
    resetImage()
    addImageUrl(url)
    setOpen(false)
  }

  return (
    <form
      action={addProduct}
      className='w-full flex flex-col gap-4 justify-center space-y-4 mt-3 md:mt-5'
    >
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label className='text-gray-900 font-semibold py-2'>
          Product Image
        </Label>

        <div className='flex gap-4 items-center'>
          <Button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700'
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
            className='flex items-center gap-2 px-4 py-2 bg-gray-700 text-white hover:bg-gray-800'
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

      <div className='flex flex-col'>
        <Label htmlFor='name' className='font-semibold py-2'>
          Product Name
        </Label>
        <Input id='name' name='name' />
        {fieldErrors.name && (
          <p className='text-red-500 text-sm'>{fieldErrors.name[0]}</p>
        )}
      </div>

      <div className='flex flex-col'>
        <Label htmlFor='price' className='font-semibold py-2'>
          Price
        </Label>
        <Input id='price' name='price' type='number' />
        {fieldErrors.price && (
          <p className='text-red-500 text-sm'>{fieldErrors.price[0]}</p>
        )}
      </div>

      <div className='flex flex-col'>
        <Label htmlFor='description' className='font-semibold py-2'>
          Description
        </Label>
        <Textarea id='description' name='description' rows={4} />
        {fieldErrors.description && (
          <p className='text-red-500 text-sm'>{fieldErrors.description[0]}</p>
        )}
      </div>

      <div className='flex flex-col'>
        <Label htmlFor='category' className='font-semibold py-2'>
          Category
        </Label>
        <select id='category' name='category' className='border px-2 py-1'>
          {CATEGORY_ENUM.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col'>
        <Label htmlFor='inStock' className='font-semibold py-2'>
          In Stock
        </Label>
        <Input id='inStock' name='inStock' type='number' min='0' />
        {fieldErrors.inStock && (
          <p className='text-red-500 text-sm'>{fieldErrors.inStock[0]}</p>
        )}
      </div>

      <Button disabled={pending} type='submit'>
        {pending ? 'Adding...' : 'Add Product'}
      </Button>
    </form>
  )
}

export default AddForm
