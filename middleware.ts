import { isAuthenticated } from '@/app/utils/jwt'
import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'
 
const intlMiddleware = createMiddleware({
  locales: ['en', 'ru', 'uz'],
  defaultLocale: 'ru',
})

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  // Get the locale from the request URL
  const locale = request.nextUrl.pathname.split('/')[1] || 'ru';

  // Check if the request URL is for a protected route
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith(`/${locale}/client`) ||
    request.nextUrl.pathname.startsWith(`/${locale}/admin`) ||
    request.nextUrl.pathname.startsWith(`/${locale}/tailor`);

  if (isProtectedRoute) {
    // console.log(request.nextUrl.pathname);
    
    if (!token?.value) {
      NextResponse.json({}).cookies.delete('token');
      request.cookies.delete('token');
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    const b = await isAuthenticated(token.value);
    if (!b) {
      NextResponse.json({}).cookies.delete('token');
      request.cookies.delete('token');
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  const response = intlMiddleware(request);

  // Check if response is already handled by intl middleware
  if (response) {
    return response;
  }
}

export const config = {
  matcher: [
    '/:path',
    '/(en|ru|uz)/:path*'
  ]
}