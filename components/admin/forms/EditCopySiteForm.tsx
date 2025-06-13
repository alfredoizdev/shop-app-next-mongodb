'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { setTheme } from '@/lib/actions/theme'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export type Props = {
  slogan?: string
  title?: string
}

const EditCopySiteForm = ({ slogan, title }: Props) => {
  const [pending, setPedding] = useState(false)
  const [erros, setErrors] = useState<Record<string, string[]>>({})
  const router = useRouter()

  const addProduct = async (formData: FormData) => {
    setPedding(true)
    try {
      const { error, errorFields, message } = await setTheme(formData)
      setErrors(errorFields || {})

      if (error) {
        console.error('Error', message)
        toast.error('Error editing theme')
        return
      }

      toast.success('Theme successfully edited')
      router.push('/admin/theme')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setPedding(false)
      setErrors({})
    }
  }

  return (
    <form
      action={addProduct}
      className='w-full flex flex-col gap-4 justify-center space-y-4 mt-3 md:mt-5'
    >
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label htmlFor='name' className='text-gray-900 font-semibold py-2'>
          Your Product Price
        </Label>
        <Input
          defaultValue={title || ''}
          type='text'
          id='title'
          name='title'
          placeholder='Enter Title'
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
        />
        {erros.title && (
          <p className='text-red-500 text-sm mt-1'>{erros.title[0]}</p>
        )}
      </div>
      <div className='flex flex-col w-full mb-1 md:mb-2'>
        <Label htmlFor='slogan' className='text-gray-900 font-semibold py-2'>
          Subtitle
        </Label>
        <Textarea
          defaultValue={slogan || ''}
          placeholder='Type your slogan'
          id='slogan'
          name='slogan'
          className='w-full px-3 py-1.5 md:py-2 text-gray-900 bg-white rounded-lg border border-gray-500 focus:outline-none'
          rows={4}
        />
        {erros.subtitle && (
          <p className='text-red-500 text-sm mt-1'>{erros.subtitle[0]}</p>
        )}
      </div>
      <Button disabled={pending} type='submit' className='cursor-pointer'>
        {pending ? 'Editing...' : 'Edit Theme Copy Site'}
      </Button>
    </form>
  )
}

export default EditCopySiteForm
