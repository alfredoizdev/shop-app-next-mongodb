'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addBannerAction } from '@/lib/actions/media.action'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

const AddBannerBannerForm = () => {
  const [pending, setPedding] = useState(false)
  const [imageURL, setImageURL] = useState('')
  const [erros, setErrors] = useState<Record<string, string[]>>({})
  const router = useRouter()

  const addBanner = async (formData: FormData) => {
    setPedding(true)
    try {
      const { error, errorFields, message } = await addBannerAction(formData)
      setErrors(errorFields || {})

      if (error) {
        console.log('Error adding product:', message)
        toast.error('Error adding product')
        return
      }

      toast.success('Product added successfully')
      router.push('/admin/banners')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
        console.error('Error adding banner:', error.message)
        return
      }
    } finally {
      setPedding(false)
      setImageURL('')
      setErrors({})
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
        setImageURL(URL.createObjectURL(file))
      }
    }
  }

  return (
    <form
      action={addBanner}
      className='w-full flex flex-col gap-4 justify-center space-y-4 mt-3 md:mt-5'
    >
      {imageURL && (
        <Image
          src={imageURL}
          alt='Product Image'
          width={1000}
          height={1000}
          className='w-full h-auto rounded-lg mb-4'
        />
      )}
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label htmlFor='title' className='text-gray-900 font-semibold py-2'>
          Title
        </Label>
        <Input
          type='text'
          name='title'
          id='title'
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        />
        {erros.title && (
          <p className='text-red-500 text-sm mt-1'>{erros.title[0]}</p>
        )}
      </div>
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label htmlFor='image' className='text-gray-900 font-semibold py-2'>
          Image
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
        <Label htmlFor='alt' className='text-gray-900 font-semibold py-2'>
          Alt Text
        </Label>
        <Input
          type='text'
          name='alt'
          id='alt'
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        />
        {erros.alt && (
          <p className='text-red-500 text-sm mt-1'>{erros.alt[0]}</p>
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
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        ></Textarea>
        {erros.description && (
          <p className='text-red-500 text-sm mt-1'>{erros.description[0]}</p>
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
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        />
        {erros.buttonText && (
          <p className='text-red-500 text-sm mt-1'>{erros.buttonText[0]}</p>
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
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        />
        {erros.buttonLink && (
          <p className='text-red-500 text-sm mt-1'>{erros.buttonLink[0]}</p>
        )}
      </div>
      <Button
        type='submit'
        disabled={pending}
        className='w-full mt-4 cursor-pointer'
      >
        {pending ? 'Adding...' : 'Add Banner'}
      </Button>
    </form>
  )
}

export default AddBannerBannerForm
