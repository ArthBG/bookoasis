import BooksList from "../components/booksList/booksList";
import "./page.module.css";

export default function Home() {
  return (
    <main className="main">
      <p className="welcome-text">Welcome to the Bookstore</p>
      <BooksList />
    </main>
  );
}