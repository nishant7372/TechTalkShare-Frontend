import styles from "./message.module.css";

export default function Error({ error, style }) {
  return (
    <div className={styles["error"]} style={style}>
      <i className="fa-solid fa-circle-exclamation"></i>
      {error}
    </div>
  );
}
