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
                <Card.Root className={styles.divCard} minWidth="20%" maxWidth="20%" overflow="hidden" key={book.id}>
                    <Image src={book.coverURL} className={styles.cover} alt={book.title}  />
                    <Card.Body gap="2">
                    <Card.Title fontSize="16px" maxWidth="80%">{book.title}</Card.Title>
        <Card.Description fontSize="14px" fontWeight="bold">
          {book.author}
        </Card.Description>
        <Text textStyle="sm" fontSize="13px"  color="gray.500">
          {book.publisher}
        </Text>
        <Text textStyle="2xl" fontSize="16px" fontWeight="medium" letterSpacing="tight" mt="2">
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