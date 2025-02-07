import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function GET(request: Request, {params}: {params: {userID: string}}) {
    const id = params.userID;

    try {
        if (!id) {
            return new NextResponse('User ID is required', { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        return new NextResponse(JSON.stringify(user), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log('[USERS_ID_GET]', error);

        return new NextResponse('Algo deu errado ao buscar um usuário', { status: 500 });
    }
}   

// faça uma query de post no insomina para testar o POST
// {
//     "name": "Nome de teste",
//     "birthDate": "2022-01-01",
//     "email": "teste@teste.com",
//     "password": "123456789"            
// }                    

export async function DELETE(request: Request, {params}: {params: {userID: string}}) {
    const id = params.userID;

    try {
        if(id == "deleteAllUsersQcY"){
            await prisma.user.deleteMany();
            return new NextResponse('All users deleted', { status: 200 });
        }
        if (!id) {
            return new NextResponse('User ID is required', { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        await prisma.user.delete({
            where: {
                id: id
            }
        });

        return new NextResponse('User deleted', { status: 200 });
    } catch (error) {
        console.log('[USERS_ID_DELETE]', error);

        return new NextResponse('Algo deu errado ao deletar um usuário', { status: 500 });
    }
}

export async function PUT(request: Request, {params}: {params: {userID: string}}) {
    const id = params.userID;
    const data = await request.json();

    try {
        if (!id) {
            return new NextResponse('User ID is required', { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: data.name,
                birthDate: new Date(data.birthDate),
                email: data.email,
                password: data.password
            }
        });

        return new NextResponse('User updated', { status: 200 });
    } catch (error) {
        console.log('[USERS_ID_PUT]', error);

        return new NextResponse('Algo deu errado ao atualizar um usuário', { status: 500 });
    }
}