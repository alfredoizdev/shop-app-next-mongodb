import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type SubmitOptions = {
  onSuccessRedirect?: string
  onSuccessMessage?: string
  onErrorMessage?: string
  resetImageUrl?: () => void
}

type SubmitHandler<T> = (formData: FormData) => Promise<T>

export function useFormSubmit<
  T extends {
    error?: boolean
    errorFields?: Record<string, string[]> | null
    message?: string
  }
>(submitFn: SubmitHandler<T>, options: SubmitOptions = {}) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const submit = async (formData: FormData) => {
    setErrors({})
    setPending(true)

    try {
      const result = await submitFn(formData)

      if (result.error) {
        setErrors(result.errorFields || {})
        toast.error(
          options.onErrorMessage ||
            'Submission failed. Please check the fields.'
        )
        return
      }

      toast.success(options.onSuccessMessage || 'Submitted successfully!')
      if (options.onSuccessRedirect) router.push(options.onSuccessRedirect)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An unexpected error occurred.')
      }
    } finally {
      setPending(false)
      if (options.resetImageUrl) options.resetImageUrl()
    }
  }

  return {
    submit,
    pending,
    errors,
    setErrors,
  }
}
