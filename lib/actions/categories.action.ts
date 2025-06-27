'use server'

import { TypeCategory } from '@/types/Category'
import cloudinary from '../cloudinary'
import connectDB from '../db/connect'
import Category from '../db/models/Category'
import { categorySchema } from '../validations'
import { revalidatePath } from 'next/cache'
import { extractPublicIdFromUrl } from '../helpers/extarctingId'

export const addCategoryAction = async (
  formData: FormData,
  urlImage: string
): Promise<{
  errorFields: Record<string, string[]> | null
  error: boolean
  status: number
  message: string
}> => {
  try {
    const imageValue = formData.get('image')
    const validationSchema = categorySchema.safeParse({
      name: formData.get('name'),
      image:
        imageValue && typeof imageValue !== 'string' && imageValue.size > 0
          ? imageValue
          : undefined,
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

    // Image processing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let imageResponse: any = null

    if (!urlImage) {
      const arrayBuffer = await image.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      imageResponse = await new Promise((resolve, reject) => {
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
    }

    // If the image is not provided, use the existing image URL
    const img = imageResponse?.secure_url ? imageResponse.secure_url : urlImage

    await Category.create({
      name,
      description,
      image: img,
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

export const deleteCategoryAction = async (
  id: string
): Promise<{
  status: number
  error: boolean
  message: string
}> => {
  try {
    await connectDB()
    const category = await Category.findByIdAndDelete(id)

    if (!category) {
      return {
        status: 404,
        error: true,
        message: 'Category not found',
      }
    }

    const imagePublicIdExtracted = extractPublicIdFromUrl(category.image)
    if (!imagePublicIdExtracted) {
      return {
        error: true,
        status: 400,
        message: 'Invalid image URL format',
      }
    }

    const result = await cloudinary.uploader.destroy(imagePublicIdExtracted, {
      resource_type: 'image',
    })

    if (result.result !== 'ok') {
      return {
        error: true,
        status: 500,
        message: 'Failed to delete image from Cloudinary',
      }
    }

    revalidatePath('/admin/categories', 'page')

    return {
      status: 200,
      error: false,
      message: 'Category deleted successfully',
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      status: 500,
      error: true,
      message: 'An error occurred while deleting the category',
    }
  }
}

export const getCategoryByIdAction = async (
  id: string
): Promise<{
  status: number
  error: boolean
  category: TypeCategory | null
  message: string
}> => {
  try {
    await connectDB()
    const category = await Category.findById(id)
    if (!category) {
      return {
        status: 404,
        error: true,
        category: null,
        message: 'Category not found',
      }
    }
    return {
      status: 200,
      error: false,
      category: JSON.parse(JSON.stringify(category)),
      message: 'Category fetched successfully',
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      status: 500,
      error: true,
      category: null,
      message: 'An error occurred while fetching the category',
    }
  }
}

export const updateCategoryAction = async (
  id: string,
  formData: FormData,
  urlImage: string
): Promise<{
  status: number
  error: boolean
  message: string
}> => {
  try {
    const imageValue = formData.get('image')
    const validationSchema = categorySchema.safeParse({
      name: formData.get('name'),
      image:
        imageValue && typeof imageValue !== 'string' && imageValue.size > 0
          ? imageValue
          : undefined,
      description: formData.get('description'),
    })

    if (!validationSchema.success) {
      return {
        status: 400,
        error: true,
        message: 'Validation failed',
      }
    }

    const { name, image, description } = validationSchema.data

    await connectDB()
    const existingCategory = await Category.findById(id)
    if (!existingCategory) {
      return {
        status: 404,
        error: true,
        message: 'Category not found',
      }
    }

    // Determine final image
    let finalImage = existingCategory.image
    if (urlImage) {
      finalImage = urlImage
    } else if (image) {
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
      finalImage = imageResponse.secure_url
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description, image: finalImage },
      { new: true }
    )

    if (!updatedCategory) {
      return {
        status: 404,
        error: true,
        message: 'Category not found',
      }
    }

    revalidatePath(`/admin/category/update/${id}`, 'page')

    return {
      status: 200,
      error: false,
      message: 'Category updated successfully',
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      status: 500,
      error: true,
      message: 'An error occurred while updating the category',
    }
  }
}
