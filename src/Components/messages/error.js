import styles from "./message.module.css";

export default function Error({ error }) {
  return (
    <div className={styles["error"]}>
      <i className="fa-solid fa-circle-exclamation"></i>
      {error}
    </div>
  );
}
