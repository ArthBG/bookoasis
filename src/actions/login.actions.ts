'use server';

import prisma from '@/libs/prisma';
import { cookies } from 'next/headers';
import { comparePassword } from '../utils/passwordUtils';
import crypto from 'crypto';

const tokenKey = 'refresh_token';

export async function login(email: string, password: string) {
    const cookiesInstance = cookies();

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        console.log('Usuário encontrado:', user);

        if (!user) {
            console.error('Usuário não encontrado');
            return { error: 'Usuário não encontrado', status: 404 };
        }

        const passwordMatch = await comparePassword(password, user.password);
        console.log('Senha correta:', passwordMatch);

        if (!passwordMatch) {
            console.error('Senha incorreta');
            return { error: 'Credenciais inválidas', status: 401 };
        }

        const token = crypto.randomBytes(64).toString('hex');
        const expiration = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 dias
        console.log('Gerando token:', { token, expiration });

        const newToken = await prisma.refreshToken.create({
            data: {
                token,
                userId: user.id,
                expiresAt: expiration,
            },
        });

        cookiesInstance.set(tokenKey, token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60,
        });

        const { id, name, email: userEmail } = user;
        return { user: { id, name, email: userEmail }, status: 200 };
    } catch (error) {
        console.error('[LOGIN ERROR]', error);
        return { error: 'Erro ao realizar login', status: 500 };
    }
}

export async function logout() {
    const cookiesInstance = cookies();

    try {
        const token = cookiesInstance.get(tokenKey)?.value;

        if (token) {
            await prisma.refreshToken.delete({ where: { token } });
            cookiesInstance.delete(tokenKey);
        }

        return { message: 'Logout realizado com sucesso', status: 200 };
    } catch (error) {
        console.error('[LOGOUT ERROR]', error);
        return { error: 'Erro ao realizar logout', status: 500 };
    }
}
