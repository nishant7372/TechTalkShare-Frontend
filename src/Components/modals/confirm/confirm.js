import styles from "./confirm.module.css";

export default function Confirm({ icon, message, deleteItem }) {
  return (
    <div className={styles["overlay"]}>
      <div className={styles["confirm-message"]}>
        <div>
          <span className={styles["icon"]}>{icon}</span>
          <span className={styles["bold"]}>{message}</span> <br />
          Are you sure?
        </div>
        <div className={styles["buttonContainer"]}>
          <button className={styles["no"]} onClick={() => deleteItem(false)}>
            No, Keep it.
          </button>
          <button className={styles["yes"]} onClick={() => deleteItem(true)}>
            Yes, Delete!
          </button>
        </div>
      </div>
    </div>
  );
}
