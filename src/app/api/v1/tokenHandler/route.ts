import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function POST(request: NextRequest) {
  const { token } = await request.json();
  console.log('tokenHandler:', token);
  try {
    if (!token) {
      return NextResponse.json(
        { error: 'Token ausente ou não fornecido. (Token Handler)' },
        { status: 401 }
      );
    }
    const userSession = await prisma.refreshToken.findUnique({
      where: { token: token },
    });

    if (!userSession) {
      return NextResponse.json(
        { error: 'Token inválido ou expirado (TokenHandler).' },
        { status: 401 }
      );
    }

    if (new Date() > new Date(userSession.expiresAt)) {
      return NextResponse.json(
        { error: 'Token expirado(Token Handler).' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userSession.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado (Token Handler).' },
        { status: 404 }
      );
    }

    console.log('User Token Handler:', user);

    return NextResponse.json({
      message: 'Token válido.',
      user: user,
    });
  } catch (error) {
    console.error('Erro ao processar o token:', error);
    return NextResponse.json(
      { error: 'Erro interno no servidor. (Token Handler)' },
      { status: 500 }
    );
  }
}