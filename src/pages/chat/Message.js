import styles from "./Message.module.css";

import { useFormatDate } from "../../hooks/utils/useFormatDate";

export default function Message({ message, type }) {
  const { formatTime } = useFormatDate();

  return (
    <div className={styles[type]}>
      <p className={styles["content"]}>{message.content}</p>
      <p className={styles["time"]}>{formatTime(message.createdAt)}</p>
    </div>
  );
}
