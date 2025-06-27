'use client'
import { Button } from '@/components/ui/button'
import { deleteMediaAction } from '@/lib/actions/media.action'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'

const DeleteMediaButton = ({ publicId }: { publicId: string }) => {
  const handleDeleteMedia = async () => {
    const { error } = await deleteMediaAction(publicId)

    if (error) {
      toast.error('Failed to delete media. Please try again.')
      return
    }

    toast.success('Media deleted successfully.')
  }

  return (
    <Button
      onClick={handleDeleteMedia}
      title='delete media'
      className='absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none'
    >
      <Trash className='h-4 w-4' />
    </Button>
  )
}

export default DeleteMediaButton
