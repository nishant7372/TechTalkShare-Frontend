import styles from "./message.module.css";

export default function Error({ error }) {
  return <div className={styles["error"]}>⚠️ {error}</div>;
}
