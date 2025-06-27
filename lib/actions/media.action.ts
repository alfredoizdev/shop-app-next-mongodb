'use server'

import { BannerType } from '@/types/Media'
import cloudinary from '../cloudinary'
import connectDB from '../db/connect'
import Banner from '../db/models/Banner'
import { bannerSchema } from '../validations'
import { revalidatePath } from 'next/cache'

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

export const getBannerByIdAction = async (
  id: string
): Promise<{
  error: boolean
  status: number
  message: string
  results: BannerType | null
}> => {
  try {
    await connectDB()
    const banner = await Banner.findById(id)
    if (!banner) {
      return {
        error: true,
        status: 404,
        message: 'Banner not found',
        results: null,
      }
    }
    return {
      error: false,
      status: 200,
      message: 'Banner fetched successfully',
      results: JSON.parse(JSON.stringify(banner)),
    }
  } catch (error) {
    console.error('Error fetching banner by ID:', error)
    return {
      error: true,
      status: 500,
      message: 'Internal server error',
      results: null,
    }
  }
}

export const updateBannerAction = async (
  id: string,
  banner: FormData,
  urlImage: string
): Promise<{
  error: boolean
  errorFields: Record<string, string[]> | null
  status: number
  message: string
  results: null
}> => {
  try {
    const imageValue = banner.get('image')
    const validatedFields = bannerSchema.safeParse({
      title: banner.get('title'),
      image:
        imageValue && typeof imageValue !== 'string' && imageValue.size > 0
          ? imageValue
          : undefined,
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
    const existingBanner = await Banner.findById(id)
    if (!existingBanner) {
      return {
        error: true,
        errorFields: null,
        status: 404,
        message: 'Banner not found',
        results: null,
      }
    }
    // Determine final image url
    let finalImage = existingBanner.image
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

    await Banner.findByIdAndUpdate(id, {
      title,
      image: finalImage,
      description,
      alt,
      buttonText,
      buttonLink,
    })
    return {
      error: false,
      errorFields: null,
      status: 200,
      message: 'Banner updated successfully',
      results: null,
    }
  } catch (error) {
    console.error('Error updating banner:', error)
    return {
      error: true,
      errorFields: null,
      status: 500,
      message: 'Internal server error',
      results: null,
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

export const deleteMediaAction = async (
  publicId: string
): Promise<{
  error: boolean
  errorMessage?: string
  result: boolean
}> => {
  try {
    if (!publicId) {
      return {
        error: true,
        errorMessage: 'Invalid public ID provided.',
        result: false,
      }
    }

    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    })

    revalidatePath('/admin/medias', 'page')

    return {
      error: false,
      errorMessage: '',
      result: true,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        errorMessage: error.message,
        result: false,
      }
    }
    // Handle unexpected error types
    return {
      error: true,
      errorMessage: 'An unknown error occurred.',
      result: false,
    }
  }
}
