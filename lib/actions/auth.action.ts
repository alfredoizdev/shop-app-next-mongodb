'use server'

import { signIn } from '@/auth'
import { TUser } from '@/types/User'
import User from '../db/models/User.model'
import bcrypt from 'bcryptjs'
import connectDB from '../db/connect'
import { SignInSchema, SignUpschema } from '../validations'

export const signUpAction = async (
  product: FormData
): Promise<{
  error: boolean
  status: number
  message: string
  errorFields: Record<string, string[]> | null
  results: TUser | null
}> => {
  try {
    const validatedFields = SignUpschema.safeParse({
      email: product.get('email'),
      name: product.get('name'),
      password: product.get('password'),
    })
    if (!validatedFields.success) {
      return {
        error: true,
        errorFields: validatedFields.error.flatten().fieldErrors,
        status: 400,
        message: 'Validation error',
        results: null,
      }
    }

    const { email, name, password } = validatedFields.data

    await connectDB()
    const user = await User.findOne({ email })

    if (user) {
      return {
        error: true,
        errorFields: null,
        status: 404,
        message: 'User already exists',
        results: null,
      }
    }

    // has password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    if (!newUser) {
      return {
        error: true,
        errorFields: null,
        status: 404,
        message: 'User not created',
        results: null,
      }
    }

    return {
      error: false,
      errorFields: null,
      status: 200,
      message: 'User created successfully',
      results: JSON.parse(JSON.stringify(newUser)),
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      results: null,
      errorFields: null,
      error: true,
      status: 500,
      message: 'Internal server error',
    }
  }
}

export const signInAction = async (
  params: FormData
): Promise<{
  error: boolean
  errorFields: Record<string, string[]> | null
  status: number
  message: string
  results: TUser | null
}> => {
  try {
    const validatedFields = SignInSchema.safeParse({
      email: params.get('email'),
      password: params.get('password'),
    })
    if (!validatedFields.success) {
      return {
        errorFields: validatedFields.error.flatten().fieldErrors,
        error: true,
        status: 400,
        message: 'Validation error',
        results: null,
      }
    }
    const { email, password } = validatedFields.data

    await connectDB()
    const user = await User.findOne({ email })

    if (!user) {
      return {
        errorFields: null,
        error: true,
        status: 404,
        message: 'Invalid credentials',
        results: null,
      }
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
      return {
        errorFields: null,
        error: true,
        status: 404,
        message: 'Invalid credentials',
        results: null,
      }
    }

    // sign in user
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return {
        errorFields: null,
        error: true,
        status: 404,
        message: 'Invalid credentials',
        results: null,
      }
    }

    return {
      error: false,
      status: 200,
      message: 'User logged in successfully',
      results: JSON.parse(JSON.stringify(user)),
      errorFields: null,
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      errorFields: null,
      results: null,
      error: true,
      status: 500,
      message: 'Internal server error',
    }
  }
}
