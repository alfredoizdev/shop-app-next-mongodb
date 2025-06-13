'use server'
import { ProductType } from '@/types/Products'
import cloudinary from '../cloudinary'
import connectDB from '../db/connect'
import Product from '../db/models/Product.model'

import { revalidatePath } from 'next/cache'
import { ProductSchema } from '../validations'

function extractPublicIdFromUrl(url: string): string | null {
  try {
    const parts = new URL(url).pathname.split('/')
    const uploadIndex = parts.indexOf('upload')

    if (uploadIndex === -1 || uploadIndex + 1 >= parts.length) return null

    let publicIdParts = parts.slice(uploadIndex + 1)
    if (/^v\d+$/.test(publicIdParts[0])) publicIdParts = publicIdParts.slice(1)

    const lastPart = publicIdParts.pop()
    if (!lastPart) return null

    const lastPartNoExt = lastPart.split('.')[0]
    return [...publicIdParts, lastPartNoExt].join('/')
  } catch {
    return null
  }
}

export type FormStateType = {
  errorFields: Record<string, string[]> | null
  error: boolean
  status: number
  message: string
}

export const addProductAction = async (
  product: FormData,
  urlImage?: string
): Promise<{
  errorFields: Record<string, string[]> | null
  error: boolean
  status: number
  message: string
}> => {
  try {
    const imageValue = product.get('image')
    const validatedFields = ProductSchema.safeParse({
      image:
        imageValue && typeof imageValue !== 'string' && imageValue.size > 0
          ? imageValue
          : undefined,
      name: product.get('name'),
      price: product.get('price'),
      description: product.get('description'),
      category: product.get('category'),
      inStock: Number(product.get('inStock')),
    })

    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors)
      return {
        errorFields: validatedFields.error.flatten().fieldErrors,
        error: true,
        status: 400,
        message: 'Validation error',
      }
    }
    const { image, name, price, description, category, inStock } =
      validatedFields.data

    // Check if the image is a valid file

    await connectDB()

    // Image proccessing
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

    // store to mongodb

    const img = imageResponse?.secure_url ? imageResponse.secure_url : urlImage

    console.log('img', img)

    await Product.create({
      imageUrl: img,
      name,
      price: parseFloat(price),
      description,
      category,
      inStock,
    })

    revalidatePath('/admin/products', 'page')
    // redirect('/admin/products')

    return {
      errorFields: null,
      message: 'Product added successfully',
      status: 200,
      error: false,
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      errorFields: null,
      error: true,
      status: 500,
      message: 'Internal server error',
    }
  }
}

export const fetchProductsAction = async (): Promise<{
  error: boolean
  status: number
  message: string
  results: ProductType[]
}> => {
  try {
    await connectDB()
    const products = await Product.find({}).sort({ createdAt: -1 })
    return {
      error: false,
      status: 200,
      message: 'Products fetched successfully',
      results: JSON.parse(JSON.stringify(products)),
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      results: [],
      error: true,
      status: 500,
      message: 'Internal server error',
    }
  }
}

export const fetchCategoryProductsAction = async (category: string) => {
  try {
    await connectDB()
    const products = await Product.find({ category }).sort({
      createdAt: -1,
    })

    if (!products) {
      return {
        error: true,
        status: 404,
        message: 'No products found',
        results: [],
      }
    }

    return {
      error: false,
      status: 200,
      message: 'Products fetched successfully',
      results: products,
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      results: [],
      error: true,
      status: 500,
      message: 'Internal server error',
    }
  }
}

export const fetchProductFilteredSearchParamsAction = async (
  searchParams: string
): Promise<{
  error: boolean
  status: number
  message: string
  results: ProductType[]
}> => {
  const query = searchParams !== '' ? searchParams : ''

  try {
    await connectDB()
    const products = await Product.find({
      name: { $regex: query, $options: 'i' },
    }).sort({ createdAt: -1 })

    if (!products) {
      return {
        error: true,
        status: 404,
        message: 'No products found',
        results: [],
      }
    }

    return {
      error: false,
      status: 200,
      message: 'Products fetched successfully',
      results: products,
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      results: [],
      error: true,
      status: 500,
      message: 'Internal server error',
    }
  }
}

export const fetchProductByIdAction = async (
  id: string
): Promise<{
  error: boolean
  status: number
  message: string
  result: ProductType | null
}> => {
  try {
    await connectDB()
    const product = await Product.findById(id.toString())

    const result = JSON.parse(JSON.stringify(product))

    if (!result) {
      return {
        error: true,
        status: 404,
        message: 'Product not found',
        result: null,
      }
    }
    return {
      error: false,
      status: 200,
      message: 'Product fetched successfully',
      result: result,
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      result: null,
      error: true,
      status: 500,
      message: 'Internal server error',
    }
  }
}

export const fetchProductsListAction = async (): Promise<{
  error: boolean
  status: number
  message: string
  results: ProductType[]
}> => {
  try {
    await connectDB()
    const products = await Product.find({}).sort({ createdAt: -1 })

    if (!products) {
      return {
        error: true,
        status: 404,
        message: 'No products found',
        results: [],
      }
    }

    return {
      error: false,
      status: 200,
      message: 'Products fetched successfully',
      results: products,
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      results: [],
      error: true,
      status: 500,
      message: 'Internal server error',
    }
  }
}

export const updateProductAction = async (
  id: string,
  product: FormData,
  imageOldUrl: string
): Promise<{
  errorFields: Record<string, string[]> | null
  error: boolean
  status: number
  message: string
}> => {
  try {
    const imageValue = product.get('image')
    const validatedFields = ProductSchema.safeParse({
      image:
        imageValue && typeof imageValue !== 'string' && imageValue.size > 0
          ? imageValue
          : undefined,
      name: product.get('name'),
      price: product.get('price'),
      description: product.get('description'),
      category: product.get('category'),
      inStock: Number(product.get('inStock')),
    })

    if (!validatedFields.success) {
      console.log(
        'validatedFields',
        validatedFields?.error.flatten().fieldErrors
      )
      return {
        errorFields: validatedFields.error.flatten().fieldErrors,
        error: true,
        status: 400,
        message: 'Validation error',
      }
    }

    const { image, name, price, description, category, inStock } =
      validatedFields.data

    await connectDB()

    const existingProduct = await Product.findById(id)
    if (!existingProduct) {
      return {
        errorFields: null,
        error: true,
        status: 404,
        message: 'Product not found',
      }
    }

    // Image proccessing
    let imageUrl = ''
    if (image && typeof image !== 'string' && image.size > 0) {
      // If a new image is provided, delete the old one from Cloudinary
      const imagePublicIdExtracted = extractPublicIdFromUrl(imageOldUrl)

      if (!imagePublicIdExtracted) {
        return {
          errorFields: null,
          error: true,
          status: 400,
          message: 'Invalid image URL format',
        }
      }
      // Delete the previous image from Cloudinary
      const result = await cloudinary.uploader.destroy(imagePublicIdExtracted, {
        resource_type: 'image',
      })

      if (result.result !== 'ok') {
        return {
          errorFields: null,
          error: true,
          status: 500,
          message: 'Failed to delete previous image from Cloudinary',
        }
      }

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
            (error, result) => {
              if (error) reject(error.message)
              resolve(result)
            }
          )
          .end(buffer)
      })

      imageUrl = imageResponse.secure_url || ''
    } else {
      imageUrl = existingProduct.imageUrl // conserva imagen anterior
    }

    // store to mongodb
    await Product.findByIdAndUpdate(id, {
      imageUrl,
      name,
      price: parseFloat(price),
      description,
      category,
      inStock,
    }).exec()

    // Revalidate the path to update the cache

    revalidatePath('/admin/products', 'page')

    return {
      errorFields: null,
      message: 'Product updated successfully',
      status: 200,
      error: false,
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      errorFields: null,
      error: true,
      status: 500,
      message: 'Internal server error',
    }
  }
}

export const deleteProductAction = async (
  id: string,
  imagePublicId: string
): Promise<{
  error: boolean
  status: number
  message: string
}> => {
  try {
    if (!id || !imagePublicId) {
      return {
        error: true,
        status: 400,
        message: 'Product ID and image public ID are required',
      }
    }

    await connectDB()

    const imagePublicIdExtracted = extractPublicIdFromUrl(imagePublicId)
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

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return {
        error: true,
        status: 404,
        message: 'Product not found',
      }
    }

    revalidatePath('/admin/products', 'page')

    return {
      error: false,
      status: 200,
      message: 'Product deleted successfully',
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      error: true,
      status: 500,
      message: 'Internal server error',
    }
  }
}
