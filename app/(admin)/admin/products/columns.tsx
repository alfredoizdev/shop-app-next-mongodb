'use client'

import { formatDate, truncateString } from '@/lib/utils'
import { ProductType } from '@/types/Products'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'

import DropMenuAction from './DropMenuAction'

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl = row.getValue('imageUrl') as string
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
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = row.getValue('price') as number
      return <>{`$${price.toFixed(2)}`}</>
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = row.getValue('category') as string
      const capitalizeFirstLetter = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1)
      return <>{capitalizeFirstLetter(category)}</>
    },
  },
  {
    accessorKey: 'inStock',
    header: 'In Stock',
    cell: ({ row }) => {
      const inStock = row.getValue('inStock') as boolean
      return (
        <>
          {inStock ? (
            <span className='p-2 bg-green-600 rounded-md text-white'>Yes</span>
          ) : (
            <span className='p-2 bg-red-600 rounded-md text-white'>No</span>
          )}
        </>
      )
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
      const product = row.original
      return <DropMenuAction product={product} />
    },
  },
]
