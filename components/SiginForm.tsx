'use client'
import Link from 'next/link'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { toast } from 'sonner'
import { signInAction } from '@/lib/actions/auth.action'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SigInForm = () => {
  const [pending, setPedding] = useState(false)
  const [erros, setErrors] = useState<Record<string, string[]>>({})
  const router = useRouter()

  const sigIn = async (formData: FormData) => {
    setPedding(true)
    try {
      const { error, errorFields, message } = await signInAction(formData)

      if (error) {
        console.log('error', error)
        console.log('errorFields', message)

        setErrors(errorFields || {})
        toast.error(message)
        return
      }

      toast.success(message)
      router.push('/')

      setErrors({})
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setPedding(false)
    }
  }

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-2xl'>Start Session Here</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={sigIn} className='space-y-4'>
          <div className='py-1'>
            <Label className='pb-2' htmlFor='email'>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              name='email'
              placeholder='mymail@correo.com'
              required
            />
            {erros.email && (
              <p className='text-red-500 text-sm'>{erros.email[0]}</p>
            )}
          </div>
          <div className='py-1'>
            <Label className='pb-2' htmlFor='password'>
              Password
            </Label>
            <Input id='password' type='password' name='password' />
            {erros.password && (
              <p className='text-red-500 text-sm'>{erros.password[0]}</p>
            )}
          </div>
          <div className='flex items-center justify-between'>
            <Link
              href='/signup'
              className='text-sm text-blue-500 hover:underline'
            >
              Not account registered? Sign up
            </Link>
          </div>
          <Button
            disabled={pending}
            className='rounded-none cursor-pointer w-full'
            type='submit'
          >
            Sing In
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default SigInForm
