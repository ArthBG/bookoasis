import BooksList from "../components/booksList/booksList";
import Header from "../components/header/header";
import styles from "./page.module.css"

export default function Home() {
  return (
    <main className={styles.main} style={{ paddingTop: '85px' }}>
      <Header />
      <p className={styles.welcometext}>Welcome to the Bookstore</p>
    </main>
  );
}