'use server'

import { TUser } from '@/types/User'
import User from '../db/models/User.model'

export const getUsersListAction = async (): Promise<{
  error: boolean
  status: number
  message: string
  results: TUser[] | null
}> => {
  try {
    const users = await User.find({}, 'name email role createdAt updatedAt')
    if (!users) {
      return {
        error: true,
        status: 404,
        message: 'No users found',
        results: null,
      }
    }

    return {
      error: false,
      status: 200,
      message: 'Users list fetched successfully',
      results: JSON.parse(JSON.stringify(users)),
    }
  } catch (error) {
    console.error('Error fetching users list:', error)
    return {
      error: true,
      status: 500,
      message: 'Internal server error',
      results: null,
    }
  }
}
