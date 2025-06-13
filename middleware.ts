import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth-edge'

export async function middleware(request: NextRequest) {
  const session = await auth(request)

  // 🔒 Si no hay sesión, redirige a /signin
  if (!session) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // has session try access to signin or signup
  if (
    request.nextUrl.pathname === '/signin' ||
    request.nextUrl.pathname === '/signup'
  ) {
    // redirect to home
    return NextResponse.redirect(new URL('/', request.url))
  }

  // if have session, continue to the requested page
  return NextResponse.next()
}

// 👇 Define qué rutas están protegidas
export const config = {
  matcher: [
    // Protege estas rutas
    '/admin/:path*',
    '/profile/:path*',
  ],
}
