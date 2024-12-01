import Header from "../components/header/header";
import styles from "./page.module.css";
import { Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <main className={styles.main} style={{ paddingTop: '85px' }}>
      <Header />
      <div className={styles.container}>
        <div className={styles.texts}>
        <Text fontSize="2xl" fontWeight="bold" color="white.700" mb={4}>
          Bem-vindo ao Book Oasis - Seu Refúgio Literário
        </Text>
        <Text fontSize="small" color="white.500" width={'50%'}>
          Assim como um oásis oferece um escape refrescante no meio do deserto, o Book Oasis oferece um refúgio para os amantes de livros. Mergulhe em nossa vasta coleção de eBooks e encontre sua próxima grande aventura. Seja você um ávido leitor em busca dos últimos best-sellers, clássicos atemporais ou joias escondidas, o Book Oasis é o seu destino final para exploração literária. Deixe-nos ser seu santuário de histórias, onde cada livro é uma nova jornada esperando para ser descoberta.
        </Text>
        </div>
        <div className={styles.image}>
        <img src="../ilustrationHome.png" className={styles.images} alt="Ilustração de uma mulher lendo um livro"/>
      </div>
      </div>
    </main>
  );
}