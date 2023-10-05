import LeftPanel from "../leftPanel/LeftPanel";
import RightPanel from "../rightPanel/RightPanel";
import styles from "./ContentBox.module.css";

export default function ContentBox({
  children,
  heading,
  editable,
  setOpenRenameModal,
}) {
  return (
    <div className={styles["main"]}>
      <LeftPanel />
      <div className={styles["section2"]}>
        <div className={styles["header1"]}>
          <div className={styles["heading"]}>My Files</div>

          <div className={styles["searchBar"]}>
            <input
              type="search"
              className={styles["searchInput"]}
              placeholder={"Search for files"}
            />
            <i className={`fa-solid fa-search ${styles["searchIcon"]}`} />
          </div>
        </div>
        <div className={styles["header2"]}>
          <div className={styles["h1"]}>{heading}</div>
          {editable && (
            <i
              className="fa-solid fa-pencil"
              style={{ color: "white", fontSize: "1.6rem", cursor: "pointer" }}
              onClick={() => setOpenRenameModal(true)}
            />
          )}
        </div>
        {children}
      </div>
      <RightPanel />
    </div>
  );
}
