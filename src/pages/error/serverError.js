import styles from "./ServerError.module.css";

export default function ServerError() {
  return (
    <div id={styles["serverError"]}>
      <div className={styles["serverError"]}>
        <div className={styles["serverError-500"]}>
          <h1>500</h1>
          <h2>Internal Server Error</h2>
        </div>
        <div className={styles["back"]}>
          Refresh this page or try again later.
        </div>
      </div>
    </div>
  );
}
