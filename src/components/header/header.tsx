import styles from './header.module.css';
import Image from 'next/image';   
const Header = () => {
  return (
    <div className={styles.header}>
      <img src={"../BookOasisWletters.png"}alt="Book Oasis" width={140} height={200} className={styles.imageLogo} />
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <a href="#home" className={styles.navLink}>Home</a>
        </li>
        <li className={styles.navItem}>
          <a href="#about" className={styles.navLink}>About</a>
        </li>
        <li className={styles.navItem}>
          <a href="#services" className={styles.navLink}>Services</a>
        </li>
        <li className={styles.navItem}>
          <a href="#contact" className={styles.navLink}>Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;