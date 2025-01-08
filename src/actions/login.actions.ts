'use server';
import prisma from '@/libs/prisma';
import { cookies } from 'next/headers';
import { comparePassword } from '../utils/passwordUtils';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const ACCESS_TOKEN_EXPIRATION = '15m'; 
const REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 60; // 7 dias

export async function login(email: string, password: string) {
    const cookiesInstance = cookies();

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return { error: 'Usuário não encontrado', status: 404 };
        }

        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) {
            return { error: 'Credenciais inválidas', status: 401 };
        }

        const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRATION,
        });

        const refreshToken = crypto.randomBytes(64).toString('hex');
        const expiration = new Date(Date.now() + REFRESH_TOKEN_EXPIRATION);

        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt: expiration,
            },
        });

        cookiesInstance.set('access_token', accessToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 15 * 60, // 15 minutos
        });

        cookiesInstance.set('refresh_token', refreshToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: REFRESH_TOKEN_EXPIRATION,
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
    const access_token = cookiesInstance.get('access_token')?.value;
    const refresh_token = cookiesInstance.get('refresh_token')?.value;
  
    try {
        if (refresh_token) {
            await prisma.refreshToken.delete({ where: { token: refresh_token } });
            cookiesInstance.delete('refresh_token');
        }
        if (access_token) {
            cookiesInstance.delete('access_token');
        }

        return { message: 'Logout realizado com sucesso', status: 200 };
    } catch (error) {
        console.error('[LOGOUT ERROR]', error);
        return { error: 'Erro ao realizar logout', status: 500 };
    }
}
