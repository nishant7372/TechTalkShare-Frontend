import { useSelector } from "react-redux";
import styles from "./RightPanel.module.css";
import NameLogo from "../avatar/NameAvatar";
import { Link } from "react-router-dom";

export default function RightPanel() {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className={styles["container"]}>
      <div className={styles["subContainer"]}>
        <div className={styles["header1"]}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className={styles["icon"]}
              style={customStyles.iconStyles}
              tabIndex={0}
            >
              <div className={`${styles["dot"]} ${styles["yellow"]}`}></div>
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div className={styles["icon"]} tabIndex={0}>
              <div className={`${styles["dot"]} ${styles["skyblue"]}`}></div>
              <i className="fa-solid fa-bell"></i>
            </div>
          </div>

          <Link to="/settings">
            {user?.avatar ? (
              <img
                src={`data:image/jpeg;base64, ${user?.avatar}`}
                alt="avatar"
                className={styles["avatar"]}
              />
            ) : (
              <NameLogo logoStyle={customStyles.logoStyles} name={user.name} />
            )}
          </Link>
        </div>
        <div className={styles["header2"]}>
          <div className={styles["h2"]}>Notifications</div>
          <div tabIndex={0} className={styles["cross-button"]}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

const customStyles = {
  logoStyles: { width: "2.3rem", height: "3rem" },
  iconStyles: { borderRight: "2px solid #ffffff25" },
};
