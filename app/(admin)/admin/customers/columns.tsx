'use client'

import { formatDate } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'

import DropMenuAction from './DropMenuAction'
import { TUser } from '@/types/User'

export const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
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
      const user = row.original

      return <DropMenuAction user={user} />
    },
  },
]
