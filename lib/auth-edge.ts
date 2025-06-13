import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function auth(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })
  return token
}
