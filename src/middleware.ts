import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;

    try {
        if (accessToken) {
            await jwtVerify(accessToken, ACCESS_TOKEN_SECRET);
            return NextResponse.next();
        }

        if (refreshToken) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/refreshToken`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
                credentials: 'include',
            });

            if (res.ok) {
                const { newAccessToken } = await res.json();
                const response = NextResponse.next();
                response.cookies.set('access_token', newAccessToken, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 15 * 60, // 15 minutos
                });
                return response;
            }
        }

        const url = new URL('/login', request.url);
        return NextResponse.redirect(url);
    } catch (error) {
        console.error('Erro no middleware:', error);
        const url = new URL('/login', request.url);
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ['/profile/:path*'],
};
