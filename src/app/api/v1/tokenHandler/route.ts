import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const token = request.cookies.get('refresh_token')?.value;

    if (!token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('unauthorized', 'true');
        return NextResponse.redirect(url);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tokenHandler`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (res.status === 401) {
        const url = new URL('/login', request.url);
        url.searchParams.set('tokenExpired', 'true');
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

