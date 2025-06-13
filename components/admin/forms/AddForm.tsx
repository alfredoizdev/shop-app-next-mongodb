'use client'
import { Upload, Image as ImageIcon } from 'lucide-react'
import { Input } from '../../ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '../../ui/button'
import { addProductAction } from '@/lib/actions/product.action'
import { toast } from 'sonner'
import { ChangeEvent, useState, useRef } from 'react'

import Image from 'next/image'
import { CATEGORY_ENUM } from '@/lib/constants/categories'
import { useRouter } from 'next/navigation'
import MediaDialog from '../dialog/MediaDialog'
import useProductStore from '@/lib/stores/useProductStore'

const AddForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [pending, setPedding] = useState(false)
  const [imageURLFromFile, setImageURLFromFile] = useState('')
  const [erros, setErrors] = useState<Record<string, string[]>>({})
  const router = useRouter()
  const { urlImage, addImageUrl } = useProductStore((state) => state)
  const [open, setOpen] = useState(false)

  const addProduct = async (formData: FormData) => {
    setPedding(true)
    try {
      const { error, errorFields, message } = await addProductAction(
        formData,
        urlImage
      )
      setErrors(errorFields || {})

      if (error) {
        console.error('Error adding product:', message)
        toast.error('Error adding product')
        return
      }

      toast.success('Product added successfully')
      router.push('/admin/products')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setPedding(false)
      setImageURLFromFile('')
      setErrors({})
      addImageUrl('')
    }
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const fileSize = file.size

      if (Math.round(fileSize / 1024) > 1024) {
        toast.error('File size must be less than 1MB')
        setErrors((prev) => ({
          ...prev,
          image: ['File size must be less than 1MB'],
        }))
      } else {
        setImageURLFromFile(URL.createObjectURL(file))
        addImageUrl('') // Reset gallery image URL when a new file is selected
      }
    }
  }

  const handleGallerySelect = (url: string) => {
    setImageURLFromFile('')
    addImageUrl(url) // o lo que uses para setear la imagen de galería
    setOpen(false)
  }

  return (
    <>
      <form
        action={addProduct}
        className='w-full flex flex-col gap-4 justify-center space-y-4 mt-3 md:mt-5'
      >
        <div className='flex flex-col w-full mb-1 md:mb-2'>
          <Label className='text-gray-900 font-semibold py-2'>
            Product Image
          </Label>

          <div className='flex gap-4 items-center'>
            {/* Botón para subir imagen */}
            <Button
              type='button'
              onClick={() => fileInputRef.current?.click()}
              className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-none hover:bg-blue-700 cursor-pointer'
              disabled={pending}
            >
              <Upload className='w-5 h-5' />
              Upload
            </Button>
            {erros.image && (
              <p className='text-red-500 text-sm mt-1'>{erros.image[0]}</p>
            )}

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
          </div>
          {imageURLFromFile && (
            <div className='flex justify-center items-center mb-4'>
              <div className='w-52 h-52 md:w-64 md:h-64 bg-gray-100 border border-gray-300 rounded-lg flex justify-center items-center relative'>
                <Image
                  src={imageURLFromFile}
                  alt='Product Image'
                  width={200}
                  height={200}
                  className='w-full h-auto rounded-lg mb-4'
                />
              </div>
            </div>
          )}
          {urlImage && (
            <div className='flex justify-center items-center mb-4'>
              <div className='w-52 h-52 md:w-64 md:h-64 bg-gray-100 border border-gray-300 rounded-lg flex justify-center items-center relative'>
                <Image
                  src={urlImage}
                  alt='Product Image'
                  width={200}
                  height={200}
                  className='w-full h-auto rounded-lg mb-4'
                />
              </div>
            </div>
          )}
        </div>
        <input
          type='file'
          accept='image/*'
          id='image'
          name='image'
          onChange={handleImageChange}
          ref={fileInputRef}
          defaultValue={imageURLFromFile}
          className='hidden'
        />
        <div className='flex flex-col w-full mb-1 md:mb-2'>
          <Label htmlFor='name' className='text-gray-900 font-semibold py-2'>
            Your Product Name
          </Label>
          <Input
            type='text'
            id='name'
            name='name'
            placeholder='Enter Product Name'
            className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
          />
          {erros.name && (
            <p className='text-red-500 text-sm mt-1'>{erros.name[0]}</p>
          )}
        </div>
        <div className='flex flex-col w-full mb-1 md:mb-2'>
          <Label htmlFor='name' className='text-gray-900 font-semibold py-2'>
            Your Product Price
          </Label>
          <Input
            type='number'
            id='price'
            name='price'
            placeholder='Enter Product Price'
            className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
          />
          {erros.price && (
            <p className='text-red-500 text-sm mt-1'>{erros.name[0]}</p>
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
            placeholder='Type your description product'
            id='description'
            name='description'
            className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
            rows={4}
          />
          {erros.description && (
            <p className='text-red-500 text-sm mt-1'>{erros.description[0]}</p>
          )}
        </div>
        <div className='flex flex-col w-full mb-1 md:mb-2'>
          <Label
            htmlFor='category'
            className='text-gray-900 font-semibold py-2'
          >
            Category
          </Label>
          <select
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
            type='number'
            id='inStock'
            name='inStock'
            min='0'
            className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
          />
          {erros.inStock && (
            <p className='text-red-500 text-sm mt-1'>{erros.inStock[0]}</p>
          )}
        </div>

        <Button disabled={pending} type='submit' className='cursor-pointer'>
          {pending ? 'Adding...' : 'Add Product'}
        </Button>
      </form>
    </>
  )
}

export default AddForm
