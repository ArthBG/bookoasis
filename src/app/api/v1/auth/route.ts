import { cookies } from 'next/headers';
import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const cookiesInstance = cookies();
    const token = cookiesInstance.get('refresh_token')?.value;

    if (!token) {
        return NextResponse.json({ isLogged: false });
    }

    const tokenRecord = await prisma.refreshToken.findUnique({
        where: { token },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
        if (tokenRecord) {
            await prisma.refreshToken.delete({ where: { token } });
        }
        return NextResponse.json({ isLogged: false });
    }

    return NextResponse.json({ isLogged: true });
}
