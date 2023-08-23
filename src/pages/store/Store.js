import "./store.css";
import styles from "./Store.module.css";
import LeftPanel from "../../components/leftPanel/LeftPanel";
import RightPanel from "../../components/rightPanel/RightPanel";

export default function Store() {
  const files = [
    {
      fileName: "Document1.pdf",
      date: "2023-08-01",
      isFavorite: true,
    },
    {
      fileName: "Presentation.pdf",
      date: "2023-08-02",
      isFavorite: false,
    },
    {
      fileName: "Report.pdf",
      date: "2023-08-03",
      isFavorite: true,
    },
    {
      fileName: "File.pdf",
      date: "2023-08-04",
      isFavorite: false,
    },
    {
      fileName: "Sample.pdf",
      date: "2023-08-05",
      isFavorite: true,
    },
    {
      fileName: "Document2.pdf",
      date: "2023-08-06",
      isFavorite: false,
    },
    {
      fileName: "Presentation2.pdf",
      date: "2023-08-07",
      isFavorite: true,
    },
    {
      fileName: "Report2.pdf",
      date: "2023-08-08",
      isFavorite: false,
    },
    {
      fileName: "File2.pdf",
      date: "2023-08-09",
      isFavorite: true,
    },
    {
      fileName: "Sample2.pdf",
      date: "2023-08-10",
      isFavorite: false,
    },
  ];

  const folders = [
    {
      folderName: "My Articles",
      color: "pink",
    },
    {
      folderName: "Downloads",
      color: "yellow",
    },
    {
      folderName: "Shared",
      color: "skyblue",
    },
    {
      folderName: "Folder 4",
      color: "pink",
    },
    {
      folderName: "Folder 5",
      color: "yellow",
    },
    {
      folderName: "Folder 6",
      color: "skyblue",
    },
    {
      folderName: "Folder 7",
      color: "pink",
    },
    {
      folderName: "Folder 8",
      color: "yellow",
    },
    {
      folderName: "Folder 9",
      color: "skyblue",
    },
    {
      folderName: "Folder 10",
      color: "pink",
    },
  ];
  return (
    <div className={styles.main}>
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
          <div className={styles["h1"]}>Files</div>
        </div>
        <div className={styles["mainBox"]}>
          <div className={styles["most-recent"]}>
            <div className={styles["sub-heading"]}>Most Recent</div>
            <div className={styles["files"]}>
              {files.map(({ fileName, date, isFavorite }) => (
                <File fileName={fileName} date={date} isFavorite={isFavorite} />
              ))}
            </div>
          </div>
          <div className={styles["folder"]}>
            <div className={styles["sub-heading"]}>Folders</div>
            <div className={styles["folders"]}>
              {folders.map(({ folderName, color }, index) => (
                <Folder folderName={folderName} color={color} key={index} />
              ))}
            </div>
          </div>
          <div className={styles["most-recent"]}>
            <div className={styles["sub-heading"]}>Favorites</div>
            <div className={styles["files"]}>
              {files
                .filter(({ isFavorite }) => isFavorite)
                .map(({ fileName, date, isFavorite }) => (
                  <File
                    fileName={fileName}
                    date={date}
                    isFavorite={isFavorite}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <RightPanel />
    </div>
  );
}

const File = ({ fileName, date, isFavorite }) => {
  return (
    <div className={styles["fileBox"]}>
      <i
        className={`fa-${isFavorite ? "solid" : "regular"} fa-star ${
          styles.star
        } ${isFavorite ? styles["fav"] : ""}`}
      />
      <div className={styles["innerFileBox"]}>
        <i className={`fa-solid fa-file-pdf ${styles.fileIcon}`}></i>
        <span className={styles["fileName"]}>{fileName}</span>
        <span className={styles["h4"]}>{date}</span>
      </div>
    </div>
  );
};

const Folder = ({ folderName, color }) => {
  return (
    <div className={`${styles["folderBox"]} ${styles[color]}`}>
      <i className="fa-solid fa-folder-open"></i>
      <span style={{ fontWeight: 600 }}>{folderName}</span>
    </div>
  );
};
