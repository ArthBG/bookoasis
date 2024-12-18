'use server';
import { User } from '../types/User';

export async function registerUser(user: User) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${apiUrl}/api/v1/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        if (!response.ok) {
            throw new Error('HTTP Error! Status: ' + response.status); 
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('[REGISTER_USER]', error);
        return error;
    }
}

export async function getAllUsers() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${apiUrl}/api/v1/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('[GET_ALL_USERS]', error);
        return error;
    }
}
export async function getUserById(id: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${apiUrl}/api/v1/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('[GET_USER_BY_ID]', error);
        return error;
    }
}

export async function deleteUserById(id: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${apiUrl}/api/v1/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('[DELETE_USER_BY_ID]', error);
        return error;
    }
}

export async function updateUser(id: string, user: User) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        const response = await fetch(`${apiUrl}/api/v1/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('[UPDATE_USER_BY_ID]', error);
        return error;
    }
}