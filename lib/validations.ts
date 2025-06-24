import { z } from 'zod'

export const ProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z
    .string()
    .min(1, 'Price is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Price must be a valid number'),
  description: z.string().min(1, 'Description is required'),
  // ...existing code...
  image: z
    .any()
    .optional()
    .refine(
      (file) => {
        // Permitir si no hay archivo
        if (file === undefined || file === null) return true
        // Permitir si es un File válido
        return (
          file instanceof File &&
          file.size > 0 &&
          file.type.startsWith('image/')
        )
      },
      { message: 'File must be an image' }
    ),
  // ...existing code...
  category: z.string().optional(),
  inStock: z.number().nonnegative().optional(),
})

export const SignInSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long'),
})

export const SignUpschema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(1, 'Name is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long'),
})

export const bannerSchema = z.object({
  title: z.string().min(5, 'Title is required'),
  image: z.any().refine(
    (file) => {
      // Permitir si el campo no existe
      if (!file || typeof file === 'string') return true

      // Si es un File, permitir si es válido
      if (file instanceof File) {
        return file.size > 0 && file.type.startsWith('image/')
      }

      // Rechazar cualquier otra cosa
      return false
    },
    { message: 'File must be an image' }
  ),
  description: z.string().min(1, 'Description is required'),
  alt: z.string().min(3, 'Alt text is required'),
  buttonText: z.string().min(3, 'Button text is required'),
  buttonLink: z.string().min(3, 'Button link is required'),
})

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(5, 'Description is required'),
  image: z
    .any()
    .optional()
    .refine(
      (file) => {
        // Permitir si no hay archivo
        if (file === undefined || file === null) return true
        // Permitir si es un File válido
        return (
          file instanceof File &&
          file.size > 0 &&
          file.type.startsWith('image/')
        )
      },
      { message: 'File must be an image' }
    ),
})

export const themeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slogan: z.string().min(1, 'Slogan is required'),
})
