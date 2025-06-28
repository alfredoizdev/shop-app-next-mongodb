import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir acceso libre a rutas públicas como /signin y /signup
  if (pathname.startsWith('/signin') || pathname.startsWith('/signup')) {
    return NextResponse.next()
  }

  // Obtener el token JWT (session) del usuario
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })

  // Si no hay token, redirigir a /signin
  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // Si hay token, continuar
  return NextResponse.next()
}

// Rutas protegidas
export const config = {
  matcher: ['/admin/:path*', '/profile/:path*'],
}
