import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('refresh_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Token não fornecido.' }, { status: 401 });
  }

  try {
    const userSession = await prisma.refreshToken.findUnique({
      where: { token: token },
    });

    if (!userSession) {
      return NextResponse.json({ error: 'Token inválido.' }, { status: 401 });
    }

    if (new Date() > new Date(userSession.expiresAt)) {
      return NextResponse.json({ error: 'Token expirado.' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userSession.userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Token válido.', user: user });
  } catch (error) {
    console.error('Erro ao processar o token:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
