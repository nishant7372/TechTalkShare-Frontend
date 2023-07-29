import styles from "./Alert.module.css";

export default function Alert({ message, type, style }) {
  return (
    <div className={styles[type]} style={style}>
      {message}
    </div>
  );
}
