import Image from "next/image";
import BooksList from "@/components/booksList/booksList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <p className="text-center text-2xl">Welcome to the Bookstore</p>
        <BooksList />
    </main>
  );
}