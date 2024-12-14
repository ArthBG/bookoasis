'use client';
import { useState, useEffect } from 'react';
import styles from './header.module.css';
import { logout } from '@/src/actions/login.actions';
import { set } from 'date-fns';

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);

  

  useEffect(() => {
    setIsLogged(!!localStorage.getItem('token'));
    setIsLogged(true);
  }
  , []);


  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    setIsLogged(false);
  };
  console.log(isLogged);
  return (
    <div className={styles.header}>
      <img src={"../BookOasisWletters.png"} alt="Book Oasis" className={styles.imageLogo} />
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
        {isLogged ? (
          <>
            <li className={styles.navItem}>
              <a href="/profile" className={styles.navLink}>Perfil</a>
            </li>
            <li className={styles.navItem}>
              <button onClick={handleLogout} className={styles.navLink}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className={styles.navItem}>
              <a href="/register" className={styles.navLink}>Cadastro</a>
            </li>
            <li className={styles.navItem}>
              <a href="/login" className={styles.navLink}>Login</a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;