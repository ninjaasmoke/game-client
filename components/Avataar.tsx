import styles from "@/components/Avataar.module.css";

const Avataar = () => {
  const seed = Math.random().toString(36).substring(2);
  const url = `https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=${seed}`;
  return (
    <div className={styles.avatar}>
      <img src={url} alt="avatar" className={styles.avatarImage} />
    </div>
  );
};

export default Avataar;
