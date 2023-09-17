import styles from "./Store.module.css";
import LeftPanel from "../../components/leftPanel/LeftPanel";
import RightPanel from "../../components/rightPanel/RightPanel";
import { useEffect } from "react";
import { useGetRecents } from "../../hooks/store/useGetRecents";
import { useState } from "react";
import { useFormatDate } from "../../hooks/utils/useFormatDate";
import { Link } from "react-router-dom";

export default function Store() {
  const { getRecents, isPending } = useGetRecents();

  const [recentItems, setRecentItems] = useState(null);

  const { timeSince } = useFormatDate();
  const files = [
    {
      fileName:
        "One Stop OOP Guide | Useful and Short topics for interviews | Object Oriented Programming (C++) LC.pdf",
      date: "2023-08-01",
      starred: true,
    },
    {
      fileName: "Presentation.pdf",
      date: "2023-08-02",
      starred: false,
    },
    {
      fileName: "Report.pdf",
      date: "2023-08-03",
      starred: true,
    },
    {
      fileName: "File.pdf",
      date: "2023-08-04",
      starred: false,
    },
    {
      fileName: "Sample.pdf",
      date: "2023-08-05",
      starred: true,
    },
    {
      fileName: "Document2.pdf",
      date: "2023-08-06",
      starred: false,
    },
    {
      fileName: "Presentation2.pdf",
      date: "2023-08-07",
      starred: true,
    },
    {
      fileName: "Report2.pdf",
      date: "2023-08-08",
      starred: false,
    },
    {
      fileName: "File2.pdf",
      date: "2023-08-09",
      starred: true,
    },
    {
      fileName: "Sample2.pdf",
      date: "2023-08-10",
      starred: false,
    },
  ];

  const folders = [
    {
      folderName: "My Articles ",
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

  const fetch = async () => {
    const res = await getRecents({ limit: 20 });
    console.log(res);
    setRecentItems(res?.data?.recents);
  };

  useEffect(() => {
    fetch();
  }, []);

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
            <div className={styles["sub-heading"]}>Pinned</div>
            <div className={styles["files"]}>
              {files.map(({ fileName, date, starred }, index) => (
                <File
                  fileName={fileName}
                  date={date}
                  isPinned={true}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className={styles["most-recent"]}>
            <div className={styles["sub-heading"]}>Most Recent</div>
            <div className={styles["files"]}>
              {recentItems?.map(({ article, updatedAt, isShared }, index) => (
                <File
                  fileName={article?.topic}
                  date={`${timeSince(updatedAt)} ago`}
                  starred={false}
                  key={index}
                  url={`/articles/${article._id}`}
                />
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
            <div className={styles["sub-heading"]}>Starred</div>
            <div className={styles["files"]}>
              {files
                .filter(({ starred }) => starred)
                .map(({ fileName, date, starred }, index) => (
                  <File
                    fileName={fileName}
                    date={date}
                    starred={starred}
                    key={index}
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

const File = ({ fileName, date, starred, isPinned, url, showIcon }) => {
  return (
    <Link to={url} className={styles["fileBox"]}>
      {!isPinned ? (
        <i
          className={`fa-${starred ? "solid" : "regular"} fa-star ${
            styles.star
          } ${starred ? styles["starred"] : ""}`}
        />
      ) : (
        <i className={`fa-solid fa-thumbtack ${styles.pin}`} />
      )}

      <div className={styles["innerFileBox"]}>
        <i className={`fa-solid fa-file-pdf ${styles.fileIcon}`}></i>
        <div className={styles["fileName"]}>{fileName}</div>
        <span className={styles["h4"]}>{date}</span>
      </div>
    </Link>
  );
};

const Folder = ({ folderName, color }) => {
  return (
    <div className={`${styles["folderBox"]} ${styles[color]}`}>
      <i className="fa-solid fa-folder-open"></i>
      <span className={styles.folderName}>{folderName}</span>
    </div>
  );
};
