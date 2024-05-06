import Lobby from "@/components/Lobby";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Lobby />
    </main>
  );
}
