'use client'
import Link from 'next/link'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { toast } from 'sonner'
import { signUpAction } from '@/lib/actions/auth.action'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SigUpForm = () => {
  const [pending, setPedding] = useState(false)
  const [erros, setErrors] = useState<Record<string, string[]>>({})
  const router = useRouter()

  const sigUp = async (formData: FormData) => {
    setPedding(true)
    try {
      const { error, errorFields } = await signUpAction(formData)

      if (error) {
        console.log('error', error)
        console.log('errorFields', errorFields)

        setErrors(errorFields || {})
        toast.error('Error creating session')
        return
      }

      toast.success('Session created successfully')
      router.push('/signin')

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
        <CardTitle className='text-2xl'>Create Session Here</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={sigUp} className='space-y-4'>
          <div className='py-1'>
            <Label className='pb-2' htmlFor='email'>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              name='email'
              placeholder='mymail@correo.com'
            />
            {erros.email && (
              <p className='text-red-500 text-sm'>{erros.email[0]}</p>
            )}
          </div>
          <div className='py-1'>
            <Label className='pb-2' htmlFor='name'>
              Your Name
            </Label>
            <Input id='name' type='text' name='name' />
            {erros.name && (
              <p className='text-red-500 text-sm'>{erros.name[0]}</p>
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
              href='/signin'
              className='text-sm text-blue-500 hover:underline'
            >
              Has an account? Sign in
            </Link>
          </div>
          <Button
            disabled={pending}
            type='submit'
            className='rounded-none cursor-pointer w-full'
          >
            Sing In
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default SigUpForm
