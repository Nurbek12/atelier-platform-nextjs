import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { isAuthenticated } from '@/app/utils/jwt'
 
export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')

  if(!token?.value) {
    NextResponse.json({}).cookies.delete('token')
    request.cookies.delete('token')
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  const b = await isAuthenticated(token.value)
  if(!b) {
    NextResponse.json({}).cookies.delete('token')
    request.cookies.delete('token')
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/client/:path*',
    '/tailor/:path*',
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}