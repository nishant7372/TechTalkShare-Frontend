import { Link } from "react-router-dom";
import styles from "./Folder.module.css";

export default function Folder({ folderName, color, url }) {
  return (
    <Link to={url} className={`${styles["folderBox"]} ${styles[color]}`}>
      <i className="fa-solid fa-folder-open"></i>
      <span className={styles.folderName}>{folderName}</span>
    </Link>
  );
}
