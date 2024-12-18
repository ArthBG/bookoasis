import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export const tokenKey = 'token';

export async function middleware(request: NextRequest) {
    const cookiesInstance = await cookies();
    const token = cookiesInstance.get(tokenKey);

<<<<<<< Updated upstream:src/middlewares/auth.middleware.ts
    const protectedRoutes = ['/api/v1/users'];
=======
    const protectedRoutes = ['/profile'];
>>>>>>> Stashed changes:src/middleware.ts
    const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

    if (isProtectedRoute && !token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('unauthorized', 'true');
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

    export const config = {
<<<<<<< Updated upstream:src/middlewares/auth.middleware.ts
        matcher: [ '/api/v1/users/:path*' ],
=======
        matcher: [ '/profile/:path*' ],
>>>>>>> Stashed changes:src/middleware.ts
    };