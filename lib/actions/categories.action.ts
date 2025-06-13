'use server'

import { TypeCategory } from '@/types/Category'
import cloudinary from '../cloudinary'
import connectDB from '../db/connect'
import Category from '../db/models/Category'
import { categorySchema } from '../validations'

export const addCategoryAction = async (
  formData: FormData
): Promise<{
  errorFields: Record<string, string[]> | null
  error: boolean
  status: number
  message: string
}> => {
  try {
    const validationSchema = categorySchema.safeParse({
      name: formData.get('name'),
      image: formData.get('image'),
      description: formData.get('description'),
    })

    if (!validationSchema.success) {
      return {
        status: 400,
        error: true,
        errorFields: validationSchema.error.flatten().fieldErrors,
        message: 'Validation failed',
      }
    }
    const { name, image, description } = validationSchema.data

    await connectDB()

    // Image proccessing

    const arrayBuffer = await image.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const imageResponse: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'image',
            folder: 'onlywatch',
          },

          async (error, result) => {
            if (error) {
              console.error('Error uploading image:', error)
              reject(error.message)
            }
            return resolve(result)
          }
        )
        .end(buffer)
    })

    await Category.create({
      name,
      description,
      image: imageResponse.secure_url || '',
    })

    return {
      status: 201,
      error: false,
      errorFields: null,
      message: 'Category added successfully',
    }

    // store to mongodb
  } catch (error) {
    console.error('Error:', error)
    return {
      status: 500,
      error: true,
      errorFields: null,
      message: 'An error occurred while adding the category',
    }
  }
}

export const getCategoriesAction = async (): Promise<{
  status: number
  error: boolean
  categories: TypeCategory[]
  message: string
}> => {
  try {
    await connectDB()
    const categories = await Category.find().sort({ createdAt: -1 })

    return {
      status: 200,
      error: false,
      categories: JSON.parse(JSON.stringify(categories)),
      message: 'Categories fetched successfully',
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      status: 500,
      error: true,
      categories: [],
      message: 'An error occurred while fetching categories',
    }
  }
}
