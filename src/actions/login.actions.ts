'use server';
import { tokenKey } from '../middlewares/auth.middleware';
import prisma from '@/libs/prisma';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from 'next/server';

export async function login(email: string, password: string) {
    const cookiesInstance = cookies();
    cookiesInstance.set(tokenKey, 'token');
    try {
    const user = await prisma.user.findUnique({
        where: {
            email, password
        }
    });

    if (!user) {
        return new NextResponse('Usuário não encontrado', { status: 404 });
    }

    cookiesInstance.set('user', JSON.stringify(user));
    return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
    console.log('[LOGIN]', error);
    return new NextResponse('Algo deu errado ao buscar o usuário', { status: 500 });
    }

}
    
export async function logout() {
    const cookiesInstance = cookies();
    cookiesInstance.delete(tokenKey);
    cookiesInstance.delete('user');
}