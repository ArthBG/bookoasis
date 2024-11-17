import { NextRequest, NextResponse } from 'next/server';
import { addHours, format, formatISO } from 'date-fns';
import prisma from '@/libs/prisma';

export async function GET() {
    try {
        const books = await prisma.book.findMany({
            orderBy: {
                author: 'asc'
            }
        });

        return new NextResponse(JSON.stringify(books), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log('[BOOKS_GET]', error);

        return new NextResponse('Algo deu errado ao buscar todos os livros', { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const { title, category, synopsis, numberOfPages, author, releaseDate, publisher, isbn, language, edition, coverURL } = await request.json();
   
    // Verify if all required fields are filled
    if (!title || !category || !synopsis || !numberOfPages || !author || !releaseDate || !language || !coverURL) {
        return new NextResponse('Todos os campos são obrigatórios', { status: 400 });
    }

    try {
        const formattedReleaseDate = formatISO(new Date(releaseDate));
        const book = await prisma.book.create({
            data: {
                title,
                category,
                synopsis,
                numberOfPages,
                author,
                releaseDate: formattedReleaseDate,
                publisher,
                isbn,
                language,
                edition,
                coverURL
            }
        });
        return NextResponse.json({
            message: 'Livro cadastrado com sucesso', book
        }, { status: 201 });
    } catch (error) {
        console.log('[BOOKS_POST]', error);
        return new NextResponse('Algo deu errado ao criar o livro', { status: 500 });
    }
}

// faça uma query de post no insomina para testar o POST
// {
//     "title": "Livro de teste",
//     "category": "Teste",
//     "synopsis": "Sinopse de teste",
//     "numberOfPages": 100,
//     "author": "Autor de teste",
//     "releaseDate": "2022-01-01",
//     "publisher": "Editora de teste",
//     "isbn": "123456789",
//     "language": "Português",
//     "edition": "1ª edição",
//     "coverURL": "https://via.placeholder.com/150"
// }