'use client'
import BooksList from '../../components/booksList/booksList'
import { useEffect, useState } from 'react'
import { Book } from '../../types/Book'
import Header from '@/src/components/header/header';

export default function BooksPage() {
    const [newBook, setNewBook] = useState<Book>({
        id: 0,
        title: '',
        category: '',
        numberOfPages: 0,
        synopsis: '',
        author: '',
        releaseDate: new Date(),
        publisher: '',
        language: '',
        isbn: '',
        edition: 0,
        coverURL: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBook({
            ...newBook,
            [name]: name === 'numberOfPages' || name === 'edition' ? parseInt(value) : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const response = await fetch('/api/v1/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (response.ok) {
                alert('Book added successfully');
                setNewBook({
                    id: 0,
                    title: '',
                    category: '',
                    numberOfPages: 0,
                    synopsis: '',
                    author: '',
                    releaseDate: new Date(),
                    publisher: '',
                    language: '',
                    isbn: '',
                    edition: 0,
                    coverURL: '',
                });
            }
        } catch (error) {
            console.error('Error adding book', error);
        }
    };

    return (
        <div>
            <Header />
            <div style={{ paddingTop: '85px' }}>
            <h1>Books</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                />
                <input
                    type="text"
                    name="author"
                    value={newBook.author}
                    onChange={handleInputChange}
                    placeholder="Author"
                />
                <input
                    type="text"
                    name="category"
                    value={newBook.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                />
                <input
                    type="text"
                    name="synopsis"
                    value={newBook.synopsis}
                    onChange={handleInputChange}
                    placeholder="Synopsis"
                />
                <input
                    type="number"
                    name="numberOfPages"
                    value={newBook.numberOfPages}
                    onChange={handleInputChange}
                    placeholder="Number of Pages"
                />
                <input
                    type="text"
                    name="publisher"
                    value={newBook.publisher}
                    onChange={handleInputChange}
                    placeholder="Publisher"
                />
                <input
                    type="text"
                    name="isbn"
                    value={newBook.isbn}
                    onChange={handleInputChange}
                    placeholder="ISBN"
                />
                <input
                    type="text"
                    name="language"
                    value={newBook.language}
                    onChange={handleInputChange}
                    placeholder="Language"
                />
                <input
                    type="number"
                    name="edition"
                    value={newBook.edition}
                    onChange={handleInputChange}
                    placeholder="Edition"
                />
                <input
                    type="text"
                    name="coverURL"
                    value={newBook.coverURL}
                    onChange={handleInputChange}
                    placeholder="Cover URL"
                />
                <button type="submit">Add Book</button>
            </form>
            <BooksList />
            </div>
        </div>
    )
}