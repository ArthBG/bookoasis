'use server';
import { User } from '../types/User';

export async function registerUser(user: User) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log('user no actions', user);
    try {
      const response = await fetch(`${apiUrl}/api/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      console.log('user stringified', JSON.stringify(user));
      
      if (!response.ok) {
        // Lê o erro do backend como JSON ou texto
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || 'Erro inesperado';
  
        // Lança um erro com status e mensagem
        throw { status: response.status, message: errorMessage };
      }
  
      const data = await response.json();
      console.log('data response.json no actions', data);
      return { data };
    } catch (error) {
      console.error('[REGISTER_USER]', error);
      const typedError = error as { status?: number; message?: string };
      return { error: { status: typedError.status || 500, message: typedError.message || 'Erro de conexão' } };
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
        if(!response.ok) {
            const errorData = await response.json(); 
            return { error: { status: response.status, message: errorData.error } };
        }
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