import styles from './header.module.css';
const Header = () => {
  return (
    <div className={styles.header}>
      <img src={"../BookOasisWletters.png"}alt="Book Oasis" className={styles.imageLogo} />
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <a href="/" className={styles.navLink}>Home</a>
        </li>
        <li className={styles.navItem}>
          <a href="/books" className={styles.navLink}>Livros</a>
        </li>
        <li className={styles.navItem}>
          <a href="#carrinho" className={styles.navLink}>Carrinho</a>
        </li>
        <li className={styles.navItem}>
          <a href="/register" className={styles.navLink}>Cadastro</a>
        </li>
        <li className={styles.navItem}>
          <a href="/login" className={styles.navLink}>Login</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;