import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/lib/db/models/User.model'
import { compareSync } from 'bcryptjs'
import { TUser } from './types/User'
import connectDB from './lib/db/connect'

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectDB()

        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const { email, password } = credentials

        const user = await User.findOne({ email })

        if (!user) {
          return null
        }

        const isPasswordValid = compareSync(password.toString(), user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        } as TUser
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.role = token.role as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true, // Solo en HTTPS
      },
    },
  },
})
