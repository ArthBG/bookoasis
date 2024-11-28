import BooksList from "../components/booksList/booksList";
import styles from "./page.module.css"

export default function Home() {
  return (
    <main className={styles.main}>
      <p className={styles.welcometext}>Welcome to the Bookstore</p>
      <BooksList />
    </main>
  );
}