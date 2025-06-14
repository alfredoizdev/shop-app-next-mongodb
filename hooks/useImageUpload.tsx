import { useState } from 'react'
import { toast } from 'sonner'

export function useImageUpload() {
  const [imageURL, setImageURL] = useState('')
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const fileSize = file.size

      if (Math.round(fileSize / 1024) > 1024) {
        toast.error('File size must be less than 1MB')
        setErrors((prev) => ({
          ...prev,
          image: ['File size must be less than 1MB'],
        }))
      } else {
        setImageURL(URL.createObjectURL(file))
        setErrors((prev) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { image, ...rest } = prev
          return rest
        })
      }
    }
  }

  const resetImage = () => setImageURL('')

  return {
    imageURL,
    errors,
    setErrors,
    handleImageChange,
    resetImage,
  }
}
