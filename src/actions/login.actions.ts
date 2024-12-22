'use server';
import { tokenKey } from '../middleware';
import prisma from '@/libs/prisma';
import { cookies } from "next/headers";

export async function login(email: string, password: string) {
    const cookiesInstance = cookies();
    try {
        const user = await prisma.user.findUnique({
            where: { email, password },
        });

        if (!user) {
            return { error: 'Usuário não encontrado', status: 404 };
        }

        const token = `token-${user.id}-${Date.now()}`;
        cookiesInstance.set(tokenKey, token, { path: '/', httpOnly: true });

        const { id, name, email: userEmail } = user;
        return { user: { id, name, email: userEmail }, status: 200 };
    } catch (error) {
        console.error('[LOGIN]', error);
        return { error: 'Algo deu errado ao realizar o login', status: 500 };
    }
}

    
export async function logout() {
    const cookiesInstance = cookies();

    try {
        const token = cookiesInstance.get(tokenKey);

        if (token) {
            cookiesInstance.delete(tokenKey);
            console.log("Token removido:", token);
        }

        console.log("Logout realizado com sucesso.");
        return { message: 'Logout realizado com sucesso', status: 200 };
    } catch (error) {
        console.error('[LOGOUT]', error);
        return { error: 'Algo deu errado ao realizar o logout', status: 500 };
    }
}
