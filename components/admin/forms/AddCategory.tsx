'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addCategoryAction } from '@/lib/actions/categories.action'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const AddCategoryForm = () => {
  const [pending, setPedding] = useState(false)
  const [imageURL, setImageURL] = useState('')
  const [erros, setErrors] = useState<Record<string, string[]>>({})
  const router = useRouter()

  const addCategory = async (formData: FormData) => {
    setPedding(true)
    try {
      const { error, errorFields, message } = await addCategoryAction(formData)
      setErrors(errorFields || {})

      if (error) {
        console.error('Error adding product:', message)
        toast.error('Error adding product')
        return
      }

      toast.success('Product added successfully')
      router.push('/admin/categories')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setPedding(false)
      setImageURL('')
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        setImageURL(URL.createObjectURL(file))
      }
    }
  }

  return (
    <form
      action={addCategory}
      className='w-full flex flex-col gap-4 justify-center space-y-4 mt-3 md:mt-5'
    >
      {imageURL && (
        <Image
          src={imageURL}
          alt='Product Image'
          width={500}
          height={500}
          className='w-full h-auto rounded-lg mb-4'
        />
      )}
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label htmlFor='image' className='text-gray-900 font-semibold py-2'>
          Category Image
        </Label>
        <Input
          type='file'
          accept='image/*'
          id='image'
          name='image'
          onChange={handleImageChange}
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        />
        {erros.image && (
          <p className='text-red-500 text-sm mt-1'>{erros.image[0]}</p>
        )}
      </div>
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label htmlFor='image' className='text-gray-900 font-semibold py-2'>
          Category Name
        </Label>
        <Input
          type='text'
          id='name'
          name='name'
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        />
        {erros.name && (
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
      <Button
        disabled={pending}
        type='submit'
        className='cursor-pointer [disabled]:opacity-50'
      >
        {pending ? 'Adding...' : 'Add Product'}
      </Button>
    </form>
  )
}

export default AddCategoryForm
