'use client'
import { useEffect, useState } from 'react'
import { Book } from '../../types/Book'

const BooksList = () => {
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        const getBooks = async () => {
            const response = await fetch('/api/v1/books')
            console.log(response)
            const data = await response.json()
            setBooks(data)
        }
        getBooks()
    }, [])

    return (
        <div>
            {books.map((book) => (
                <div key={book.id}>
                    <h2>{book.title}</h2>
                    <p>{book.synopsis}</p>
                </div>
            ))}
        </div>
    )
}

export default BooksList;