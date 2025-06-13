import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { listMediaAction, MediaImageType } from '@/lib/actions/media.action'
import Image from 'next/image'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  onSelect: (url: string) => void
}

const MediaDialog = ({ open, setOpen, onSelect }: Props) => {
  const [medias, setMedias] = useState<MediaImageType[] | []>([])

  useEffect(() => {
    // Fetch media list when the component mounts
    const fetchMedia = async () => {
      const { result } = await listMediaAction()
      if (!result || result.length === 0) {
        setMedias([])
        return
      }
      setMedias(result)
    }

    fetchMedia()
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='w-[300px] h-[500px] sm:w-[600px] sm:h-[700px] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        {medias.length > 0 ? (
          <div className='grid grid-cols-2 gap-4 h-[700px] w-full'>
            {medias.map((media) => (
              <div
                key={media.id}
                className='relative cursor-pointer hover:opacity-80 transition-opacity shadow-lg'
              >
                <Image
                  onClick={() => {
                    setOpen(false)
                    onSelect(media.url)
                  }}
                  src={media.url}
                  width={300}
                  height={300}
                  alt={'Media'}
                  priority
                  className='w-full h-auto rounded-lg'
                />
              </div>
            ))}
          </div>
        ) : (
          <DialogDescription>
            <p>No media found.</p>
          </DialogDescription>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default MediaDialog
