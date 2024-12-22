import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/libs/prisma';

export const tokenKey = 'refresh_token';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get(tokenKey)?.value;

    const protectedRoutes = ['/profile'];
    const isProtectedRoute = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        if (!token) {
            const url = new URL('/login', request.url);
            url.searchParams.set('unauthorized', 'true');
            return NextResponse.redirect(url);
        }

        const tokenRecord = await prisma.refreshToken.findUnique({
            where: { token },
        });

        if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
            const url = new URL('/login', request.url);
            url.searchParams.set('tokenExpired', 'true');
            if (tokenRecord) {
                await prisma.refreshToken.delete({ where: { token } });
            }
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*']
};
