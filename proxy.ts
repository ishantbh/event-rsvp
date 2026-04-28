import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { auth } from '@/auth'

const authRoutes = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
]

const protectedRoutes = ['/dashboard', '/events']

export async function proxy(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const { pathname } = request.nextUrl

    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route),
    )

    if (!session && isProtectedRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    if (session && isAuthRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  } catch (error) {
    console.log({ errorInProxy: error })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/events/:path*',
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
  ], // Specify the routes the middleware applies to
}
