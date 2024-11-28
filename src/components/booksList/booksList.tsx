'use client'
import { useEffect, useState } from 'react'
import { Book } from '../../types/Book'
import styles from './bookList.module.css'
import { Button, Card, Image, Text } from "@chakra-ui/react"

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
                <Card.Root maxW="sm" overflow="hidden" key={book.id}>
                    <Image src={book.coverURL} className={styles.cover} alt={book.title}  />
                    <Card.Body gap="2">
                    <Card.Title>{book.title}</Card.Title>
        <Card.Description>
          {book.synopsis}
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          $450
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant={'solid'}>Comprar</Button>
        <Button variant={'ghost'}>Adicionar ao carrinho</Button>
      </Card.Footer>
                </Card.Root>
            ))}
        </div>
    )
}

export default BooksList;