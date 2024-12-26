import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('refresh_token')?.value;
    console.log('middleware:', token);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tokenHandler`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
        credentials: 'include',
    });

    const responseData = await res.json();
    console.log('middleware res from tokenHandler:', responseData);

    if (res.status === 401) {
        const url = new URL('/login', request.url);
        url.searchParams.set('tokenExpired', 'true');
        return NextResponse.redirect(url);
    } else if (res.status === 404) {
        return NextResponse.redirect('/login');
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*'],
};