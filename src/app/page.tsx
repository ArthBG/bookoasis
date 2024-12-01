import Header from "../components/header/header";
import styles from "./page.module.css";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export default function Home() {
  return (
    <main className={styles.main} style={{ paddingTop: '85px' }}>
      <Header />
      <div className={styles.container}>
        <div className={styles.texts}>
        <Text fontSize="50px" fontWeight="bold" color="white.700" width={'80%'} mb={7}>
          Book Oasis Seu Refúgio Literário
        </Text>
        <Text fontSize="small" color="white.500" width={'70%'}>
        O Book Oasis é um refúgio literário, assim como um oásis no deserto, oferecendo uma vasta coleção de eBooks para explorar, desde best-sellers até clássicos e joias escondidas.
        </Text>
        <Button variant="solid" width={"fit-content"} borderRadius={20} color="grey" size="xl"  mt={10}>
          Explore agora
        </Button>
        </div>
        <div className={styles.image}>
        <img src="../ilustrationHome.png" className={styles.images} alt="Ilustração de uma mulher lendo um livro"/>
      </div>

      </div>
    </main>
  );
}