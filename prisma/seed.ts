import { PrismaClient } from '@prisma/client';
import { books } from '../src/app/data/Books'; 

const prisma = new PrismaClient();

async function main() {
  for (const book of books) {
    await prisma.book.create({
      data: {
        title: book.title,
        category: book.category,
        synopsis: book.synopsis,
        numberOfPages: book.numberOfPages,
        author: book.author,
        releaseDate: book.launch,
        publisher: book.publisher,
        isbn: book.isbn,
        language: book.language,
        edition: book.edition,
        coverURL: book.cover
      },
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });