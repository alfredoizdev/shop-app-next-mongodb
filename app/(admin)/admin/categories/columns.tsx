'use client'

import { formatDate, truncateString } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import DropMenuAction from './DropMenuAction'
import { TypeCategory } from '@/types/Category'

export const columns: ColumnDef<TypeCategory>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl = row.getValue('image') as string
      return (
        <div className='flex items-center'>
          <Image
            src={imageUrl}
            alt='Product Image'
            className='h-10 w-10 rounded-none object-cover'
            width={40}
            height={40}
            priority
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const description = row.getValue('description') as string
      return <>{truncateString(description, 30)}</>
    },
  },

  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as string
      return <>{formatDate(createdAt)}</>
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => {
      const updatedAt = row.getValue('updatedAt') as string
      return <>{formatDate(updatedAt)}</>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const banner = row.original

      return <DropMenuAction category={banner} />
    },
  },
]
