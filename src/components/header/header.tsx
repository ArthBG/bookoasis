'use client';
import { useState, useEffect } from 'react';
import styles from './header.module.css';
import { logout } from '@/src/actions/login.actions';

type HeaderProps = {
  backgroundColor: string;
};

const Header = ({ backgroundColor }: HeaderProps) => {
  const [isLogged, setIsLogged] = useState(false);

  const checkUserLoggedIn = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/v1/auth`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      setIsLogged(data.isLogged);
    } catch (error) {
      console.error('Erro ao verificar estado do usuário:', error);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLogged(false); 
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  };

  return (
    <div className={styles.header} style={{ backgroundColor }}>
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
