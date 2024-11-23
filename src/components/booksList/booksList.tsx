'use client'
import { useEffect, useState } from 'react'
import { Book } from '../../types/Book'
import styles from './bookList.module.css'

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
        <div className={styles.maindiv}>
            {books.map((book) => (
                <div key={book.id}>
                    <div className={styles.divCard}>
                    <img className={styles.cover} src={book.coverURL} alt={book.title} />
                    <h2 className={styles.bookTitle}>{book.title}</h2>
                    <p className={styles.author}>{book.author}</p>
                    <p className={styles.synopsis}>{book.synopsis}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BooksList;