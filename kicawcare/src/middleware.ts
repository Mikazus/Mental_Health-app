import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth/auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const role = req.auth?.user?.role

  const isAuthRoute = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register')
  const isCounselorRoute = nextUrl.pathname.startsWith('/counselor')
  const isAdminRoute = nextUrl.pathname.startsWith('/admin')
  const isStudentRoute = nextUrl.pathname.startsWith('/student')

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (role === 'ADMIN') return NextResponse.redirect(new URL('/admin/dashboard', nextUrl))
      if (role === 'COUNSELOR') return NextResponse.redirect(new URL('/counselor/dashboard', nextUrl))
      return NextResponse.redirect(new URL('/student/dashboard', nextUrl))
    }
    return null
  }

  if (!isLoggedIn && (isCounselorRoute || isAdminRoute || isStudentRoute)) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  if (isCounselorRoute && role !== 'COUNSELOR' && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/student/dashboard', nextUrl))
  }

  if (isAdminRoute && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/student/dashboard', nextUrl))
  }

  return null
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
