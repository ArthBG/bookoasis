'use server'
import { Book } from '../types/Book';

//Get all books
export async function getAllBooks(){
    const apiURL = process.env.NEXT_PUBLIC_URL
    try {
        const response = await fetch(`${apiURL}/api/v1/books`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching all users (GET ALL)',error)
    }
}

//Create a book
export async function createBook(book: Book){
    const apiURL = process.env.NEXT_PUBLIC_URL
    try {
        const response = await fetch(`${apiURL}/api/v1/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error creating a book (POST)',error)
    }
}
