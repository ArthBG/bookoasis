'use server';
import { tokenKey } from '../middlewares/auth.middleware';
import { cookies } from "next/headers";

export async function login(data: any) {
    const cookiesInstance = cookies();
    cookiesInstance.set(tokenKey, 'token');
    cookiesInstance.set({
        name: 'user',
        value: 'junior',
        httpOnly: true,
        path: '/',
    });
}
    
export async function logout() {
    const cookiesInstance = cookies();
    cookiesInstance.delete(tokenKey);
    cookiesInstance.delete('user');
}