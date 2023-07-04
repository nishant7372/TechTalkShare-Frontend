import styles from "./message.module.css";

import { useFormatDate } from "../../hooks/utils/useFormatDate";

export default function Message({ message, type }) {
  const { formatTime } = useFormatDate();

  return (
    <div className={styles[type]}>
      <div className={styles["content"]}>{message.content}</div>
      <div className={styles["time"]}>{formatTime(message.createdAt)}</div>
    </div>
  );
}
