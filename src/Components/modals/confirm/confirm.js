import styles from "./confirm.module.css";

export default function Confirm({ message, deleteItem }) {
  return (
    <div className={styles["overlay"]}>
      <div className={styles["confirm-message"]}>
        <div>
          {message} <br />
          Are you sure?
        </div>
        <div className={styles["buttonContainer"]}>
          <button className={styles["yes"]} onClick={() => deleteItem(true)}>
            yes
          </button>
          <button className={styles["no"]} onClick={() => deleteItem(false)}>
            no
          </button>
        </div>
      </div>
    </div>
  );
}
