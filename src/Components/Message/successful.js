import styles from "./message.module.css";

export default function Successful({ successful, color }) {
  return (
    <div className={`${styles["successful"]} ${styles[color]}`}>
      ✔ {successful}
    </div>
  );
}
