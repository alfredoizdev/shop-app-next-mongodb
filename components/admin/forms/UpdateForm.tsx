'use client'
import { Input } from '../../ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '../../ui/button'
import { updateProductAction } from '@/lib/actions/product.action'
import { useRef, useState } from 'react'

import { CATEGORY_ENUM } from '@/lib/constants/categories'

import { ProductType } from '@/types/Products'
import { ImageIcon, Upload } from 'lucide-react'
import useProductStore from '@/lib/stores/useProductStore'
import MediaDialog from '../dialog/MediaDialog'

import { useFormSubmit } from '@/hooks/useFormSubmit'
import { useImageUpload } from '@/hooks/useImageUpload'
import ImagePreview from '@/components/ImagePreview'

const UpdateForm = ({ product }: { product: ProductType }) => {
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
    submit: updateProduct,
    pending,
    errors: fieldErrors,
  } = useFormSubmit(
    (formData) =>
      updateProductAction(product.id, formData, urlImage || product.imageUrl),
    {
      onSuccessRedirect: '/admin/products',
      onSuccessMessage: 'Product edit successfully',
      onErrorMessage: 'Error editing product',
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
      action={updateProduct}
      className='w-full flex flex-col gap-4 justify-center space-y-4 mt-3 md:mt-5'
    >
      <div className='flex gap-4 items-center'>
        {/* Botón para subir imagen */}
        <Button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-none hover:bg-blue-700 cursor-pointer'
          // disabled={pending}
        >
          <Upload className='w-5 h-5' />
          Upload
        </Button>
        <Button
          type='button'
          onClick={() => setOpen(true)}
          className='flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-none hover:bg-gray-800 cursor-pointer'
        >
          <ImageIcon className='w-5 h-5' />
          Open Media
        </Button>

        <MediaDialog
          open={open}
          setOpen={setOpen}
          onSelect={handleGallerySelect}
        />
        {imageErrors.image && (
          <p className='text-red-500 text-sm mt-1'>{imageErrors.image[0]}</p>
        )}
      </div>
      {imageURL && <ImagePreview src={imageURL} alt={'image'} />}

      {urlImage && <ImagePreview src={urlImage} alt={'image'} />}

      {!imageURL && !urlImage && product.imageUrl && (
        <ImagePreview src={product.imageUrl} alt={'image'} />
      )}

      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <input
          type='file'
          accept='image/*'
          id='image'
          name='image'
          onChange={handleImageChange}
          ref={fileInputRef}
          className='hidden'
        />
      </div>
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label htmlFor='name' className='text-gray-900 font-semibold py-2'>
          Your Product Name
        </Label>
        <Input
          defaultValue={product.name}
          type='text'
          id='name'
          name='name'
          placeholder='Enter Product Name'
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        />
        {fieldErrors.name && (
          <p className='text-red-500 text-sm mt-1'>{fieldErrors.name[0]}</p>
        )}
      </div>
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label htmlFor='name' className='text-gray-900 font-semibold py-2'>
          Your Product Price
        </Label>
        <Input
          defaultValue={product.price}
          type='number'
          id='price'
          name='price'
          placeholder='Enter Product Price'
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        />
        {fieldErrors.price && (
          <p className='text-red-500 text-sm mt-1'>{fieldErrors.name[0]}</p>
        )}
      </div>
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label htmlFor='link' className='text-gray-900 font-semibold py-2'>
          Seller&lsquo;s Link
        </Label>
        {fieldErrors.link && (
          <p className='text-red-500 text-sm mt-1'>{fieldErrors.link[0]}</p>
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
          defaultValue={product.description}
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
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label htmlFor='category' className='text-gray-900 font-semibold py-2'>
          Category
        </Label>
        <select
          defaultValue={product.category}
          id='category'
          name='category'
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        >
          {CATEGORY_ENUM.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label htmlFor='inStock' className='text-gray-900 font-semibold py-2'>
          In Stock
        </Label>
        <Input
          defaultValue={product.inStock ? product.inStock : 0}
          type='number'
          id='inStock'
          name='inStock'
          min='0'
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        />
        {fieldErrors.inStock && (
          <p className='text-red-500 text-sm mt-1'>{fieldErrors.inStock[0]}</p>
        )}
      </div>

      <Button disabled={pending} type='submit' className='cursor-pointer'>
        {pending ? 'Updating...' : 'Update Product'}
      </Button>
    </form>
  )
}

export default UpdateForm
