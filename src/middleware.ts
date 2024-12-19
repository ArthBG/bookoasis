import { NextResponse, NextRequest } from 'next/server';

export const tokenKey = 'token';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get(tokenKey)?.value;

    const protectedRoutes = ['/profile'];
    const isProtectedRoute = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isProtectedRoute && !token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('unauthorized', 'true'); 
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*'], 
};
