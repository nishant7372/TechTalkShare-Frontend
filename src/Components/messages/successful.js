import styles from "./message.module.css";

export default function Successful({ successful, style }) {
  return (
    <div className={styles["successful"]} style={style}>
      <i className="fa-solid fa-circle-check"></i>
      {successful}
    </div>
  );
}
