"use client";
import Header from "../components/header/header";
import styles from "./page.module.css";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Home() {

  return (
    <main className={styles.main} style={{ paddingTop: '85px' }}>
      <Header />
      <div className={styles.container}>
        <div className={styles.texts}>
        <Text fontSize="50px" fontWeight="560" color="white" width={'60%'}>
          Book Oasis 
        </Text>
        <Text fontSize="50px" fontWeight="400" color="white.700" mt={-5} mb={7}>
          seu recanto literário
        </Text>
        <Text fontSize="14px" color="white.500" width={'80%'}>
        O Book Oasis é um refúgio literário, assim como um oásis no deserto, oferecendo uma vasta coleção de eBooks para explorar, desde best-sellers até clássicos e joias escondidas.
        </Text>
        <Button padding={7} variant="solid" width={"fit-content"} borderRadius={40}  fontSize={17} mt={10}>
          Explore agora
        </Button>
        </div>
        <div className={styles.image}>
        <img src="../ilustracaoHome.png" className={styles.images} alt="Ilustração de uma mulher lendo um livro" width={1200} height={900} />
      </div>

      </div>
    </main>
  );
}