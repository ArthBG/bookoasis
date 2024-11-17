import { NextResponse } from 'next/server'
// import { addHours } from 'date-fns'
// import { hash } from 'bcryptjs'
import prisma from '@/libs/prisma'
// import { log } from 'console'

export async function GET(req: Request, { params }: { params: { bookid: number } }) {
    console.log(params.bookid);
    
    const id = params.bookid.toString()

    try {
        if (!id) {
            return new NextResponse('ID do livro não informado', { status: 400 })
        }

        const book = await prisma.book.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!book) {
            return new NextResponse('Livro não encontrado', { status: 404 })
        }

        return new NextResponse(JSON.stringify(book), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log('[BOOKS_GET]', error)
        return new NextResponse(`Algo deu errado ao buscar o livro com o ID ${id}`, { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { bookid: number } }) {
    const id = params.bookid.toString()

    try {
        if (!id) {
            return new NextResponse('ID do livro não informado', { status: 400 })
        }

        const book = await prisma.book.delete({
            where: {
                id: parseInt(id)
            }
        })

        if (!book) {
            return new NextResponse('Livro não encontrado', { status: 404 })
        }

        return new NextResponse(JSON.stringify(book), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log('[BOOKS_DELETE]', error)
        return new NextResponse(`Algo deu errado ao deletar o livro de ID ${id}`, { status: 500 })
    }
}