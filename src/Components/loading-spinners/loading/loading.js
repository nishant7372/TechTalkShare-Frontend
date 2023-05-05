import styles from "./loading.module.css";

export default function Loading({ action }) {
  // action -> className
  return (
    <div className={`${styles["loading-spinner"]} ${styles[action]}`}>
      <div className={styles["bounce1"]}></div>
      <div className={styles["bounce2"]}></div>
      <div className={styles["bounce3"]}></div>
    </div>
  );
}
