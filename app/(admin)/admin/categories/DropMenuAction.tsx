'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteCategoryAction } from '@/lib/actions/categories.action'
import { TypeCategory } from '@/types/Category'
import { MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const DropMenuAction = ({ category }: { category: TypeCategory }) => {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const { error, message } = await deleteCategoryAction(category.id)

      if (error) {
        toast.error('Failed to delete category')
        return
      }
      toast.success(message || 'Category deleted successfully')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => router.push(`/admin/product/update/${category.id}`)}
        >
          Update
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropMenuAction
