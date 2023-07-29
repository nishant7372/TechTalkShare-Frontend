import images from "../../constants/images";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={styles["home"]}>
      <img
        src={images.wave}
        alt="wave"
        style={{
          position: "absolute",
          zIndex: 1,
          bottom: 0,
          height: `calc(100vh - 50px)`,
          width: "100%",
        }}
      />
      <div className={styles["container"]}>
        <Link to="/articles" className={`${styles["tile"]} ${styles["tile1"]}`}>
          <i className="fa-solid fa-note-sticky"></i> My Articles
        </Link>
        <Link to="/shared" className={`${styles["tile"]} ${styles["tile2"]}`}>
          <i className="fa-solid fa-share-from-square"></i> Shared With Me
        </Link>
        <Link to="/download" className={`${styles["tile"]} ${styles["tile3"]}`}>
          <i className="fa-solid fa-cloud-arrow-down"></i> Download
        </Link>
        <Link to="/chat" className={`${styles["tile"]} ${styles["tile4"]}`}>
          <i className="fa-brands fa-rocketchat"></i> Chat
        </Link>
        <Link
          to="/downloads"
          className={`${styles["tile"]} ${styles["tile1"]}`}
        >
          <i className="fa-solid fa-clock-rotate-left"></i> Download History
        </Link>
        <Link to="/settings" className={`${styles["tile"]} ${styles["tile2"]}`}>
          <i className="fa-solid fa-gear"></i> Settings
        </Link>
      </div>
    </div>
  );
}
