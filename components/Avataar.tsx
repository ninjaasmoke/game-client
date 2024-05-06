import styles from "@/components/Avataar.module.css";

type AvataarProps = {
  id?: string;
};

const Avataar = ({ id }: AvataarProps) => {
  const seed = id ?? Math.random().toString(36).substring(2);
  const url = `https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=${seed}`;
  return (
    <div className={styles.avatar}>
      <img src={url} alt="avatar" className={styles.avatarImage} width={30} height={30} />
    </div>
  );
};

export default Avataar;
