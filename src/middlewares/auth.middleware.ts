import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export const tokenKey = 'token';

export async function middleware(request: NextRequest) {
    const cookiesInstance = await cookies();
    const token = cookiesInstance.get(tokenKey);

    const protectedRoutes = ['/api/v1/users'];
    const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

    if (isProtectedRoute && !token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('unauthorized', 'true');
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

    export const config = {
        matcher: [ '/api/v1/users/:path*' ],
    };