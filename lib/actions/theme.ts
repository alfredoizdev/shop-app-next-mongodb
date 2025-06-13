'use server'

import { ThemeType } from '@/types/Theme'
import Theme from '../db/models/Theme'
import { themeSchema } from '../validations'

export const setTheme = async (
  formData: FormData
): Promise<{
  errorFields: Record<string, string[]> | null
  error: boolean
  status: number
  message: string
  result: ThemeType | null
}> => {
  try {
    const validatedFields = themeSchema.safeParse({
      title: formData.get('title'),
      slogan: formData.get('slogan'),
    })

    if (!validatedFields.success) {
      return {
        errorFields: validatedFields.error.flatten().fieldErrors,
        result: null,
        error: true,
        status: 400,
        message: 'Validation error',
      }
    }

    const { title, slogan } = validatedFields.data

    // Buscar si ya existe un registro
    const existingTheme = await Theme.findOne()

    let theme
    if (existingTheme) {
      // Actualizar el tema existente
      theme = await Theme.findByIdAndUpdate(
        existingTheme._id,
        { title, slogan },
        { new: true }
      )
    } else {
      // Crear nuevo tema
      theme = await Theme.create({ title, slogan })
    }

    return {
      errorFields: null,
      error: false,
      result: JSON.parse(JSON.stringify(theme)),
      status: 200,
      message: existingTheme
        ? 'Theme updated successfully'
        : 'Theme created successfully',
    }
  } catch (error) {
    return {
      result: null,
      errorFields: null,
      error: true,
      status: 500,
      message: error instanceof Error ? error.message : 'Internal server error',
    }
  }
}

export const getTheme = async (): Promise<{
  error: boolean
  status: number
  message: string
  result: ThemeType | null
}> => {
  try {
    const theme = await Theme.findOne().lean()

    if (!theme) {
      return {
        error: true,
        status: 404,
        message: 'Theme not found',
        result: null,
      }
    }

    return {
      error: false,
      status: 200,
      message: 'Theme fetched successfully',
      result: JSON.parse(JSON.stringify(theme)),
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        status: 500,
        message: error.message,
        result: null,
      }
    }
    return {
      error: true,
      status: 500,
      message: 'Internal server error',
      result: null,
    }
  }
}
