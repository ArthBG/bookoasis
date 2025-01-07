import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/libs/prisma';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const ACCESS_TOKEN_EXPIRATION = '15m'; 


export async function POST(request: NextRequest) {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
        return NextResponse.json({ error: 'Refresh token ausente.' }, { status: 401 });
    }

    try {
        const session = await prisma.refreshToken.findUnique({
            where: { token: refreshToken },
        });

        if (!session || new Date() > new Date(session.expiresAt)) {
            return NextResponse.json({ error: 'Refresh token inválido ou expirado.' }, { status: 401 });
        }

        const newAccessToken = jwt.sign(
            { userId: session.userId },
            ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPIRATION }
        );

        return NextResponse.json({ newAccessToken });
    } catch (error) {
        console.error('Erro ao renovar token:', error);
        return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
    }
}
