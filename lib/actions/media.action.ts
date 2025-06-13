'use server'

import { BannerType } from '@/types/Media'
import cloudinary from '../cloudinary'
import connectDB from '../db/connect'
import Banner from '../db/models/Banner'
import { bannerSchema } from '../validations'

export type MediaImageType = {
  id: string
  url: string
}

export const addBannerAction = async (
  banner: FormData
): Promise<{
  error: boolean
  errorFields: Record<string, string[]> | null
  status: number
  message: string
  results: null
}> => {
  try {
    const validatedFields = bannerSchema.safeParse({
      title: banner.get('title'),
      image: banner.get('image'),
      description: banner.get('description'),
      alt: banner.get('alt'),
      buttonText: banner.get('buttonText'),
      buttonLink: banner.get('buttonLink'),
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
    const { title, image, description, alt, buttonText, buttonLink } =
      validatedFields.data

    await connectDB()

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

    await Banner.create({
      title,
      image: imageResponse.secure_url || '',
      description,
      alt,
      buttonText,
      buttonLink,
    })

    // Placeholder for actual banner handling logic
    return {
      error: false,
      errorFields: null,
      status: 200,
      message: 'Banner handled successfully',
      results: null,
    }
  } catch (error) {
    console.error('Error handling banner:', error)
    return {
      error: true,
      errorFields: null,
      status: 500,
      message: 'Internal server error',
      results: null,
    }
  }
}

export const fetchBannersAction = async (): Promise<{
  error: boolean
  status: number
  message: string
  results: BannerType[]
}> => {
  try {
    await connectDB()
    const banners = await Banner.find({}).sort({ createdAt: -1 })
    return {
      error: false,
      status: 200,
      message: 'Banners fetched successfully',
      results: JSON.parse(JSON.stringify(banners)),
    }
  } catch (error) {
    console.error('Error fetching banners:', error)
    return {
      error: true,
      status: 500,
      message: 'Internal server error',
      results: [],
    }
  }
}

export const listMediaAction = async (): Promise<{
  error: boolean
  errorMessage?: string
  result: MediaImageType[] | []
}> => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'onlywatch/',
      max_results: 50,
      resource_type: 'image',
      context: true,
    })

    if (result.resources.length === 0) {
      return {
        error: false,
        result: [],
      }
    }

    return {
      error: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result: result.resources.map((resource: any) => ({
        id: resource.public_id,
        url: resource.secure_url,
      })),
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        errorMessage: error.message,
        result: [],
      }
    }
    // Handle unexpected error types
    return {
      error: true,
      errorMessage: 'An unknown error occurred.',
      result: [],
    }
  }
}
