import Link from "next/link";
// import {logout, login} from "../../actions";
import styles from "./page.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.form}>
          <form action="#" method="post">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
            <button type="submit">Login</button>
          </form>
        </div>
      </main>
    </div>
  );
}