/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    role: string
  }

  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: string
    }
  }

  interface JWT {
    id: string
    role: string
  }
}
